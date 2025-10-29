import { fetchProducts, fetchCategories } from './fetchProducts.js';
import { addToWishlist, removeFromWishlist, isInWishlist } from './wishlist.js';

// Get DOM elements
const productGrid = document.getElementById('product-grid');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const noResults = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const categoryFilter = document.getElementById('category-filter');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

let allProducts = [];
let filteredProducts = [];

async function startApp() {
    setupEventListeners();
    await loadCategories();
    await loadProducts();
}

function setupEventListeners() {
    searchButton.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterProducts();
        }
    });
    categoryFilter.addEventListener('change', filterProducts);
}
async function loadCategories() {
    try {
        const categories = await fetchCategories();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryFilter.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Load products from API
async function loadProducts() {
    showLoading(true);
    
    try {
        allProducts = await fetchProducts();
        filteredProducts = allProducts;
        showProducts(filteredProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        showError(true);
    }
    
    showLoading(false);
}
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    showProducts(filteredProducts);
}
function showProducts(products) {
    productGrid.innerHTML = '';
    
    if (products.length === 0) {
        showNoResults(true);
        return;
    }
    
    showNoResults(false);
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow';
    
    const isWishlisted = isInWishlist(product.id);
    const heartIcon = isWishlisted ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-400';
    
    card.innerHTML = `
        <div class="h-48 bg-gray-50 p-4 flex items-center justify-center">
            <img src="${product.image}" alt="${product.title}" class="h-full w-full object-contain">
        </div>
        <div class="p-4">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-semibold text-gray-800 flex-grow pr-2">${shortenText(product.title, 40)}</h3>
                <button class="wishlist-btn ml-2 ${isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors" 
                        data-product-id="${product.id}">
                    <i class="${heartIcon}"></i>
                </button>
            </div>
            <p class="text-gray-600 text-sm mb-3">${shortenText(product.description, 80)}</p>
            <div class="flex justify-between items-center">
                <span class="text-blue-600 font-bold text-lg">$${product.price.toFixed(2)}</span>
                <span class="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full capitalize">${product.category}</span>
            </div>
        </div>
    `;
    
    
    const wishlistBtn = card.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', function() {
        toggleWishlist(product, wishlistBtn);
    });
    
    return card;
}

function toggleWishlist(product, button) {
    const icon = button.querySelector('i');
    
    if (icon.classList.contains('fas')) {
        
        removeFromWishlist(product.id);
        icon.className = 'far fa-heart text-gray-400';
        button.classList.remove('text-red-500');
        button.classList.add('text-gray-400');
    } else {
    
        addToWishlist(product);
        icon.className = 'fas fa-heart text-red-500';
        button.classList.remove('text-gray-400');
        button.classList.add('text-red-500');
    }
}


function shortenText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

// Show/hide loading spinner
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        noResults.classList.add('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

function showError(show) {
    if (show) {
        errorMessage.classList.remove('hidden');
        productGrid.innerHTML = '';
    } else {
        errorMessage.classList.add('hidden');
    }
}

function showNoResults(show) {
    if (show) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', startApp);