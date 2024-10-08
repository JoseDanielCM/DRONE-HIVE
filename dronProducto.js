const urlParametro = document.URL;

const extraerParametro = function () {
    for (var char in urlParametro) {
        if (urlParametro[char] === "=") {
            char++;
            let parametro = urlParametro.slice(char);
            return parametro;
        }
    }
};

const traerJson = async function (parametro) {
    //subir info
    const elemeJson = await fetch("./productos.json");
    var datoss = await elemeJson.json();

    const dron = datoss[parametro];

    texto = `<div id="contenedor-datos">
<div id="contenedor_imagen">
    <img id="imagen-dron" src="IMG-PRODUCTOS/dron${Number(parametro) + 1}.png" alt="dron-carrera-1" />
</div>

<section id="detalles-producto">
    <article id="nombre">
        <h2>${dron.nombre}</h2>
    </article>

    <article id="cantidad">
        <div id="select-cantidad">
            <button id="quitar-cant">-</button>
            <span id="valor-cantidad">1</span>
            <button id="agregar-cant">+</button>
        </div>
    </article>

    <article id="estrellas">
        <button valor="1" class="star">⋆</button>
        <button valor="2" class="star">⋆</button>
        <button valor="3" class="star">⋆</button>
        <button valor="4" class="star">⋆</button>
        <button valor="5" class="star">⋆</button>
    </article>

    <article id="categoria">
        <div>
            <p><strong>CATEGORÍA:</strong></p>
            <p>${dron.categoria}</p>
        </div>
    </article>

    <article id="descripcion">
        <p id="TXT-DESCRIPCION"><strong>DESCRIPCIÓN</strong></p>
        <p><strong>Alcance: </strong><span>${dron.alcance}</span></p>
        <p><strong>Tiempo: </strong>${dron.tiempo}</p>
        <p><strong>Velocidad: </strong>${dron.velocidad}</p>
    </article>

    <article id="precio">
        <h5>Precio total</h5>
        <p>${dron.precio}</p>
    </article>

    <article id="carrito">
        <a href="carrito.html">
            <div id="carrito-boton">
                <div id="carrito-boton-imagen">
                    <img src="IMAGENES-NAV/CARRITO.png" alt="Icono agregar carrito" />
                </div>
                <div id="carrito-boton-texto">Agregar al carrito</div>
            </div>
        </a>
    </article>
</section>
</div>`

    document.getElementById("section-imagen-fondo").innerHTML = texto
    // estrellas

    const stars = document.querySelectorAll(".star")
    for (const star of stars) {
        star.addEventListener("click", () => {

            valor_select = star.getAttribute("valor")
            for (const star of stars) {
                star.classList.remove("selected")
            }

            for (const estrella of stars) {
                if (estrella.getAttribute("valor") <= valor_select) {
                    estrella.classList.add("selected")
                }
            }

        })

    }

    // CANTIDAD

    const cantidad = document.getElementById("valor-cantidad")
    const btnQuitar = document.getElementById("quitar-cant")
    const btnAdd = document.getElementById("agregar-cant")

    var valor_cantidad=1
    btnQuitar.addEventListener("click", () => {
        valor_cantidad = cantidad.textContent
        if (valor_cantidad > 1) {
            valor_cantidad--
            cantidad.textContent = valor_cantidad
        }
    })

    btnAdd.addEventListener("click", () => {
        valor_cantidad = cantidad.textContent
        if (valor_cantidad < 100) {
            valor_cantidad++
            cantidad.textContent = valor_cantidad
        }
    })

    // LocalStorage
    
    const subirLocalStorage = function () {
        const productoDronObject = {...dron}
        productoDronObject.cantidad = valor_cantidad
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        let existe = false;

        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].nombre === dron.nombre) { 
                carrito[i].cantidad += valor_cantidad
                existe = true;
                break; 
            }
        }   

        if (!existe) {
            carrito.push(productoDronObject);
        }

        localStorage.setItem("carrito",JSON.stringify(carrito))
    }

    document.getElementById("carrito").addEventListener("click",()=>{
        subirLocalStorage()
    })
};

let parametro = extraerParametro();
traerJson(parametro);

