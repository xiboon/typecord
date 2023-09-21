import {
    APIChannel,
    APIMessageComponentSelectMenuInteraction,
    APIRole,
    APIUser
} from 'discord-api-types/v10';
import { MessageComponentInteraction } from './MessageComponentInteraction';
import { FastifyReply } from 'fastify';

export class SelectMenuInteraction extends MessageComponentInteraction {
    values: string[] | APIUser[] | APIChannel[] | APIRole[];
    constructor(data: APIMessageComponentSelectMenuInteraction, _reply: FastifyReply) {
        super(data, _reply);
        this.values = data.data.values;
    }
}
