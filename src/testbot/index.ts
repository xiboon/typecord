import { FastifyReply } from 'fastify';
import { Client } from '../Client.js';
const client = new Client({
    port: 3000,
    publicKey: ''
});

client.on('ping', () => {
    console.log('Ping');
});
client.on('command', (command, reply: FastifyReply) => {
    // if (command.data.name === 'ping') {
    reply.send({ type: 4, data: { content: 'Pong' } });
    // }
});

client.start();
