import {
    APIModalSubmitInteraction,
    InteractionResponseType
} from 'discord-api-types/v10';
import { Interaction } from './Interaction.js';
import { FastifyReply } from 'fastify';
import { ModalComponent } from './ModalComponent.js';
import {
    InteractionReplyOptions,
    RawReplyOptions
} from '../util/InteractionReplyOptions.js';

export class ModalInteraction extends Interaction {
    _reply: FastifyReply;
    customId: string;
    components: Map<string, ModalComponent>;
    constructor(interaction: APIModalSubmitInteraction, reply: FastifyReply) {
        super(interaction);
        this._reply = reply;
        this.customId = interaction.data.custom_id;
        this.components = new Map();
        interaction.data.components.forEach(component =>
            component.components.forEach(c => {
                this.components.set(c.custom_id, new ModalComponent(c));
            })
        );
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
            type: InteractionResponseType.DeferredChannelMessageWithSource
        });
    }
}
