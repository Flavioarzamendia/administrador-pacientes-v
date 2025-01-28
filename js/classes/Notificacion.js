import {formularioCita} from '../selectores.js'


export default class Notificacion {
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