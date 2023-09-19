import { FastifyReply } from 'fastify';
import { Interaction } from './Interaction.js';
import {
    APIApplicationCommandInteraction,
    ApplicationCommandType
} from '@discordjs/core';

export class CommandInteraction extends Interaction {
    _reply: FastifyReply;
    name: string;
    commandId: string;
    commandType: ApplicationCommandType;
    resolved: any;
    constructor(data: APIApplicationCommandInteraction, reply?: FastifyReply) {
        // @ts-expect-error
        super(data);
        this._reply = reply;
        this.commandId = data.data.id;
        this.name = data.data.name;
        this.commandType = data.data.type;
        this.resolved = data.data.resolved;
    }
}
