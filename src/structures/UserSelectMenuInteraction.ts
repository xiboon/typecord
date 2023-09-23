import { FastifyReply } from 'fastify';
import { StringSelectMenuInteraction } from './StringSelectMenuInteraction.js';
import {
    APIMessageChannelSelectInteractionData,
    APIMessageComponentSelectMenuInteraction,
    APIMessageMentionableSelectInteractionData,
    APIMessageRoleSelectInteractionData,
    APIMessageUserSelectInteractionData,
    APIUser
} from 'discord-api-types/v10';
export interface APIAutofillSelectMenuInteraction<
    T extends
        | APIMessageUserSelectInteractionData
        | APIMessageChannelSelectInteractionData
        | APIMessageRoleSelectInteractionData
        | APIMessageMentionableSelectInteractionData
> extends APIMessageComponentSelectMenuInteraction {
    data: T;
}
export class UserSelectMenuInteraction extends StringSelectMenuInteraction {
    values: APIUser[];
    constructor(
        data: APIAutofillSelectMenuInteraction<APIMessageUserSelectInteractionData>,
        reply: FastifyReply
    ) {
        super(data, reply);
        this.values = data.data.values.map(value => data.data.resolved.users[value]);
    }
}
