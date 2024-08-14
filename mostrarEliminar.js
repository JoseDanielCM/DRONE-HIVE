const elementosCarrito = document.querySelectorAll(".carrito-article")

for (const elemento of elementosCarrito) {
    elemento.addEventListener("click",()=>{
        elemento.classList.toggle("subirArticulo")

    })
}

const containerElementos = document.getElementById("list-carrito-items")

containerElementos.addEventListener("click",()=>{
    containerElementos.style.marginTop = "15vw"

})