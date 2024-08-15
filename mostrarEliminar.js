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
const ListaImagenesBasura = document.getElementsByClassName("basuraElem")

if (carrito.length == 0) {
    htmlCarritoItems.innerHTML = "El carrito está vacio"
} else {
    for (const localElemento of carrito) {
        valor = formatPrice(localElemento.precio)
        let divContenedor = document.createElement("div")
        divContenedor.classList.add("back-trash")

        let imBasura = document.createElement("img")
        imBasura.src = "basura.png"
        imBasura.classList.add("basuraElem")
        let productoHtml = `
            <article class="carrito-article">
                <img class="Imagenes-article" src="${localElemento.imagen}" alt="Imagen dron de Carrera" />
                <div class="Texto-productos">
                    <span class="texto-nav-links">${localElemento.nombre}</span>
                    <span>$ ${valor}</span>
                </div>
            </article>
            `

        divContenedor.innerHTML = productoHtml
        divContenedor.appendChild(imBasura)
        htmlCarritoItems.appendChild(divContenedor)
        imBasura.addEventListener("click", () => {
            htmlCarritoItems.removeChild(divContenedor)
            let index = 0
            for (index; index < carrito.length; index++) {
                if (carrito[index].nombre == localElemento.nombre) {
                    carrito.splice(index, 1)
                    // sacar precio total
                    document.getElementById("section-precio-compra").innerHTML=""
                    let total = 0
                    for (const product of carrito) {
                        total += product.precio
                    }

                    total = formatPrice(total)
                    let divTotalProductos = document.createElement("div")
                    divTotalProductos.setAttribute("id", "section-item-total")
                    divTotalProductos.innerHTML = `<h4>Total productos ( ${carrito.length} )</h4>`

                    let divPrecio = document.createElement("div")
                    divPrecio.setAttribute("id", "section-item-precio")
                    divPrecio.innerHTML = `<h4>$${total}</h4>`

                    document.getElementById("section-precio-compra").insertBefore(divPrecio, document.getElementById("section-item-compra"))

                    document.getElementById("section-precio-compra").insertBefore(divTotalProductos, document.getElementById("section-item-precio"))
                    break
                }
            }
            localStorage.setItem('carrito', JSON.stringify(carrito))
        })

    }
    // sacar precio total
    let total = 0
    for (const product of carrito) {
        total += product.precio
    }

    total = formatPrice(total)
    let divTotalProductos = document.createElement("div")
    divTotalProductos.setAttribute("id", "section-item-total")
    divTotalProductos.innerHTML = `<h4>Total productos ( ${carrito.length} )</h4>`

    let divPrecio = document.createElement("div")
    divPrecio.setAttribute("id", "section-item-precio")
    divPrecio.innerHTML = `<h4>$${total}</h4>`

    document.getElementById("section-precio-compra").insertBefore(divPrecio, document.getElementById("section-item-compra"))

    document.getElementById("section-precio-compra").insertBefore(divTotalProductos, document.getElementById("section-item-precio"))
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

