import toast from "react-hot-toast";

export const DynamicHeaders = (data) => {
    // Step 1: Collect all unique keys across all users
    const allKeysSet = new Set();

    data.forEach(user => {
        Object.keys(user).forEach(key => allKeysSet.add(key));
    });

    // Step 2: Convert Set to Array and filter unwanted fields
    const includedKeys = [...allKeysSet].filter(key => !['_id', '__v', 'updatedAt'].includes(key));

    // Step 3: Generate headers
    const headers = includedKeys.map(key => ({
        label: key
            .replace(/([A-Z])/g, ' $1')        // Insert space before capital letters
            .replace(/^./, str => str.toUpperCase()), // Capitalize first letter
        key: key
    }));

    return headers
}

const shownToasts = new Set();

export const toastLimtter = (message, type = "error", timeout = 3000) => {
    if (shownToasts.has(message)) return;

    shownToasts.add(message);
    toast[type](message);

    // Remove after timeout
    setTimeout(() => {
        shownToasts.delete(message);
    }, timeout);
}
