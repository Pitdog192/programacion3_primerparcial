import type { IUser } from '../../../types/IUser';

// busco el formulario por id
const form = document.querySelector<HTMLFormElement>('#form');

form?.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    // capturo los datos del formulario
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // datos vacios no pasan la validacion
    if (!email || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Creao el nuevo objeto usuario
    const nuevoUsuario: IUser = {
        email: email,
        password: password,
        loggedIn: false, // Por defecto en false hasta que inicie sesion
        rol: 'client' // aca se cambia el rol por defecto
    };

    const storageUsers = localStorage.getItem('users'); // Obtengo lo que existe en localStorage
    const usersList: IUser[] = storageUsers ? JSON.parse(storageUsers) : []; //parseamo si existe
    const existe = usersList.find(u => u.email === email); // Verifica si el usuario ya existe
    if (existe) {
        alert('Este email ya está registrado.');
        return;
    }

    usersList.push(nuevoUsuario); // Agrego el nuevo usuario a la lista
    localStorage.setItem('users', JSON.stringify(usersList)); // guardo la lista actualizada en localStorage

    console.log('Usuario guardado en localStorage');
    alert('Registro completo'); // Notifica al usuario que el registro fue exitoso
    
    form.reset(); // Limpia el formulario después de registrar
});