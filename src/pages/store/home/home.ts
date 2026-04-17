import { PRODUCTS, getCategories } from "../../../data/data";
import type { IProduct } from "../../../types/IProduct";

const gridProductos = document.getElementById("gridProductos") as HTMLElement;
const busquedaProducto = document.getElementById("busquedaProducto") as HTMLInputElement;
const categoriasContainer = document.getElementById("categorias") as HTMLElement;

const mostrarProductos = (listaARenderizar: IProduct[]) => {
    // Se vacia el contenedor para evitar duplicados
    gridProductos.innerHTML = "";

    // Informar al usuario en caso de no encontrar nada
    if (listaARenderizar.length === 0) {
        gridProductos.innerHTML = `
            <div class="sin-resultados">
                <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
        `;
        return;
    }

    // Se crea la card por cada producto
    listaARenderizar.forEach((producto) => {
        const article = document.createElement("article");
        article.classList.add("producto-card"); // Estilos para las card de productos
        
        article.innerHTML = `
            <img src="/assets/${producto.imagen}" alt="${producto.nombre}" width="150">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>$${producto.precio}</strong></p>
            <button ${!producto.disponible ? 'disabled' : ''}>
                ${producto.disponible ? 'Agregar al carrito' : 'Sin stock'}
            </button>
        `;
        
        gridProductos.appendChild(article);
    });
};

// Evento de búsqueda: Se filtran los productos cada vez que el usuario escribe algo en el input
busquedaProducto.addEventListener("input", () => {
    const textoUsuario = busquedaProducto.value.toLowerCase();

    // Filtrado de productos
    const productosFiltrados = PRODUCTS.filter((p) => 
        p.nombre.toLowerCase().includes(textoUsuario)
    );

    mostrarProductos(productosFiltrados);
});

const mostrarCategorias = () => {
    const categorias = getCategories();
    
    // Botón para mostrar todos los productos
    const btnTodas = document.createElement("button");
    btnTodas.innerText = "Todas";
    btnTodas.classList.add("btn-categoria");
    btnTodas.onclick = () => {
        busquedaProducto.value = "";
        mostrarProductos(PRODUCTS);
    };
    categoriasContainer.appendChild(btnTodas);

    // Botones dinámicos por cada categoría en data.ts
    categorias.forEach(cat => {
        const boton = document.createElement("button");
        boton.innerText = cat.nombre;
        boton.classList.add("btn-categoria");
        
        boton.onclick = () => {
            busquedaProducto.value = ""; // Limpia búsqueda al filtrar por categoría
            const filtrados = PRODUCTS.filter(p => 
                p.categorias.some(c => c.id === cat.id)
            );
            mostrarProductos(filtrados);
        };
        
        categoriasContainer.appendChild(boton);
    });
};

const agregarAlCarrito = (producto: IProduct) => {
    // Intentamos obtener el carrito previo
    const carritoStorage = localStorage.getItem("carrito_compras");
    let carrito: ICartItem[] = carritoStorage ? JSON.parse(carritoStorage) : [];

    // Buscamos si el producto ya está
    const indice = carrito.findIndex(item => item.id === producto.id);

    if (indice !== -1) {
        // Criterio: Si ya existe, actualizamos cantidad
        carrito[indice].cantidad += 1;
    } else {
        // Criterio: Si es nuevo, lo agregamos con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }

    // Guardamos el array actualizado
    localStorage.setItem("carrito_compras", JSON.stringify(carrito));

    // Indicador visual simple (puedes mejorar esto con un modal luego)
    alert(`Se agregó "${producto.nombre}" al carrito`);
};

mostrarCategorias();
mostrarProductos(PRODUCTS);