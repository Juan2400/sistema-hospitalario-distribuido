# 🏥 Sistema Hospitalario Distribuido con Node.js y MQTT

## 📌 Descripción

Este proyecto simula un **sistema hospitalario distribuido** donde un **servidor central** administra historiales médicos y se comunica con varios **nodos hospitalarios** a través de **MQTT**.  
Implementa **mecanismos de contingencia** reales como:

- 🔁 Retry + Backoff (reintentos con espera progresiva)
- ⚡ Circuit Breaker (corte temporal del servicio)
- 📣 Comunicación Multicast (mensajería a múltiples nodos)
- 🔄 Fallback y reanudación automática

El entorno se despliega en **dos máquinas reales** dentro de una misma red local:
- 🖥️ **Parrot OS:** Servidor central + Broker MQTT (Mosquitto)
- 💻 **Windows:** Nodos hospitalarios (clientes MQTT)

---

## ⚙️ Tecnologías utilizadas

- Node.js
- MQTT (Mosquitto)
- Comunicación entre procesos distribuidos
- JavaScript ES6

---
