// Wishlist module for managing favorite products

const WISHLIST_STORAGE_KEY = 'shopSmart_wishlist';

/**
 * Get the current wishlist from localStorage
 * @returns {Array} Array of product objects in the wishlist
 */
export function getWishlist() {
    const wishlistJSON = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return wishlistJSON ? JSON.parse(wishlistJSON) : [];
}

/**
 * Save the wishlist to localStorage
 * @param {Array} wishlist - Array of product objects
 */
function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
}
export function addToWishlist(product) {
    const wishlist = getWishlist();
    
    // Check if product is already in wishlist
    if (!isInWishlist(product.id)) {
        wishlist.push(product);
        saveWishlist(wishlist);
        
        // Dispatch custom event for wishlist updates
        dispatchWishlistEvent('add', product);
    }
}

/**
 * Remove a product from the wishlist
 * @param {number} productId - ID of the product to remove
 */
export function removeFromWishlist(productId) {
    const wishlist = getWishlist();
    const productIndex = wishlist.findIndex(item => item.id === productId);
    
    if (productIndex !== -1) {
        const removedProduct = wishlist[productIndex];
        wishlist.splice(productIndex, 1);
        saveWishlist(wishlist);
        
        // Dispatch custom event for wishlist updates
        dispatchWishlistEvent('remove', removedProduct);
    }
}

/**
 * Check if a product is in the wishlist
 * @param {number} productId - ID of the product to check
 * @returns {boolean} True if product is in wishlist, false otherwise
 */
export function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.some(item => item.id === productId);
}

/**
 * Clear the entire wishlist
 */
export function clearWishlist() {
    saveWishlist([]);
    
    // Dispatch custom event for wishlist updates
    dispatchWishlistEvent('clear');
}

/**
 * Get the count of items in the wishlist
 * @returns {number} Number of items in wishlist
 */
export function getWishlistCount() {
    return getWishlist().length;
}

/**
 * Dispatch a custom event when wishlist changes
 * @param {string} action - The action performed (add, remove, clear)
 * @param {Object} product - The product affected (optional)
 */
function dispatchWishlistEvent(action, product = null) {
    const event = new CustomEvent('wishlist-change', {
        detail: {
            action,
            product,
            count: getWishlistCount()
        }
    });
    
    document.dispatchEvent(event);
}