import type { ICategory } from "./ICategoria";

export interface IProduct {
    id: number;
    eliminado: boolean;
    createdAt: String;
    nombre: string;
    precio: number;
    descripcion: string;
    stock: number;
    imagen: string;
    disponible: boolean;
    categorias: ICategory[];
}