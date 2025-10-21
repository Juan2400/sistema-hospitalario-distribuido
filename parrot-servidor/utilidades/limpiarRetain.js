const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  client.publish("hospitales/alerta", "", { retain: true });
  console.log("🧹 Mensaje retenido limpiado.");
  client.end();
});
