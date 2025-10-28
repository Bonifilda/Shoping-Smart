// // Main application file
// import { fetchProducts, fetchCategories } from './fetchProducts.js';
// import { addToWishlist, removeFromWishlist, isInWishlist, getWishlist } from './wishlist.js';

// // DOM Elements
// const productGrid = document.getElementById('product-grid');
// const loadingSpinner = document.getElementById('loading-spinner');
// const errorMessage = document.getElementById('error-message');
// const noResults = document.getElementById('no-results');
// const searchInput = document.getElementById('search-input');
// const searchButton = document.getElementById('search-button');
// const categoryFilter = document.getElementById('category-filter');
// const mobileMenuButton = document.getElementById('mobile-menu-button');
// const mobileMenu = document.getElementById('mobile-menu');

// // Mobile menu toggle
// mobileMenuButton.addEventListener('click', () => {
//     mobileMenu.classList.toggle('hidden');
// });

// // Current products data
// let allProducts = [];
// let filteredProducts = [];

// // Initialize the app
// async function initApp() {
//     setupEventListeners();
//     await loadCategories();
//     await loadProducts();
// }

// // Set up event listeners
// function setupEventListeners() {
//     searchButton.addEventListener('click', filterProducts);
//     searchInput.addEventListener('keyup', (e) => {
//         if (e.key === 'Enter') {
//             filterProducts();
//         }
//     });
//     categoryFilter.addEventListener('change', filterProducts);
// }

// // Load categories from API
// async function loadCategories() {
//     try {
//         const categories = await fetchCategories();
//         populateCategoryFilter(categories);
//     } catch (error) {
//         console.error('Error loading categories:', error);
//     }
// }

// // Populate category dropdown
// function populateCategoryFilter(categories) {
//     categories.forEach(category => {
//         const option = document.createElement('option');
//         option.value = category;
//         option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
//         categoryFilter.appendChild(option);
//     });
// }

// // Load products from API
// async function loadProducts() {
//     showLoading(true);
    
//     try {
//         allProducts = await fetchProducts();
//         filteredProducts = [...allProducts];
//         renderProducts(filteredProducts);
//     } catch (error) {
//         console.error('Error loading products:', error);
//         showError(true);
//     } finally {
//         showLoading(false);
//     }
// }

// // Filter products based on search and category
// function filterProducts() {
//     const searchTerm = searchInput.value.toLowerCase().trim();
//     const categoryValue = categoryFilter.value;
    
//     filteredProducts = allProducts.filter(product => {
//         const matchesSearch = product.title.toLowerCase().includes(searchTerm) || 
//                              product.description.toLowerCase().includes(searchTerm);
//         const matchesCategory = categoryValue === '' || product.category === categoryValue;
        
//         return matchesSearch && matchesCategory;
//     });
    
//     renderProducts(filteredProducts);
// }

// // Render products to the grid
// function renderProducts(products) {
//     productGrid.innerHTML = '';
    
//     if (products.length === 0) {
//         showNoResults(true);
//         return;
//     }
    
//     showNoResults(false);
    
//     products.forEach(product => {
//         const isWishlisted = isInWishlist(product.id);
//         const productCard = createProductCard(product, isWishlisted);
//         productGrid.appendChild(productCard);
//     });
// }

// // Create a product card element
// function createProductCard(product, isWishlisted) {
//     const card = document.createElement('div');
//     card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
    
//     const wishlistIconClass = isWishlisted 
//         ? 'fas fa-heart text-red-500' 
//         : 'far fa-heart';
    
//     card.innerHTML = `
//         <div class="product-image-container p-4 bg-gray-50">
//             <img src="${product.image}" alt="${product.title}" class="product-image">
//         </div>
//         <div class="p-4">
//             <div class="flex justify-between items-start">
//                 <h3 class="text-lg font-semibold mb-2 flex-grow">${truncateText(product.title, 40)}</h3>
//                 <button class="wishlist-btn ${isWishlisted ? 'active' : ''} ml-2 focus:outline-none" 
//                         data-product-id="${product.id}">
//                     <i class="${wishlistIconClass}"></i>
//                 </button>
//             </div>
//             <p class="text-gray-600 text-sm mb-3">${truncateText(product.description, 100)}</p>
//             <div class="flex justify-between items-center">
//                 <span class="text-blue-600 font-bold">$${product.price.toFixed(2)}</span>
//                 <span class="text-xs px-2 py-1 bg-gray-200 rounded-full">${product.category}</span>
//             </div>
//         </div>
//     `;
    
//     // Add wishlist button event listener
//     const wishlistBtn = card.querySelector('.wishlist-btn');
//     wishlistBtn.addEventListener('click', () => toggleWishlist(product, wishlistBtn));
    
//     return card;
// }

// // Toggle product in wishlist
// function toggleWishlist(product, button) {
//     const isCurrentlyWishlisted = button.classList.contains('active');
//     const icon = button.querySelector('i');
    
//     if (isCurrentlyWishlisted) {
//         removeFromWishlist(product.id);
//         button.classList.remove('active');
//         icon.className = 'far fa-heart';
//     } else {
//         addToWishlist(product);
//         button.classList.add('active');
//         icon.className = 'fas fa-heart text-red-500';
//     }
// }

// // Helper function to truncate text
// function truncateText(text, maxLength) {
//     return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
// }

// // Show/hide loading spinner
// function showLoading(show) {
//     loadingSpinner.classList.toggle('hidden', !show);
//     if (show) {
//         errorMessage.classList.add('hidden');
//         noResults.classList.add('hidden');
//     }
// }

// // Show/hide error message
// function showError(show) {
//     errorMessage.classList.toggle('hidden', !show);
//     if (show) {
//         productGrid.innerHTML = '';
//         noResults.classList.add('hidden');
//     }
// }

// // Show/hide no results message
// function showNoResults(show) {
//     noResults.classList.toggle('hidden', !show);
// }

// // Initialize the app when DOM is loaded
// document.addEventListener('DOMContentLoaded', initApp);
// Main application file
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

// Mobile menu toggle
mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// Store products
let allProducts = [];
let filteredProducts = [];

// Start the app
async function startApp() {
    setupEventListeners();
    await loadCategories();
    await loadProducts();
}

// Set up event listeners
function setupEventListeners() {
    searchButton.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterProducts();
        }
    });
    categoryFilter.addEventListener('change', filterProducts);
}

// Load categories from API
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

// Filter products based on search and category
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

// Display products on the page
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

// Create product card using Tailwind classes
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
    
    // Add click event to wishlist button
    const wishlistBtn = card.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', function() {
        toggleWishlist(product, wishlistBtn);
    });
    
    return card;
}

// Add or remove from wishlist
function toggleWishlist(product, button) {
    const icon = button.querySelector('i');
    
    if (icon.classList.contains('fas')) {
        // Remove from wishlist
        removeFromWishlist(product.id);
        icon.className = 'far fa-heart text-gray-400';
        button.classList.remove('text-red-500');
        button.classList.add('text-gray-400');
    } else {
        // Add to wishlist
        addToWishlist(product);
        icon.className = 'fas fa-heart text-red-500';
        button.classList.remove('text-gray-400');
        button.classList.add('text-red-500');
    }
}

// Helper function to shorten long text
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

// Show/hide error message
function showError(show) {
    if (show) {
        errorMessage.classList.remove('hidden');
        productGrid.innerHTML = '';
    } else {
        errorMessage.classList.add('hidden');
    }
}

// Show/hide no results message
function showNoResults(show) {
    if (show) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
}

// Start the app when page loads
document.addEventListener('DOMContentLoaded', startApp);