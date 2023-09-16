import {
    APIApplicationCommandInteraction,
    ApplicationCommandType
} from 'discord-api-types/v10';
import { SlashCommandInteraction } from '../structures/SlashCommandInteraction.js';
import { CommandInteraction } from '../structures/CommandInteraction.js';

export function commandType(data: APIApplicationCommandInteraction) {
    switch (data.data.type) {
        case ApplicationCommandType.ChatInput:
            // @ts-expect-error
            return new SlashCommandInteraction(data);
        default:
            // @ts-expect-error
            return new CommandInteraction(data);
    }
}
