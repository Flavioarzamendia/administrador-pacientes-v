import {contenedorCitas} from '../selectores.js'
import { cargarEdicion } from '../finciones.js';



export default class AdminCitas {
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