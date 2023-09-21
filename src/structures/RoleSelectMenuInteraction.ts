import { FastifyReply } from 'fastify';
import { SelectMenuInteraction } from './SelectMenuInteraction';
import { APIMessageRoleSelectInteractionData, APIRole } from 'discord-api-types/v10';
import { APIAutofillSelectMenuInteraction } from './UserSelectMenuInteraction';

export class RoleSelectMenuInteraction extends SelectMenuInteraction {
    values: APIRole[];
    constructor(
        data: APIAutofillSelectMenuInteraction<APIMessageRoleSelectInteractionData>,
        reply: FastifyReply
    ) {
        super(data, reply);
        this.values = data.data.values.map(value => data.data.resolved.roles[value]);
    }
}
