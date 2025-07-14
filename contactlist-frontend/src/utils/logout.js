export function handleLogout(navigate) {
  localStorage.removeItem("accessToken");
  navigate("/");
}