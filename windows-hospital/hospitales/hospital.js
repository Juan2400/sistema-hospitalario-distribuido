const mqtt = require("mqtt");

const brokerIp = "192.168.5.130";  // Reemplaza con la IP local del Parrot
const client = mqtt.connect(`mqtt://${brokerIp}:1883`);
//const client = mqtt.connect(`mqtt://[${brokerIp}]:1883`);

let activo = true;

// Al conectarse al broker
client.on("connect", () => {
  console.log("[HOSPITAL] 🏨 Conectado al servidor central");
  client.subscribe("hospitales/alerta", { qos: 1 });

  setInterval(() => {
    if (activo) {
      console.log("[HOSPITAL] Enviando solicitud de historial médico...");
    }
  }, 5000);
});

// Al recibir un mensaje de alerta
client.on("message", (topic, message) => {
  const alerta = message.toString();

  if (alerta.includes("PAUSA")) {
    console.log(`[HOSPITAL] ⚠️ ALERTA: ${alerta}`);
    console.log("[HOSPITAL] Cambiando a modo local...");
    activo = false;
  }

  if (alerta.includes("REANUDADO")) {
    console.log(`[HOSPITAL] ✅ SERVICIO RESTABLECIDO: ${alerta}`);
    console.log("[HOSPITAL] Reanudando solicitudes...");
    activo = true;
  }
});
