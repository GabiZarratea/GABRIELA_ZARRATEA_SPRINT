//FILTRAR POR CHECKBOXES E INPUT

    //Traigo el contenedor donde van a ir las cards
    const container = document.getElementById("container")

    //Acá obtengo todos los elementos con 'name="category"'
    //Y lo que devuelve es una NodeList, o sea una coleccion de elementos del DOM
    const checkboxes = document.getElementsByName("category")

    const searchInput = document.getElementById("searchInput")
    const searchButton = document.getElementById("searchButton")

const filterCards = () => {

    //Aca obtengo el valor del input de busqueda
    const inputValue = searchInput.value.toLowerCase().trim()

    //Acá estoy diciendo que 'selectedCategories' va a contener la coleccion de elementos que tiene 'checkboxes'
    //Y si fueron seleccionados crea un nuevo array con esos valores/categorias (.map)
    let selectedCategories = Array.from(checkboxes).filter(function(checkbox) {
        return checkbox.checked
    })
    .map(function(checkbox) { 
        return checkbox.value
    })

    //Acá filtro las cards

    filteredCards = data.events.filter(function(event) {
        
    let coincideCategoria = false

        if(selectedCategories.length === 0 || selectedCategories.includes(event.category)) {
            coincideCategoria = true
        }

    let coincideBusqueda = false

        if(inputValue === "" || event.name.toLowerCase().includes(inputValue) || event.description.toLowerCase().includes(inputValue)){
        coincideBusqueda = true
        }
        return (coincideCategoria && coincideBusqueda)
    })

    //Mostrar en HTML las cards
 
    //Esto es pata que mis cards no se acumulen, se borran para cargar las nuevas
    container.innerHTML = ""

    crearPlantilla = (objeto) => {
        return  `<div class="card" style="width: 20rem; text-align: center;" >
                <img src="${objeto.image}" class="img_cards rounded-top-2">
                <div class="card-body">
                <h5 class="card-title">${objeto.name}</h5>
                <p class="card-text">${objeto.description}</p>
                </div>
                <div class="card-body d-flex justify-content-around">
                <p>Price: $ ${objeto.price}</p>
                <a href="./assets/pages/details.html?id=${objeto._id}" class="btn btn-danger btn-details">Details</a> 
                </div>
                </div>`
        }
    // // " ?key=value " -> " ?id=${objeto._id} "  esa es la query params

    imprimirDatos = (array,lugar) => {
        let template = ""

        for(let event of array){
            template += crearPlantilla(event)
        }

        lugar.innerHTML += template
    }

    imprimirDatos(filteredCards, container)
    
}

//Acá recorro cada elemento de checkboxes para que cuando se seleccione, comience a correr la funcion de filtrar las cards 
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", filterCards)
})

//Agrego un evento clic al boton, para que filtre las cards al hacerle clic
searchButton.addEventListener("click", filterCards)

//Acá llamo a la funcion, para que me muestre todas las cards antes de activar cualquier filtrado y/o funcion
filterCards()

