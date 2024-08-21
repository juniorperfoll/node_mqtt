const mqtt = require('mqtt');

// Conectando ao broker MQTT (alterar a URL para o seu broker)
const client = mqtt.connect('mqtt://localhost:1883'); // Pode ser mqtt://seu-broker.com

// Quando conectado
client.on('connect', () => {
  console.log('Conectado ao broker MQTT');

  // Subscrevendo ao tópico 'test/topic'
  client.subscribe('/sensor/temperatura', (err) => {
    if (!err) {
      console.log('Inscrito no tópico sensor/temperatura');
      
      // Publicando uma mensagem no tópico 'sensor/temperatura'
      //client.publish('sensor/temperatura', '50');
    } else {
      console.error('Erro ao subscrever no tópico', err);
    }
  });
});

// Quando uma mensagem for recebida no tópico inscrito
client.on('message', (topic, message) => {
  // message é um Buffer, então convertemos para string
  console.log(`Mensagem recebida do tópico ${topic}: ${message.toString()}`);
});
