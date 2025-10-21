const mqtt = require("mqtt");
const { retryWithBackoff } = require("../shared/circuitBreaker");

const client = mqtt.connect("mqtt://localhost:1883");

// Cuando se conecta al broker
client.on("connect", async () => {
  console.log("[SERVIDOR] Conectado al broker MQTT");

  try {
    // Intentar conectarse a la base de datos con retry y backoff
    await retryWithBackoff(async () => {
      if (Math.random() < 0.7) throw new Error("❌ BD desconectada");
      console.log("[SERVIDOR] ✅ Conexión a base de datos exitosa.");
    }, client);
  } catch (e) {

    // Si falla tras varios intentos, notificar a hospitales
    console.log("[SERVIDOR] 🚨 Fallo detectado. Enviando alerta a hospitales...");

    client.publish("hospitales/alerta", "PAUSA: Servidor fuera de servicio", {
      qos: 1,//QoS 1 garantiza entrega del mensaje
      retain: true//el mensaje queda guardado en el broker.
    });
  }
});

