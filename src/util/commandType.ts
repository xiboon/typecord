import {
    APIApplicationCommandInteraction,
    ApplicationCommandType
} from 'discord-api-types/v10';
import { SlashCommandInteraction } from '../structures/SlashCommandInteraction.js';
import { CommandInteraction } from '../structures/CommandInteraction.js';
import { FastifyReply } from 'fastify';

export function commandType(data: APIApplicationCommandInteraction, reply: FastifyReply) {
    switch (data.data.type) {
        case ApplicationCommandType.ChatInput:
            // @ts-expect-error
            return new SlashCommandInteraction(data, reply);
        default:
            // @ts-expect-error
            return new CommandInteraction(data, reply);
    }
}
