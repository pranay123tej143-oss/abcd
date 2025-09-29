import mqtt from "mqtt";
import { handleRfidScan, handleRelayStateUpdate } from "./handlers";

let client: mqtt.MqttClient | null = null;

export function getMqttClient() {
  if (client?.connected) return client;

  const options: mqtt.IClientOptions = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: `smart-lab-${Math.random().toString(16).slice(2, 8)}`,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30000,
  };

  client = mqtt.connect(process.env.MQTT_BROKER_URL!, options);

  client.on("connect", () => {
    console.log("✅ MQTT Connected");
    client?.subscribe("lab/rfid/scan", { qos: 1 });
    client?.subscribe("lab/relay/state", { qos: 1 });
  });

  client.on("message", async (topic, payload) => {
    try {
      const data = JSON.parse(payload.toString());

      if (topic === "lab/rfid/scan") {
        await handleRfidScan(data);
      } else if (topic === "lab/relay/state") {
        await handleRelayStateUpdate(data);
      }
    } catch (error) {
      console.error("❌ MQTT message error:", error);
    }
  });

  client.on("error", (error) => {
    console.error("❌ MQTT error:", error);
  });

  return client;
}

export function publishRelayCommand(
  relayId: number,
  state: boolean,
  controlledBy: string
) {
  const client = getMqttClient();

  if (!client?.connected) {
    console.error("❌ MQTT not connected");
    return;
  }

  const message = {
    relay_id: relayId,
    state,
    timestamp: Date.now(),
    controlled_by: controlledBy,
  };

  client.publish("lab/relay/command", JSON.stringify(message), { qos: 1 });
  console.log(`📡 Relay command: ${relayId} → ${state ? "ON" : "OFF"}`);
}
