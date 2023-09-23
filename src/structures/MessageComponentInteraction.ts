import {
    APIMessageComponentInteraction,
    APIModalInteractionResponseCallbackData,
    ComponentType,
    InteractionResponseType
} from 'discord-api-types/v10';
import { Interaction } from './Interaction.js';
import {
    RawReplyOptions,
    InteractionReplyOptions
} from '../util/InteractionReplyOptions.js';
import { FastifyReply } from 'fastify';

export class MessageComponentInteraction extends Interaction {
    componentType: ComponentType;
    customId: string;
    _reply: FastifyReply;
    constructor(data: APIMessageComponentInteraction, reply: FastifyReply) {
        super(data);
        this.customId = data.data.custom_id;
        this.componentType = data.data.component_type;
        this._reply = reply;
    }
    reply(data: RawReplyOptions) {
        data = new InteractionReplyOptions(data);
        this._reply.send({
            type: InteractionResponseType.ChannelMessageWithSource,
            data
        });
    }
    deferReply() {
        this._reply.send({
            type: InteractionResponseType.DeferredMessageUpdate
        });
    }

    showModal(modal: APIModalInteractionResponseCallbackData) {
        this._reply.send({
            type: InteractionResponseType.Modal,
            data: modal
        });
    }
    updateMessage(data: RawReplyOptions) {
        data = new InteractionReplyOptions(data);
        this._reply.send({
            type: InteractionResponseType.UpdateMessage,
            data
        });
    }
}
