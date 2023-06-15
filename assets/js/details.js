const container = document.getElementById("container-main"); // Traer el contenedor donde va a ir la card con el evento

const parametro = new URLSearchParams(location.search);
const id = parametro.get("id");

let eventoEncontrado

function showDetails(){
    container.innerHTML = `
      <div class="d-flex flex-row justify-content-center align-items-center content-details rounded">
        <img class="event rounded" src="${eventoEncontrado.image}" alt="Evento ${eventoEncontrado.name}">
        <div class="card ms-3 card-details d-flex justify-content-center">
          <h3 class="d-flex justify-content-center">${eventoEncontrado.name}</h3>
          <p class="mb-2 mt-3 ms-3">Date: ${eventoEncontrado.date}</p>
          <p class="mb-2 ms-3 me-3">Description: ${eventoEncontrado.description}</p>
          <p class="mb-2 ms-3">Category: ${eventoEncontrado.category}</p>
          <p class="mb-2 ms-3">Place: ${eventoEncontrado.place}</p>
          <p class="mb-2 ms-3">Capacity: ${eventoEncontrado.capacity}</p>
          <p class="mb-2 ms-3">Assistence or estimate: ${eventoEncontrado.assitance}</p>
          <p class="mb-2 ms-3">Price: $${eventoEncontrado.price}</p>
        </div>
      </div>`
}

// Obtener el evento específico mediante una solicitud fetch
fetch(`https://mindhub-xj03.onrender.com/api/amazing/`)
  .then((response) => response.json())
  .then((responseData) => {
    eventoEncontrado = responseData.events.find(evento => evento._id == id)
    showDetails()
  })
  .catch((err) => console.log(err))
