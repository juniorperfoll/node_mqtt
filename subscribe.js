const mqtt = require('mqtt');

// Conectando ao broker MQTT (substitua com o endereço do seu broker)
const client = mqtt.connect('mqtt://localhost:1883');

// Quando conectado
client.on('connect', () => {
  console.log('Conectado ao broker MQTT');

  // Subscrever ao tópico 'sensores/temperatura'
  client.subscribe('sensor/temperatura', (err) => {
    if (!err) {
      console.log('Inscrito no tópico sensor/temperatura');
    } else {
      console.error('Erro ao subscrever no tópico', err);
    }
  });
});

// Quando uma mensagem for recebida no tópico inscrito
client.on('message', (topic, message) => {
  // Convertendo a mensagem de Buffer para string
  const mensagemRecebida = message.toString();

  // Mostrando o valor recebido
  console.log(`Mensagem recebida do tópico ${topic}: ${mensagemRecebida}`);

  // Aqui você pode fazer o que quiser com o valor, por exemplo:
  if (topic === 'sensor/temperatura') {
    const temperatura = parseFloat(mensagemRecebida);
    console.log(`A temperatura recebida é: ${temperatura}°C`);

    // Você pode adicionar lógica para agir com base no valor da temperatura
    if (temperatura > 30) {
      console.log('Alerta: A temperatura está muito alta!');
    }
  }
});
