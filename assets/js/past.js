//FILTRAR POR CHECKBOXES E INPUT

//Cards y Checkboxes desde html
const container = document.getElementById("container")
const containerCheckboxes = document.getElementById("containerCheckboxes")

//Acá obtengo todos los elementos con 'name="category" desde los ccheckboxes'
//Y lo que devuelve es una NodeList, o sea una coleccion de elementos del DOM
const checkboxes = document.getElementsByName("category")


const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")

//Crear una lista con las categorias, con elementos unicos ya que tengo dos eventos por cada cateogria
const categories = data.events.map((cat) => cat.category)
const catNoRepeat = new Set(categories)
const categoryList = Array.from(catNoRepeat)

//Crear los checkboxes e imprimirlos en HTML
const crearCheckboxes = () => {    

    const plantillaCheckboxes = (objeto) => {
        return  `<div>
                    <input type="checkbox" class="check" name="category" value="${objeto}">
                    <label class="m-1 me-4 font">${objeto}</label>
                </div>`
        }            
    
    const imprimirCheckboxes = (array,lugar) => {
        let template = ""
    
        for(let category of array){
            template += plantillaCheckboxes(category)
        }
    
        lugar.innerHTML += template
    }
    
    imprimirCheckboxes(categoryList, containerCheckboxes)
}

//Llamar a la función crearCheckboxes
crearCheckboxes() 

//Acá obtengo las categorías seleccionadas
const getSelectedCategories = () => {
    return Array.from(checkboxes).filter(function (checkbox) {
        return checkbox.checked
    }).map(function (checkbox) {
        return checkbox.value
    })
}

//Acá filtro las cards
const filterCards = () => {
    const selectedCategories = getSelectedCategories()
    const inputValue = searchInput.value.toLowerCase().trim()

    let filteredCards = data.events.filter(function(event) {

        return (selectedCategories.length === 0 || selectedCategories.includes(event.category)) &&
               (inputValue === "" || event.name.toLowerCase().includes(inputValue)) 
    })

    //Esto es para que si se cumplen las condiciones me muestre solo lo "nuevo", no acumule
    container.innerHTML = ""
    imprimirDatos(filteredCards, container)
}

const crearPlantilla = (objeto) => {
    return  `<div class="card" style="width: 20rem; text-align: center;" >
                <img src="${objeto.image}" class="img_cards rounded-top-2">
                <div class="card-body">
                    <h5 class="card-title">${objeto.name}</h5>
                    <p class="card-text">${objeto.description}</p>
                </div>
                <div class="card-body d-flex justify-content-around">
                    <p>Price: $ ${objeto.price}</p>
                    <a href="../pages/details.html?id=${objeto._id}" class="btn btn-danger btn-details">Details</a> 
                </div>
            </div>`
}

const imprimirDatos = (array,lugar) => {
    let template = ""

    for(let event of array){
        if(data.currentDate > event.date){
            template += crearPlantilla(event)    
        }
    }

    lugar.innerHTML += template
}

//Acá recorro cada elemento de checkboxes para que cuando se seleccione, comience a correr la funcion de filtrar las cards 
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", filterCards)
})

//Agrego un evento clic al boton, para que filtre las cards al hacerle clic
searchButton.addEventListener("click", filterCards)

//Acá llamo a la funcion, para que me muestre todas las cards antes de activar cualquier filtrado y/o funcion
filterCards()
