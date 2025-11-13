// Salvăm utilizatorii în localStorage
export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function loadUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Salvează user-ul logat
export function loginUser(user) {
  localStorage.setItem("loggedUser", JSON.stringify(user));
}

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser"));
}

export function logoutUser() {
  localStorage.removeItem("loggedUser");
}