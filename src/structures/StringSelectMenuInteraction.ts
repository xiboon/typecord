import {
    APIInteractionDataResolvedChannel,
    APIMessageComponentSelectMenuInteraction,
    APIRole,
    APIUser
} from 'discord-api-types/v10';
import { MessageComponentInteraction } from './MessageComponentInteraction.js';
import { FastifyReply } from 'fastify';

export class StringSelectMenuInteraction extends MessageComponentInteraction {
    values:
        | string[]
        | APIUser[]
        | APIInteractionDataResolvedChannel[]
        | APIRole[]
        | (APIRole | APIUser)[];
    constructor(data: APIMessageComponentSelectMenuInteraction, _reply: FastifyReply) {
        super(data, _reply);
        this.values = data.data.values;
    }
}
