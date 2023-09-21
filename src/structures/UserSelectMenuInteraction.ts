import { FastifyReply } from 'fastify';
import { SelectMenuInteraction } from './SelectMenuInteraction';
import {
    APIMessageChannelSelectInteractionData,
    APIMessageComponentSelectMenuInteraction,
    APIMessageRoleSelectInteractionData,
    APIMessageUserSelectInteractionData,
    APIUser
} from 'discord-api-types/v10';
export interface APIAutofillSelectMenuInteraction<
    T extends
        | APIMessageUserSelectInteractionData
        | APIMessageChannelSelectInteractionData
        | APIMessageRoleSelectInteractionData
> extends APIMessageComponentSelectMenuInteraction {
    data: T;
}
export class UserSelectMenuInteraction extends SelectMenuInteraction {
    values: APIUser[];
    constructor(
        data: APIAutofillSelectMenuInteraction<APIMessageUserSelectInteractionData>,
        reply: FastifyReply
    ) {
        super(data, reply);
        this.values = data.data.values.map(value => data.data.resolved.users[value]);
    }
}
