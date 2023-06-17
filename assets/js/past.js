const container = document.getElementById("container")
const containerCheckboxes = document.getElementById("containerCheckboxes")

const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")

let data
let categoryList

// FUNCIONES PARA crear checkboxes e imprimirlos en HTML

import { 
  url,
  plantillaCheckboxes, 
  imprimirCheckboxes,
  crearPlantilla,
  getSelectedCategories,
  checkboxes
 } 
 from './functions.js'

const crearCheckboxes = () => {
  imprimirCheckboxes(categoryList, containerCheckboxes)
}

// Acá filtro las cards
const filterCards = () => {
  const selectedCategories = getSelectedCategories()
  const inputValue = searchInput.value.toLowerCase().trim()

  let filteredCards = data.events.filter(function (event) {
    return (
      (selectedCategories.length === 0 ||
        selectedCategories.includes(event.category)) &&
      (inputValue === "" || event.name.toLowerCase().includes(inputValue))
    )
  })

  // Esto es para que si se cumplen las condiciones me muestre solo lo "nuevo", y no acumule
  container.innerHTML = ""
  imprimirDatos(filteredCards, container)
}

const imprimirDatos = (array, lugar) => {
  let template = ""

  for(let event of array){
    if(data.currentDate > event.date){
        template += crearPlantilla(event)    
    }
}

  lugar.innerHTML += template
}

fetch(url)
  .then((response) => response.json())
  .then((responseData) => {
    data = responseData

    // Crear una lista con las categorías, con elementos únicos ya que tengo dos eventos por cada categoría
    const categories = data.events.map((cat) => cat.category)
    const catNoRepeat = new Set(categories)
    categoryList = Array.from(catNoRepeat)

    // Llamar a la función crearCheckboxes
    crearCheckboxes()

    // Acá recorro cada elemento de checkboxes para que cuando se seleccione, comience a correr la función de filtrar las cards
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", filterCards)
    })

    // Agrego un escuchador de eventos clic al botón, para que filtre las cards al hacerle clic
    searchButton.addEventListener("click", filterCards)

    // Acá llamo a la función, para que me muestre todas las cards antes de activar cualquier filtrado y/o función
    filterCards()
  })
  .catch((error) => console.error(error))