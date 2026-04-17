import { PRODUCTS, getCategories } from "../../../data/data";
import type { IProduct, ICartItem } from "../../../types/IProduct";

const gridProductos = document.getElementById("gridProductos") as HTMLElement;
const busquedaProducto = document.getElementById("busquedaProducto") as HTMLInputElement;
const categoriasContainer = document.getElementById("categorias") as HTMLElement;

const mostrarProductos = (listaARenderizar: IProduct[]) => {
    gridProductos.innerHTML = "";

    if (listaARenderizar.length === 0) {
        gridProductos.innerHTML = `<p>No se encontraron productos.</p>`;
        return;
    }

    listaARenderizar.forEach((producto) => {
        const article = document.createElement("article");
        article.classList.add("producto-card");
        
        article.innerHTML = `
            <img src="/assets/${producto.imagen}" alt="${producto.nombre}" width="150">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>$${producto.precio}</strong></p>
            <button id="btn-add-${producto.id}" ${!producto.disponible ? 'disabled' : ''}>
                ${producto.disponible ? 'Agregar al carrito' : 'Sin stock'}
            </button>
        `;
        
        gridProductos.appendChild(article);

        const boton = article.querySelector(`#btn-add-${producto.id}`);
        if (boton && producto.disponible) {
            boton.addEventListener("click", () => {
                agregarAlCarrito(producto);
            });
        }
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
    const carritoStorage = localStorage.getItem("carrito_compras");
    let carrito: ICartItem[] = carritoStorage ? JSON.parse(carritoStorage) : [];

    // Buscamos si el producto ya está
    const indice = carrito.findIndex(item => item.id === producto.id);

    if (indice !== -1) {
        carrito[indice].cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito_compras", JSON.stringify(carrito));

    alert(`Se agregó "${producto.nombre}" al carrito`);
};

mostrarCategorias();
mostrarProductos(PRODUCTS);