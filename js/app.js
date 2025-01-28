
import {
  pacienteInput,
  propietarioInput,
  emailInput,
  fechaInput,
  sintomasInput,
  formularioCita
} from "./selectores.js";
import { datosCita, submitCita } from "./finciones.js";

// eventos
pacienteInput.addEventListener("change", datosCita);
propietarioInput.addEventListener("change", datosCita);
emailInput.addEventListener("change", datosCita);
fechaInput.addEventListener("change", datosCita);
sintomasInput.addEventListener("change", datosCita);
formularioCita.addEventListener("submit", submitCita);


