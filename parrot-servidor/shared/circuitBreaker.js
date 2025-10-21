let failureCount = 0;
let circuitOpen = false;

const MAX_FAILURES = 3;
const RESET_TIMEOUT = 10000;

function backoffDelay(attempt) {
  return Math.min(1000 * 2 ** attempt, 8000);
}

// Abre el circuito y envía alerta a los hospitales
function openCircuit(client) {
  circuitOpen = true;
  console.log("[CIRCUIT BREAKER] Circuito abierto: Hospitales deben trabajar en modo local.");

  // Después del timeout, cerrar el circuito y reiniciar el contador
  setTimeout(() => {
    circuitOpen = false;
    failureCount = 0;
    console.log("[CIRCUIT BREAKER] Circuito cerrado: Servicio reanudado.");

    // 🔔 Enviar mensaje de reanudación
    client.publish("hospitales/alerta", "REANUDADO: El servidor está disponible nuevamente", {
      qos: 1, 
      retain: true //el mensaje queda guardado en el broker.
    });
  }, RESET_TIMEOUT);
}

// Ejecuta una tarea con reintentos y backoff exponencial
async function retryWithBackoff(task, client) {
  for (let attempt = 0; attempt < MAX_FAILURES; attempt++) {
    if (circuitOpen) throw new Error("Circuito abierto");

    try {
      return await task(); // Intenta ejecutar la tarea
    } catch (err) {
      failureCount++;
      console.log(`[REINTENTO ${attempt + 1}] Error: ${err.message}`);
      await new Promise(res => setTimeout(res, backoffDelay(attempt)));
    }
  }

  openCircuit(client);
  throw new Error("Fallo tras varios intentos");
}

module.exports = { retryWithBackoff };
