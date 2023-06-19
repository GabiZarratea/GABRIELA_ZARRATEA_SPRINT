const container = document.getElementById("container")
const containerCheckboxes = document.getElementById("containerCheckboxes")
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")

let data
let categoryList
import { 
         url,
         imprimirCheckboxes,
         checkboxes,
         busqueda
        } 
        from './functions.js'

fetch(url)
  .then((response) => response.json())
  .then((responseData) => {
    data = responseData
    let eventos = data.events

    const categories = data.events.map((cat) => cat.category)
    const catNoRepeat = new Set(categories)
    categoryList = Array.from(catNoRepeat)

    imprimirCheckboxes(categoryList, containerCheckboxes)
    
    busqueda(eventos, container)

  })
  .catch((error) => console.error(error))