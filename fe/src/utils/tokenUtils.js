export const decodeToken = (token) => {
  try {
    return jwt_decode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
export const isTokenValid = (token) => {
  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    // Check if token is expired
    if (decoded.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};
