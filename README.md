# 🏥 Sistema Hospitalario Distribuido con Node.js y MQTT

## 📌 Descripción

Este proyecto simula un **sistema hospitalario distribuido** donde un **servidor central** administra historiales médicos y se comunica con varios **nodos hospitalarios** a través de **MQTT**. Implementa **mecanismos de contingencia** reales como:

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

## 🧱 Estructura del proyecto

### 🖥️ Parrot OS

```
parrot-servidor/
├── servidor_central/
│   └── servidor.js
├── shared/
│   └── circuitBreaker.js
├── utilidades/
│   └── limpiarRetain.js
├── package.json
└── node_modules/
```

### 💻 Windows

```
windows-hospital/
├── hospitales/
│   └── hospital.js
├── package.json
└── node_modules/
```

---

## 🚀 Instalación y ejecución

### 🟢 En Parrot OS (Servidor)

1. Instala Mosquitto:

```bash
sudo apt install mosquitto
sudo systemctl start mosquitto
```

2. Configura el broker para aceptar conexiones externas:

```yaml
listener 1883
allow_anonymous true
```

3. Instala dependencias:

```bash
npm install
```

4. Ejecuta el servidor:

```bash
node servidor_central/servidor.js
```

### 🔵 En Windows (Hospital/Nodo)

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta el nodo:

```bash
node hospitales/hospital.js
```

---

## 🧠 Flujo del sistema

1. El servidor intenta conectarse a la base de datos.
2. Si falla, aplica Retry + Backoff.
3. Si los intentos fallan, activa el Circuit Breaker y emite PAUSA.
4. Los hospitales reciben el mensaje y entran en modo local.
5. Cuando el circuito se cierra, el servidor emite REANUDADO.
6. Los hospitales reanudan sus operaciones automáticamente.

---

## 🧹 Limpieza de mensajes retenidos

Si deseas limpiar mensajes antiguos del broker, ejecuta:

```bash
node utilidades/limpiarRetain.js
```
