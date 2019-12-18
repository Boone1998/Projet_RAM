var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');



client.on('connect', function () {
      console.log("MQTT connecté !");
});



client.subscribe('RAM/panneau/etats/#');
