import { FastifyReply } from 'fastify';
import { Client } from '../Client.js';
import { SlashCommandInteraction } from '../structures/SlashCommandInteraction.js';
const client = new Client({
    port: 3000,
    publicKey: ''
});

client.on('ping', () => {
    console.log('Ping');
});
client.on('command', (command: SlashCommandInteraction, reply: FastifyReply) => {
    // if (command.data.name === 'ping') {
    if (command.name === 'unban') {
        reply.send({
            type: 4,
            data: { content: command.options.getUser('user').username }
        });
    } else reply.send({ type: 4, data: { content: 'Pong' } });
    // }
});

client.start();
