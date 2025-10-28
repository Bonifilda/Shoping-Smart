// API module for fetching products from Fake Store API

const API_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from the API
 * @returns {Promise<Array>} Array of product objects
 */
export async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of product objects in the specified category
 */
export async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(`${API_URL}/products/category/${category}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const products = await response.json();
        return products;
    } catch (error) {
        console.error(`Error fetching products in category ${category}:`, error);
        throw error;
    }
}

/**
 * Fetch all available product categories
 * @returns {Promise<Array>} Array of category names
 */
export async function fetchCategories() {
    try {
        const response = await fetch(`${API_URL}/products/categories`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const product = await response.json();
        return product;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
}