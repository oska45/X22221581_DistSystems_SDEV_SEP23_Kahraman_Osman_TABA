//publisher2.js
const mqtt = require('mqtt');
const io = require('socket.io-client');

const mqttClient = mqtt.connect('mqtt://broker.hivemq.com:1883');
const socket = io('http://localhost:3000');

const lightTopic = 'floor/light/status';
const windowTopic = 'floor/window/status';
const interval = 500; // Publish data every half second

mqttClient.on('connect', () => {
    console.log('Publisher 2 (Light & Window Status) connected to MQTT broker.');
    setInterval(() => {
        const lightStatus = Math.random() > 0.5 ? 'ON' : 'OFF'; // Random light status
        const windowStatus = Math.random() > 0.5 ? 'OPEN' : 'CLOSED'; // Random window status
        mqttClient.publish(lightTopic, lightStatus);
        mqttClient.publish(windowTopic, windowStatus);
        console.log(`Messages sent: Light: ${lightStatus}, Window: ${windowStatus}`);
    }, interval);
});

socket.on('connect', () => {
    console.log('WebSocket connection established.');
});

socket.on('error', (error) => {
    console.error('WebSocket error:', error);
});
