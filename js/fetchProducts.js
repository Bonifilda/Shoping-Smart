const API_URL = 'https://fakestoreapi.com';

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