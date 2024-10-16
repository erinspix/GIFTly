// utils/helpers.js

/**
 * Validate if a string is empty
 * @param {string} str
 * @returns {boolean}
 */
const isEmpty = (str) => {
    return !str || str.trim().length === 0;
};

/**
 * Validate if an email address is valid
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Generate a random ID (could be used for temporary identifiers)
 * @returns {string}
 */
const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

module.exports = {
    isEmpty,
    isValidEmail,
    generateId,
};
