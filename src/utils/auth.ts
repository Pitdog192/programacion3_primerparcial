// src/utils/auth.ts
import type { IUser } from "../types/IUser";

export const logout = () => {
    localStorage.removeItem("userData");
    window.location.href = "/index.html"; // O la ruta raíz de tu proyecto
};

export const checkAuhtUser = (
    redirectPath: string, 
    _successPath: string, 
    requiredRole: string
) => {
    const data = localStorage.getItem("userData");

    if (!data) {
        console.warn("No hay datos de sesión.");
        window.location.href = redirectPath;
        return;
    }

    const user: IUser = JSON.parse(data);

    // Verificamos si el usuario NO está logueado o si el rol NO coincide
    if (!user.loggedIn || user.rol !== requiredRole) {
        window.location.href = redirectPath;
    }
};