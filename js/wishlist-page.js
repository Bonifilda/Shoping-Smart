// Wishlist page
import { getWishlist, removeFromWishlist, clearWishlist } from './wishlist.js';

// Get DOM elements
const wishlistGrid = document.getElementById('wishlist-grid');
const emptyWishlist = document.getElementById('empty-wishlist');
const wishlistActions = document.getElementById('wishlist-actions');
const wishlistCount = document.getElementById('wishlist-count');
const clearWishlistBtn = document.getElementById('clear-wishlist');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Mobile menu toggle
mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// Start wishlist page
function startWishlistPage() {
    setupEventListeners();
    displayWishlist();
}

// Set up event listeners
function setupEventListeners() {
    clearWishlistBtn.addEventListener('click', clearAllWishlist);
}

// Display wishlist items
function displayWishlist() {
    const wishlist = getWishlist();
    
    // Update item count
    wishlistCount.textContent = `${wishlist.length} items in your wishlist`;
    
    // Show empty message if no items
    if (wishlist.length === 0) {
        emptyWishlist.classList.remove('hidden');
        wishlistActions.classList.add('hidden');
        wishlistGrid.innerHTML = '';
        return;
    }
    
    emptyWishlist.classList.add('hidden');
    wishlistActions.classList.remove('hidden');
    
    // Clear and display wishlist items
    wishlistGrid.innerHTML = '';
    
    wishlist.forEach(product => {
        const productCard = createWishlistCard(product);
        wishlistGrid.appendChild(productCard);
    });
}

// Create wishlist product card using Tailwind
function createWishlistCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow';
    
    card.innerHTML = `
        <div class="h-48 bg-gray-50 p-4 flex items-center justify-center">
            <img src="${product.image}" alt="${product.title}" class="h-full w-full object-contain">
        </div>
        <div class="p-4">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-semibold text-gray-800 flex-grow pr-2">${shortenText(product.title, 40)}</h3>
                <button class="remove-btn text-gray-500 hover:text-red-500 transition-colors" data-product-id="${product.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <p class="text-gray-600 text-sm mb-3">${shortenText(product.description, 80)}</p>
            <div class="flex justify-between items-center">
                <span class="text-blue-600 font-bold text-lg">$${product.price.toFixed(2)}</span>
                <span class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">In Wishlist</span>
            </div>
        </div>
    `;
    
    // Add click event to remove button
    const removeBtn = card.querySelector('.remove-btn');
    removeBtn.addEventListener('click', function() {
        removeFromWishlist(product.id);
        displayWishlist();
    });
    
    return card;
}

// Clear all wishlist items
function clearAllWishlist() {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
        clearWishlist();
        displayWishlist();
    }
}

// Helper function to shorten long text
function shortenText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

// Start the page when loaded
document.addEventListener('DOMContentLoaded', startWishlistPage);