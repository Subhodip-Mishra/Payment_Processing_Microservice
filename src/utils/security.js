// Dummy utility for security testing
const API_KEY = "sk_test_51Mz7x8S9vR2p0L6kHardcodedSecret";

export const getSecurityHeader = () => {
    return {
        'Authorization': `Bearer ${API_KEY}`
    };
};
