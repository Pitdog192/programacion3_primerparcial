import type { IUser } from "../../../types/IUser";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const emailValue = inputEmail.value;
  const passwordValue = inputPassword.value;
  const storageUsers = localStorage.getItem("users"); // Obtengo la lista de usuarios registrados desde localStorage

  if (!storageUsers) {
    alert("No hay usuarios registrados en el sistema.");
    return;
  }

  const usersList: IUser[] = JSON.parse(storageUsers); // Se parsea la lista de usuarios desde localStorage

  // se busca si existe un usuario con ese email y esa contraseña
  const userFound = usersList.find(
    (u) => u.email === emailValue && u.password === passwordValue
  );

  if (userFound) {
    const userData: IUser = {
      ...userFound,
      loggedIn: true
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Bienvenido " + userFound.email + "!");

    // REDIRECCIÓN DINÁMICA SEGÚN ROL
    if (userData.rol === "admin") {
      window.location.href = "/src/pages/admin/home/home.html";
    } else {
      window.location.href = "/src/pages/client/home/home.html";
    }

  } else {
    alert("Email o contraseña incorrectos.");
  }
});