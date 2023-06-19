const url = "https://mindhub-xj03.onrender.com/api/amazing";

const mayorAsistencia = document.getElementById("mayorAsistencia");
const menorAsistencia = document.getElementById("menorAsistencia");
const mayorCapacidad = document.getElementById("mayorCapacidad");
const table2 = document.getElementById("table2");
const table3 = document.getElementById("table3");
const revenuesFut = document.getElementsByName("revenuesFut");
const revenuesPas = document.getElementsByName("revenuesPas");
const porcentajeFut = document.getElementsByName("porcentajeFut");
const porcentajePas = document.getElementsByName("porcentajePas");

// TABLAS
let categoryListPas;
let categoryListFut;

// 2
const filasTable2 = (objeto) => {
  return `<tr>
              <td class="table-light">${objeto}</td>
              <td class="table-light" name="revenuesFut"></td>
              <td class="table-light" name="porcentajeFut"></td>
          </tr>`;
};

const imprimirFilasTable2 = (array, lugar) => {
  let template = "";

  for (let category of array) {
    template += filasTable2(category);
  }

  lugar.innerHTML += template;
};

function crearFilasTable2(currentDate, data) {
  imprimirFilasTable2(categoryListFut, table2);

  for (let i = 0; i < revenuesFut.length; i++) {
    const category = categoryListFut[i];
    const estimadoIngresosFuturos = calcularEstimadoIngresosFuturos(
      category,
      currentDate,
      data
    );

    revenuesFut[i].textContent = estimadoIngresosFuturos;
  }

  for (let i = 0; i < porcentajeFut.length; i++) {
    const category = categoryListFut[i];
    const estimadoAsistencia = porcentajeEstimadoDeAsistencia(
      category,
      currentDate,
      data
    );

    porcentajeFut[i].textContent = estimadoAsistencia;
  }
}

// 3
const filasTable3 = (objeto) => {
  return `<tr>
              <td class="table-light">${objeto}</td>
              <td class="table-light" name="revenuesPas"></td>
              <td class="table-light" name="porcentajePas"></td>
          </tr>`;
};

const imprimirFilasTable3 = (array, lugar) => {
  let template = "";

  for (let category of array) {
    template += filasTable3(category);
  }

  lugar.innerHTML += template;
};

const crearFilasTable3 = (currentDate, data) => {
  imprimirFilasTable3(categoryListPas, table3);

  for (let i = 0; i < revenuesPas.length; i++) {
    const category = categoryListPas[i];
    const ingresosPasados = calcularIngresosPasados(category, currentDate, data)
    revenuesPas[i].textContent = ingresosPasados;
  }

  for (let i = 0; i < porcentajePas.length; i++) {
    const category = categoryListPas[i];
    const asistencia = porcentajeDeAsistencia(category, currentDate, data);

    porcentajePas[i].textContent = asistencia;
  }
};

// FUNCIONES

function eventoConMayorAsistencia(data) {
  let maxAsistencia = 0;
  let eventoConMayorAsistencia;

  data.forEach((evento) => {
    const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;

    if (porcentajeAsistencia > maxAsistencia) {
      maxAsistencia = porcentajeAsistencia;
      eventoConMayorAsistencia = evento;
    }
  });

  mayorAsistencia.innerHTML =
    eventoConMayorAsistencia.name + " " + maxAsistencia.toFixed(2) + " %";
}

function eventoConMenorAsistencia(data) {
  let minAsistencia = Infinity;
  let eventoConMenorAsistencia;

  data.forEach((evento) => {
    const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;

    if (porcentajeAsistencia < minAsistencia) {
      minAsistencia = porcentajeAsistencia;
      eventoConMenorAsistencia = evento;
    }
  });

  menorAsistencia.innerHTML =
    eventoConMenorAsistencia.name + " " + minAsistencia + " %";
}

function eventoConMayorCapacidad(data) {
  let maxCapacidad = 0;
  let eventoConMayorCapacidad = null;

  data.forEach((evento) => {
    const porcentajeCapacidad = evento.capacity;

    if (porcentajeCapacidad > maxCapacidad) {
      maxCapacidad = porcentajeCapacidad;
      eventoConMayorCapacidad = evento;
    }
  });

  mayorCapacidad.innerHTML = eventoConMayorCapacidad.name + " " + maxCapacidad;
}

function calcularEstimadoIngresosFuturos(category, currentDate, data) {
  const eventosCategoria = data.filter(
    (evento) => evento.category === category
  );
  let total = 0;

  eventosCategoria.forEach((evento) => {
    if (currentDate < evento.date) {
      total += evento.estimate * evento.price;
    }
  });

  return "$" + total.toLocaleString();
}

function calcularIngresosPasados(category, currentDate, data) {
  const eventosCategoria = data.filter(
    (evento) => evento.category === category
  );
  let total = 0;

  eventosCategoria.forEach((evento) => {
    if (currentDate > evento.date) {
      total += evento.assistance * evento.price;
    }
  });

  return "$" + total.toLocaleString();
}

function porcentajeEstimadoDeAsistencia(category, currentDate, data) {
  const eventosCategoria = data.filter(
    (evento) => evento.category === category && currentDate < evento.date
  );

  let capacidadTotal = 0;
  let asistenciaTotal = 0;

  eventosCategoria.forEach((evento) => {
    asistenciaTotal += evento.estimate
    capacidadTotal += evento.capacity
  });


  const porcentaje = (asistenciaTotal * 100) / capacidadTotal;

  return porcentaje.toFixed(2) + " %";
}

function porcentajeDeAsistencia(category, currentDate, data) {
  const eventosCategoria = data.filter(
    (evento) => evento.category === category && currentDate > evento.date
  );

  let capacidadTotal = 0;
  let asistenciaTotal = 0;

  eventosCategoria.forEach((evento) => {
    asistenciaTotal += evento.assistance;
    capacidadTotal += evento.capacity;
  });

  const porcentaje = (asistenciaTotal / capacidadTotal) * 100;

  return porcentaje.toFixed(2) + " %";
}

fetch(url)
  .then((response) => response.json())
  .then((responseData) => {
    const currentDate = responseData.currentDate;
    const data = responseData.events;

    const categoriesPas = data
      .map((event) => {
        if (event.date < responseData.currentDate) {
          return event.category;
        }
      })
      .filter(Boolean);
    const catNoRepeatPas = new Set(categoriesPas);
    categoryListPas = Array.from(catNoRepeatPas);

    const categoriesFut = data
      .map((event) => {
        if (event.date > responseData.currentDate) {
          return event.category;
        }
      })
      .filter(Boolean);
    const catNoRepeatFut = new Set(categoriesFut);
    categoryListFut = Array.from(catNoRepeatFut);

    eventoConMayorAsistencia(data);
    eventoConMenorAsistencia(data);
    eventoConMayorCapacidad(data);
    crearFilasTable2(currentDate, data);
    crearFilasTable3(currentDate, data);
  })
  .catch((error) => {
    console.log("Error al obtener los datos:", error);
  });