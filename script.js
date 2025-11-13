// Usamos la Terminal expuesta globalmente
const { Terminal } = window;

// URLs externas
const URL_JSON = 'https://api.argentinadatos.com/v1/feriados/';
const URL_VALIDAR_SECRETO = 'https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js';
const URL_OBTENER_JSON = 'https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js';
const URL_CALCULAR_PROXIMO = 'https://desarrollo-aplicaciones.vercel.app/2024/code/calcular-proximo-feriado.js';

// Cargamos dinámicamente los módulos necesarios
async function cargarModulo(url) {
    const mod = await import(url);
    return mod;
}

async function inicio() {
    Terminal.configurar({ id: "terminal" });
    Terminal.escribir("Hola! Ingresa la palabra secreta:");

    const secreto = await Terminal.leer();
    const dni = "45723805"; // tu DNI

    const { validarSecreto } = await cargarModulo(URL_VALIDAR_SECRETO);
    const { obtenerJson } = await cargarModulo(URL_OBTENER_JSON);
    const { calcularProximoFeriado } = await cargarModulo(URL_CALCULAR_PROXIMO);

    if (await validarSecreto(dni, secreto)) {
        await mostrarProximoFeriado(obtenerJson, calcularProximoFeriado);
    } else {
        Terminal.escribir("Palabra secreta inválida");
    }

    Terminal.escribir("Presiona ENTER para volver a ingresar");
    await Terminal.leerEnter();

    Terminal.limpiar();
    inicio();
}

async function mostrarProximoFeriado(obtenerJson, calcularProximoFeriado) {
    Terminal.escribir("Cargando feriados...");

    const feriados = await obtenerJson(URL_JSON);
    const proximoFeriado = calcularProximoFeriado(feriados);

    Terminal.escribir("");
    Terminal.escribir("🎉 Próximo feriado en Argentina:");
    Terminal.escribir("📅 Fecha: " + proximoFeriado.fecha);
    Terminal.escribir("🏖️ Nombre: " + proximoFeriado.nombre);
    Terminal.escribir("");
}

inicio();
