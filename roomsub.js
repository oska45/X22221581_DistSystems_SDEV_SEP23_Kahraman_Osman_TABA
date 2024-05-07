
//roomsub.js
const mqtt = require('mqtt');
const io = require('socket.io-client');

const mqttClient = mqtt.connect('mqtt://broker.hivemq.com:1883');
const socket = io('http://localhost:3000');

const roomTopic = 'floor/room/#'; // Subscribe to all subtopics under floor/room/

mqttClient.on('connect', () => {
    console.log('Subscriber for Any Room Data connected to MQTT broker.');
    mqttClient.subscribe(roomTopic);
});

mqttClient.on('message', (topic, message) => {
    console.log(`Received message from ${topic}: ${message.toString()}`);
});

mqttClient.on('error', (err) => {
    console.error('Subscriber for Any Room Data MQTT connection error:', err);
});

mqttClient.on('offline', () => {
    console.log('Subscriber for Any Room Data MQTT connection offline.');
});

mqttClient.on('close', () => {
    console.log('Subscriber for Any Room Data MQTT connection closed.');
});

socket.on('connect', () => {
    console.log('WebSocket connection established.');
});

socket.on('error', (error) => {
    console.error('WebSocket error:', error);
});
