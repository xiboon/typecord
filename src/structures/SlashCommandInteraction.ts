import {
    APIChatInputApplicationCommandInteraction,
    APIModalInteractionResponseCallbackData,
    InteractionResponseType
} from 'discord-api-types/v10';
import { CommandInteraction } from './CommandInteraction.js';
import { SlashCommandOptions } from './SlashCommandOptions.js';
import { FastifyReply } from 'fastify';
import {
    InteractionReplyOptions,
    RawReplyOptions
} from '../util/InteractionReplyOptions.js';

export class SlashCommandInteraction extends CommandInteraction {
    options: SlashCommandOptions;
    constructor(data: APIChatInputApplicationCommandInteraction, reply: FastifyReply) {
        // @ts-expect-error
        super(data, reply);
        if (data.data.options && data.data.resolved)
            this.options = new SlashCommandOptions(data.data.options, data.data.resolved);
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
    showModal(modal: APIModalInteractionResponseCallbackData) {
        this._reply.send({
            type: InteractionResponseType.Modal,
            data: modal
        });
    }
}
