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
let contador = 0
if (carrito.length == 0) {
    htmlCarritoItems.innerHTML = "El carrito está vacio"
} else {
    for (const localElemento of carrito) {
        let valor = localElemento.precio*localElemento.cantidad
        valor = formatPrice(valor)
        let divContenedor = document.createElement("div")
        divContenedor.classList.add("back-trash")

        let imBasura = document.createElement("img")
        imBasura.src = "basura.png"
        imBasura.classList.add("basuraElem")

        let seleccionarCantidad = document.createElement("div")
        seleccionarCantidad.classList.add("select-cantidad")

        let botonQuitar = document.createElement("button")
        botonQuitar.classList.add("quitar-cant")
        botonQuitar.style.fontSize = '8vw';
        botonQuitar.style.lineHeight = '0px';
        botonQuitar.type = "button"
        botonQuitar.innerHTML = "-"
        botonQuitar.setAttribute("value",`${contador}`)

        let cantidad = document.createElement("span")
        cantidad.classList.add("valor-cantidad")
        cantidad.innerHTML = localElemento.cantidad

        let botonAdd = document.createElement("button")
        botonAdd.classList.add("agregar-cant")
        botonAdd.style.fontWeight = 'bold';
        botonAdd.innerHTML = "+"
        botonAdd.type = "button"
        botonAdd.setAttribute("value",`${contador}`)

        let articuloCarrito = document.createElement("article")
        articuloCarrito.classList.add("carrito-article")

        let productoHtml = `
            
                <img class="Imagenes-article" src="${localElemento.imagen}" alt="Imagen dron de Carrera" />
                <div class="Texto-productos">
                    <span class="texto-nav-links">${localElemento.nombre}</span>
                    <span id="${contador}">$ ${valor}</span>
                </div>
            
            `
        seleccionarCantidad.append(botonQuitar)
        seleccionarCantidad.append(cantidad)
        seleccionarCantidad.append(botonAdd)

        articuloCarrito.innerHTML = productoHtml
        articuloCarrito.appendChild(seleccionarCantidad)
        divContenedor.appendChild(articuloCarrito)
        divContenedor.appendChild(imBasura)
        htmlCarritoItems.appendChild(divContenedor)
        // quede aquiii

        imBasura.addEventListener("click", () => {
            htmlCarritoItems.removeChild(divContenedor)
            let index = 0
            for (index; index < carrito.length; index++) {
                if (carrito[index].nombre == localElemento.nombre) {
                    carrito.splice(index, 1)
                    // sacar precio total otravez
                    document.getElementById("section-precio-compra").innerHTML = ""
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
        console.log(cantidad.innerHTML)
        let valor_cantidad = cantidad.innerText
        console.log(valor_cantidad) 
        botonQuitar.addEventListener("click", () => {
            console.log("xd")
            if (valor_cantidad > 1) {
                valor_cantidad--
                cantidad.textContent = valor_cantidad
                subirLocalStorage(localElemento,valor_cantidad)
                valor = localElemento.precio*valor_cantidad
                valor = formatPrice(valor)
                cambiar = botonQuitar.value
                document.getElementById(cambiar).innerText=valor
            }
        })

        botonAdd.addEventListener("click", () => {
            if (valor_cantidad < 100) {
                valor_cantidad++
                cantidad.textContent = valor_cantidad
                subirLocalStorage(localElemento,valor_cantidad)
                valor = localElemento.precio*valor_cantidad
                valor = formatPrice(valor)
                cambiar = botonAdd.value
                document.getElementById(cambiar).innerText=valor
            }

        })
        contador++

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

const botonesagregaroSubir = document.querySelectorAll("button")

for (const elemento of elementosCarrito) {
    elemento.addEventListener("click", (event) => {
        if (![...botonesagregaroSubir].includes(event.target)) {
            elemento.classList.toggle("subirArticulo")
        }

    })
}

const containerElementos = document.getElementById("list-carrito-items")

containerElementos.addEventListener("click", () => {
    containerElementos.style.marginTop = "15vw"

})

const subirLocalStorage = function (localElemento,valor_cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.forEach((element,index) => {
        if (element.nombre==localElemento.nombre) {
            element.cantidad = valor_cantidad
        }
    });
    localStorage.setItem("carrito",JSON.stringify(carrito))

}