import type { ICartItem } from "../../../types/IProduct";

const contenedorCarrito = document.getElementById("contenedorCarrito") as HTMLElement;
const seccionTotal = document.getElementById("seccionTotal") as HTMLElement;
const precioTotal = document.getElementById("precioTotal") as HTMLElement;
const btnVaciar = document.getElementById("btnVaciar") as HTMLButtonElement;

const renderizarCarrito = () => {
    // Recuperar datos de localStorage
    const datosJSON = localStorage.getItem("carrito_compras");
    const carrito: ICartItem[] = datosJSON ? JSON.parse(datosJSON) : [];

    // Limpiar el contenedor antes de renderizar
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="carrito-vacio">
                <h3>Tu carrito está vacío.</h3>
                <p>¡Ve al catálogo para agregar productos deliciosos!</p>
            </div>
        `;
        seccionTotal.style.display = "none";
        return;
    }

    // Si hay productos, mostramos la sección del total
    seccionTotal.style.display = "block";

    // Crear la estructura de la tabla
    const tabla = document.createElement("table");
    tabla.classList.add("tabla-carrito"); // Clase para darle estilos CSS luego
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Producto</th>
                <th>Precio Unit.</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody id="cuerpoTabla"></tbody>
    `;

    const cuerpoTabla = tabla.querySelector("#cuerpoTabla") as HTMLElement;

    let acumuladoTotal = 0;

    carrito.forEach(item => {
        // Cálculo del subtotal por producto
        const subtotal = item.precio * item.cantidad;
        acumuladoTotal += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio.toLocaleString('es-AR')}</td>
            <td>${item.cantidad}</td>
            <td>$${subtotal.toLocaleString('es-AR')}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    contenedorCarrito.appendChild(tabla);
    precioTotal.innerText = acumuladoTotal.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

btnVaciar.addEventListener("click", () => {
    // confirm que mejora la experiencia de usuario
    const confirmar = confirm("¿Estás seguro de que quieres vaciar todo el carrito?");
    if (confirmar) {
        localStorage.removeItem("carrito_compras");
        renderizarCarrito(); // refresca la vista para mostrar el carrito vacío
    }
});

renderizarCarrito();