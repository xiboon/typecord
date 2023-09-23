import { FastifyReply } from 'fastify';
import { StringSelectMenuInteraction } from './StringSelectMenuInteraction.js';
import { APIMessageRoleSelectInteractionData, APIRole } from 'discord-api-types/v10';
import { APIAutofillSelectMenuInteraction } from './UserSelectMenuInteraction.js';

export class RoleSelectMenuInteraction extends StringSelectMenuInteraction {
    values: APIRole[];
    constructor(
        data: APIAutofillSelectMenuInteraction<APIMessageRoleSelectInteractionData>,
        reply: FastifyReply
    ) {
        super(data, reply);
        this.values = data.data.values.map(value => data.data.resolved.roles[value]);
    }
}
