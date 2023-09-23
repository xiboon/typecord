import { FastifyReply } from 'fastify';
import { StringSelectMenuInteraction } from './StringSelectMenuInteraction.js';
import {
    APIMessageMentionableSelectInteractionData,
    APIRole,
    APIUser
} from 'discord-api-types/v10';
import { APIAutofillSelectMenuInteraction } from './UserSelectMenuInteraction.js';

export class MentionableSelectMenuInteraction extends StringSelectMenuInteraction {
    values: (APIRole | APIUser)[];
    constructor(
        data: APIAutofillSelectMenuInteraction<APIMessageMentionableSelectInteractionData>,
        reply: FastifyReply
    ) {
        super(data, reply);
        this.values = data.data.values.map(
            value => data.data.resolved.roles[value] || data.data.resolved.users[value]
        );
    }
}
