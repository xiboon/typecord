import { FastifyReply } from 'fastify';
import { StringSelectMenuInteraction } from './StringSelectMenuInteraction.js';
import {
    APIInteractionDataResolvedChannel,
    APIMessageChannelSelectInteractionData
} from 'discord-api-types/v10';
import { APIAutofillSelectMenuInteraction } from './UserSelectMenuInteraction.js';

export class ChannelSelectMenuInteraction extends StringSelectMenuInteraction {
    values: APIInteractionDataResolvedChannel[];
    constructor(
        data: APIAutofillSelectMenuInteraction<APIMessageChannelSelectInteractionData>,
        reply: FastifyReply
    ) {
        super(data, reply);
        this.values = data.data.values.map(value => data.data.resolved.channels[value]);
    }
}
