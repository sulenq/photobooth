export default function getAuthToken() {
  const token = localStorage.getItem("__auth_token");
  if (!token) {
    return null;
  } else {
    return token;
  }
}
