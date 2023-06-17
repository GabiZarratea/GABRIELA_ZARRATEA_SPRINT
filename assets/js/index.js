const container = document.getElementById("container")
const containerCheckboxes = document.getElementById("containerCheckboxes")
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")

let data
let categoryList

import { 
         url,
         plantillaCheckboxes, 
         imprimirCheckboxes,
         crearPlantilla,
         getSelectedCategories,
         checkboxes
        } 
        from './functions.js'

// Acá obtengo las categorías seleccionadas

const crearCheckboxes = () => {
  imprimirCheckboxes(categoryList, containerCheckboxes)
}

const imprimirDatos = (array, lugar) => {
  let template = "";

  for (let event of array) {
    template += crearPlantilla(event);
  }

  lugar.innerHTML += template;
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

fetch(url)
  .then((response) => response.json())
  .then((responseData) => {
    data = responseData

    const categories = data.events.map((cat) => cat.category)
    const catNoRepeat = new Set(categories)
    categoryList = Array.from(catNoRepeat)

    crearCheckboxes()

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", filterCards)
    })

    searchButton.addEventListener("click", filterCards)

    filterCards()
  })
  .catch((error) => console.error(error))