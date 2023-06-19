export { 
        url, 
        checkboxes, 
        plantillaCheckboxes, 
        imprimirCheckboxes, 
        crearPlantilla, 
        getSelectedCategories,
        busqueda}

const url = "https://mindhub-xj03.onrender.com/api/amazing"

const checkboxes = document.getElementsByName("category")

const plantillaCheckboxes = (objeto) => {
  return `<div>
                <input type="checkbox" class="check" name="category" value="${objeto}">
                <label class="m-1 me-4 font">${objeto}</label>
            </div>`
}

const imprimirCheckboxes = (array, lugar) => {
  let template = ""

  for (let category of array) {
    template += plantillaCheckboxes(category)
  }

  lugar.innerHTML += template
}

let href = location.pathname.includes("index")
    ? "./assets/pages/details.html"
    : "../pages/details.html"


const crearPlantilla = (objeto) => {
  return `<div class="card" style="width: 20rem; text-align: center;" >
                      <img src="${objeto.image}" class="img_cards rounded-top-2">
                      <div class="card-body">
                          <h5 class="card-title">${objeto.name}</h5>
                          <p class="card-text">${objeto.description}</p>
                      </div>
                      <div class="card-body d-flex justify-content-around">
                          <p>Price: $ ${objeto.price}</p>
                          <a href="${href}?id=${objeto._id}" class="btn btn-danger btn-details">Details</a> 
                      </div>
                  </div>`;

const getSelectedCategories = () => {
  return Array.from(checkboxes)
    .filter(function (checkbox) {
      return checkbox.checked;
    })
    .map(function (checkbox) {
      return checkbox.value;
    });
}


function busqueda(eventos, container){

imprimirDatos(eventos, container)

function filterCards(){
  const selectedCategories = getSelectedCategories()
  const inputValue = searchInput.value.toLowerCase().trim()

  const filteredCards = eventos.filter(function (e) {
    return (
        (selectedCategories.length === 0 ||
          selectedCategories.includes(e.category)) &&
        (inputValue === "" || e.name.toLowerCase().includes(inputValue))
      )
    })

  container.innerHTML = ""
  imprimirDatos(filteredCards, container)
}

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", filterCards)
})

searchButton.addEventListener("click", filterCards)

}

function imprimirDatos(array, lugar){
  let template = ""

  for(let event of array){
    
    template += crearPlantilla(event)    
  }

  lugar.innerHTML += template
}
