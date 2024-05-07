const mqtt = require('mqtt');
const io = require('socket.io-client');

const mqttClient = mqtt.connect('mqtt://broker.hivemq.com:1883');
const socket = io('http://localhost:3000');

const temperatureTopic = 'floor/room/temperature';
const humidityTopic = 'floor/room/humidity';
const interval = 1000; // Publish data every second

mqttClient.on('connect', () => {
    console.log('Publisher 1 (Temperature & Humidity) connected to MQTT broker.');
    setInterval(() => {
        const temperature = (Math.random() * 30).toFixed(2); // Random temperature data
        const humidity = (Math.random() * 100).toFixed(2); // Random humidity data
        mqttClient.publish(temperatureTopic, `${temperature}°C`);
        mqttClient.publish(humidityTopic, `${humidity}%`);
        console.log(`Messages sent: Temperature: ${temperature}, Humidity: ${humidity}`);
    }, interval);
});

socket.on('connect', () => {
    console.log('WebSocket connection established.');
});

socket.on('error', (error) => {
    console.error('WebSocket error:', error);
});
