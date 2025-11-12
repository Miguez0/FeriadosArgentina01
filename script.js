import { Terminal } from "https://unpkg.com/@es-js/terminal?module";
import { obtenerJson } from "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js";
import { validarSecreto } from "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js";
import { calcularProximoFeriado } from "https://desarrollo-aplicaciones.vercel.app/2024/code/calcular-proximo-feriado.js";

async function inicio() {
  Terminal.escribir("Hola! Ingresa la palabra secreta:");

  const secreto = await Terminal.leer();

  const dni = "45723805";

  if (await validarSecreto(dni, secreto)) {
    await mostrarProximoFeriado();
  } else {
    Terminal.escribir("Palabra secreta inválida");
  }

  Terminal.escribir("Presiona ENTER para volver a ingresar");

  await Terminal.leerEnter();

  Terminal.limpiar();

  inicio();
}

async function mostrarProximoFeriado() {
  Terminal.escribir("Cargando feriados...");

  const feriados = await obtenerJson(
    "https://api.argentinadatos.com/v1/feriados/"
  );

  const proximoFeriado = calcularProximoFeriado(feriados);

  Terminal.escribir("");
  Terminal.escribir("🎉 Próximo feriado en Argentina:");
  Terminal.escribir("📅 Fecha: " + proximoFeriado.fecha);
  Terminal.escribir("🏖️ Nombre: " + proximoFeriado.nombre);
  Terminal.escribir("");
}

inicio();
