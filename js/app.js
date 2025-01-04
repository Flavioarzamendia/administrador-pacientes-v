// selectores
const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emailInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const sintomasInput = document.querySelector("#sintomas");
const formularioCita = document.querySelector("#formulario-cita");
const formularioInput = document.querySelector('#formulario-cita input[type="submit"]');
const contenedorCitas = document.querySelector("#citas");

let editando = false;

// objeto de cita
const citaObj = {
  id: generarId(),
  paciente: "",
  propietario: "",
  email: "",
  fecha: "",
  sintomas: "",
};

class Notificacion {
  constructor({ texto, tipo }) {
    (this.texto = texto), (this.tipo = tipo);
    this.mostrar();
  }

  mostrar() {
    const alerta = document.createElement("DIV");
    alerta.classList.add(
      "text-center",
      "w-full",
      "p-3",
      "text-white",
      "my-5",
      "alert",
      "uppercase",
      "font-bold",
      "text-sm"
    );

    const alertaPrevia = document.querySelector(".alert");
    alertaPrevia?.remove();

    this.tipo === "error"
      ? alerta.classList.add("bg-red-500")
      : alerta.classList.add("bg-green-500");

    alerta.textContent = this.texto;

    formularioCita.parentElement.insertBefore(alerta, formularioCita);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

class AdminCitas {
  constructor() {
    this.citas = JSON.parse(localStorage.getItem("citas")) || [];
    this.mostrar();
  }

  agregar(cita) {
    this.citas = [...this.citas, cita];
    this.sincronizarStorage();
    this.mostrar();
  }

  editar(citaActualizada) {
    this.citas = this.citas.map(cita =>
      cita.id === citaActualizada.id ? citaActualizada : cita
    );
    this.sincronizarStorage();
    this.mostrar();
  }

  eliminar(id) {
    this.citas = this.citas.filter(cita => cita.id !== id);
    this.sincronizarStorage();
    this.mostrar();
  }

  sincronizarStorage() {
    localStorage.setItem("citas", JSON.stringify(this.citas));
  }

  mostrar() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }

    this.citas.forEach(cita => {
      const divCita = document.createElement("div");
      divCita.classList.add(
        "mx-5",
        "my-10",
        "bg-white",
        "shadow-md",
        "px-5",
        "py-10",
        "rounded-xl",
        "p-3"
      );

      const paciente = document.createElement("p");
      paciente.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
      paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

      const propietario = document.createElement("p");
      propietario.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
      propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

      const email = document.createElement("p");
      email.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
      email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

      const fecha = document.createElement("p");
      fecha.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
      fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

      const sintomas = document.createElement("p");
      sintomas.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
      sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

      const btnEditar = document.createElement("button");
      btnEditar.classList.add(
        "py-2",
        "px-10",
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "text-white",
        "font-bold",
        "uppercase",
        "rounded-lg",
        "btn-editar"
      );
      btnEditar.textContent = "Editar";
      btnEditar.onclick = () => cargarEdicion(cita);

      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add(
        "py-2",
        "px-10",
        "bg-red-600",
        "hover:bg-red-700",
        "text-white",
        "font-bold",
        "uppercase",
        "rounded-lg",
        "btn-eliminar"
      );
      btnEliminar.textContent = "Eliminar";
      btnEliminar.onclick = () => {
        this.eliminar(cita.id);
        new Notificacion({ texto: "Cita eliminada correctamente.", tipo: "exito" });
      };

      const contenedorBotones = document.createElement("DIV");
      contenedorBotones.classList.add("flex", "justify-between", "mt-10");
      contenedorBotones.appendChild(btnEditar);
      contenedorBotones.appendChild(btnEliminar);

      divCita.appendChild(paciente);
      divCita.appendChild(propietario);
      divCita.appendChild(email);
      divCita.appendChild(fecha);
      divCita.appendChild(sintomas);
      divCita.appendChild(contenedorBotones);
      contenedorCitas.appendChild(divCita);
    });
  }
}

// eventos
pacienteInput.addEventListener("change", datosCita);
propietarioInput.addEventListener("change", datosCita);
emailInput.addEventListener("change", datosCita);
fechaInput.addEventListener("change", datosCita);
sintomasInput.addEventListener("change", datosCita);
formularioCita.addEventListener("submit", submitCita);

const citas = new AdminCitas();

function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

function submitCita(e) {
  e.preventDefault();

  if (Object.values(citaObj).some(valor => valor.trim() === "")) {
    new Notificacion({ texto: "Todos los campos son obligatorios.", tipo: "error" });
    return;
  }

  if (editando) {
    citas.editar({ ...citaObj });
    new Notificacion({ texto: "Cita editada correctamente.", tipo: "exito" });
    editando = false;
  } else {
    citas.agregar({ ...citaObj });
    new Notificacion({ texto: "Cita agregada correctamente.", tipo: "exito" });
  }

  formularioCita.reset();
  reiniciarObjCita();
  formularioInput.value = 'Registrar Paciente'
  editando = false
}

function reiniciarObjCita() {
  Object.assign(citaObj, {
    id: generarId(),
    paciente: "",
    propietario: "",
    email: "",
    fecha: "",
    sintomas: "",
  });
}

function generarId() {
  return Math.random().toString(36).substring(2) + Date.now();
}

function cargarEdicion(cita) {
  Object.assign(citaObj, cita);

  pacienteInput.value = cita.paciente;
  propietarioInput.value = cita.propietario;
  emailInput.value = cita.email;
  fechaInput.value = cita.fecha;
  sintomasInput.value = cita.sintomas;

  editando = true;

  formularioInput.value = 'Guardar Cambios'
}
