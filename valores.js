// ESTRELLAS 

const stars = document.querySelectorAll(".star")

for (const star of stars) {
    star.addEventListener("click",()=>{

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

btnQuitar.addEventListener("click",()=>{
    valor_cantidad = cantidad.textContent
    if (valor_cantidad>0) {
        valor_cantidad--
        cantidad.textContent = valor_cantidad
    }
})

btnAdd.addEventListener("click",()=>{
    valor_cantidad = cantidad.textContent
    if (valor_cantidad<100) {
        valor_cantidad++
        cantidad.textContent = valor_cantidad
    }
})

// BASURA
const traerJson =  async function(){
    const elemeJson = await fetch("./productos.json")
    var datoss = await elemeJson.json()
    console.log(datoss)

}

traerJson()

