export const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
    const cart = getCart();
    const existingProduct = cart.find(item => item._id === product._id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
    let cart = getCart();
    cart = cart.filter(item => item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateQuantity = (productId, quantity) => {
    const cart = getCart();
    const product = cart.find(item => item._id === productId);
    
    if (product) {
        product.quantity = quantity;
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
};

export const clearCart = () => {
    localStorage.removeItem('cart');
};