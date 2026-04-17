import type { IUser } from './types/IUser';
import type { Rol } from './types/Rol';

const checkAuth = () => {
    // Obtengo los datos de la sesion
    const userDataRaw = localStorage.getItem('userData');
    const user: IUser | null = userDataRaw ? JSON.parse(userDataRaw) : null;
    const path = window.location.pathname.toLowerCase(); // Se obtiene la ruta actual en minúsculas para comparaciones

    // en caso de no estar logueado se redirige al login
    if (!user) {
        if (!path.includes('/auth/')) {
            window.location.href = '/src/pages/auth/login/login.html';
        }
        return;
    }

    const userRol: Rol = user.rol; // Se obtiene el rol del usuario

    // Si es cliente no puede entrar a admin, solo a zonas de cliente
    if (userRol === 'client') {
        if (path.includes('/admin/') || path === '/' || path.endsWith('index.html')) {
            window.location.href = '/src/pages/client/home/home.html';
            return;
        }
    }
};

// ejecución de la función guard
checkAuth();