let div1 = document.getElementById("card1")

function crearPlantilla(objeto){
    return  `<div class="card" style="width: 20rem; text-align: center;" >
            <img src="${objeto.image}" class="img_cards rounded-top-2">
            <div class="card-body">
            <h5 class="card-title">${objeto.name}</h5>
            <p class="card-text">${objeto.description}</p>
            </div>
            <div class="card-body d-flex justify-content-around">
            <p>Price: $ ${objeto.price}</p>
            <a href="./assets/pages/details.html" class="btn btn-danger btn-details">Details</a>
            </div>
            </div>`
}
function imprimirDatos(array,lugar){
    let template = ""

    for(let event of array){
        template += crearPlantilla(event)
    }
    console.log(template)
    lugar.innerHTML += template
}

imprimirDatos(data.events, div1)