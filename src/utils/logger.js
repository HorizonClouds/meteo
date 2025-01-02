import config from '../config.js';

const CLIENT_ID = config.kafkaServiceName
const logLevel = config.logLevel;
const kafkaEnabled = config.kafkaEnabled;
let kafkaBroker, kafkaTopic, kafka, producer;

if (kafkaEnabled) {
  process.env.KAFKAJS_NO_PARTITIONER_WARNING = 1
  const { Kafka, Partitioners } = await import('kafkajs');
  kafkaBroker = config.kafkaBroker;
  kafkaTopic = config.kafkaTopic;
  kafka = new Kafka({ clientId: CLIENT_ID, brokers: [kafkaBroker], createPartitioner: Partitioners.LegacyPartitioner });
  producer = kafka.producer();
  
  const connectKafka = async () => {
    await producer.connect();
  };
  
  await connectKafka();
}

console.log(`Logger initialized for ${CLIENT_ID}; with variables: logLevel=${logLevel}, kafkaEnabled=${kafkaEnabled}, kafkaBroker=${kafkaBroker}, kafkaTopic=${kafkaTopic}`);

const logMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `${timestamp} [${CLIENT_ID}][${level}]: ${message}`;
};

const sendLogToKafka = async (formattedMessage) => {
  if (kafkaEnabled) {
    await producer.send({
      topic: kafkaTopic,
      messages: [{ value: formattedMessage }],
    });
  }
};

const info = async (message) => {
  if (logLevel === 'INFO' || logLevel === 'DEBUG') {
    const formattedMessage = logMessage('INFO', message);
    console.log(formattedMessage);
    await sendLogToKafka(formattedMessage);
  }
};

const debug = async (message) => {
  if (logLevel === 'DEBUG') {
    const formattedMessage = logMessage('DEBUG', message);
    console.log(formattedMessage);
    await sendLogToKafka(formattedMessage);
  }
};

global.logger = { info, debug };
export default logger = { info, debug };