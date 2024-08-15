function formatPrice(price) {
    // Convertir el número a cadena y dividir en partes
    let [integerPart, decimalPart] = price.toString().split('.');
    
    // Insertar comillas cada 3 dígitos en la parte entera, de derecha a izquierda
    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Unir la parte entera con la parte decimal si existe
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const htmlCarritoItems = document.getElementById("list-carrito-items")

if (carrito.length == 0) {
    htmlCarritoItems.innerHTML = "El carrito está vacio"
} else {
    for (const localElemento of carrito) {
        valor = formatPrice(localElemento.precio)
        let productoHtml = `
            <div class="back-trash">
                <img src="basura.png" alt="Icono-basura" />
                <article class="carrito-article">
                    <img class="Imagenes-article" src="${localElemento.imagen}" alt="Imagen dron de Carrera" />
                    <div class="Texto-productos">
                        <span class="texto-nav-links">${localElemento.nombre}</span>
                        <span>$ ${valor}</span>
                    </div>
                </article>
            </div>`
        
            htmlCarritoItems.innerHTML += productoHtml
    }
}


const elementosCarrito = document.querySelectorAll(".carrito-article")

for (const elemento of elementosCarrito) {
    elemento.addEventListener("click", () => {
        elemento.classList.toggle("subirArticulo")

    })
}

const containerElementos = document.getElementById("list-carrito-items")

containerElementos.addEventListener("click", () => {
    containerElementos.style.marginTop = "15vw"

})