const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(userData);
    return parsedUser;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

export default getUserFromLocalStorage;
