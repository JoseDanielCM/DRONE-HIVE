const contenedorProductos = document.getElementById("conjunto-productos")
const obtenerJson = async function () {
    const elemeJson = await fetch("./productos.json");
    var datoss = await elemeJson.json();

    let categorias = ["DRONES DE CARRERAS", "DRONES CON CÁMARA", "DRONES PARA NIÑOS", "DRONES AGRICULTURA"]

    datoss.forEach((element, index) => {
        if (index % 2 == 0) {
            let subtitle = document.createElement("h2")
            subtitle.classList.add("subtitulos")
            subtitle.innerHTML = categorias[index / 2]
            contenedorProductos.appendChild(subtitle)
        }
        let degradado = ""
        let articuloContenedor = document.createElement("article")
        // 
        producto = Math.floor(index / 2) + 1
        if (producto>4) {
            producto=4
        }
        if (index % 2 == 0) {
            degradado = "Degradado-productos-izquierda"
            articuloContenedor.classList.add("productos")
            articuloContenedor.classList.add(`producto${producto}`)
            articuloContenedor.innerHTML = `
                <a href="DRON.html?id=${index}">
                    <div class="${degradado}">
                        <img class="imagenes-productos" src="${element.imagen}" alt="" />
                        <div>
                            <h3 class="nombre-producto">${element.nombre}</h3>
                            <pre class="precios-productos"><del>${element.precio_anterior}</del>  ${element.precio}</pre>
                        </div>
                    </div>
                </a>
            `

        } else {
            degradado = "Degradado-productos-derecha"
            articuloContenedor.classList.add("productos")
            articuloContenedor.classList.add(`producto${producto}`)
            articuloContenedor.innerHTML = `
                <a href="DRON.html?id=${index}">
                    <div class="${degradado}">
                        <div>
                            <h3 class="nombre-producto">${element.nombre}</h3>
                            <pre class="precios-productos"><del>${element.precio_anterior}</del>  ${element.precio}</pre>
                        </div>
                        <img class="imagenes-productos" src="${element.imagen}" alt="" />
                    </div>
                </a>
            `
        }

        contenedorProductos.appendChild(articuloContenedor)


    });
}

obtenerJson()

const filtro = async function () {
    const elemeJson = await fetch("./productos.json");
    var datoss = await elemeJson.json();

    let categorias_escogidas = []
    const botonesCategorias = document.getElementsByClassName("escogerCategoria")
    
    for (const boton of botonesCategorias) {
        boton.addEventListener("click", () => {
            let valor = boton.getAttribute("valor")
            if (!categorias_escogidas.includes(valor)) {
                boton.style.borderColor="#a565cf"
                categorias_escogidas.push(valor)
            } else {
                categorias_escogidas.splice(categorias_escogidas.indexOf(valor), 1)
                boton.style.borderColor="#5b5fc9"

            }
            console.log(categorias_escogidas)


            // HTML AGREGAR
            contenedorProductos.innerHTML = ""

            for (const categoria of categorias_escogidas) {
                let subtitle = document.createElement("h2")
                subtitle.classList.add("subtitulos")
                subtitle.innerHTML = categoria.toUpperCase()
                contenedorProductos.appendChild(subtitle)

                datoss.forEach((element, index) => {
                    if (element.categoria === categoria) {

                        let degradado = ""
                        let articuloContenedor = document.createElement("article")
                        // 
                        producto = Math.floor(index / 2) + 1
                        if (producto>4) {
                            producto=4
                        }
                        if (index % 2 == 0) {
                            degradado = "Degradado-productos-izquierda"
                            articuloContenedor.classList.add("productos")
                            articuloContenedor.classList.add(`producto${producto}`)
                            articuloContenedor.innerHTML = `
                <a href="DRON.html?id=${index}">
                    <div class="${degradado}">
                        <img class="imagenes-productos" src="${element.imagen}" alt="" />
                        <div>
                            <h3 class="nombre-producto">${element.nombre}</h3>
                            <pre class="precios-productos"><del>${element.precio_anterior}</del>  ${element.precio}</pre>
                        </div>
                    </div>
                </a>
            `

                        } else {
                            degradado = "Degradado-productos-derecha"
                            articuloContenedor.classList.add("productos")
                            articuloContenedor.classList.add(`producto${producto}`)
                            articuloContenedor.innerHTML = `
                <a href="DRON.html?id=${index}">
                    <div class="${degradado}">
                        <div>
                            <h3 class="nombre-producto">${element.nombre}</h3>
                            <pre class="precios-productos"><del>${element.precio_anterior}</del>  ${element.precio}</pre>
                        </div>
                        <img class="imagenes-productos" src="${element.imagen}" alt="" />
                    </div>
                </a>
            `
                        }

                        contenedorProductos.appendChild(articuloContenedor)
                    }
                })
            }




        })
    }




}

filtro()