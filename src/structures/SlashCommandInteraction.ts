import { APIChatInputApplicationCommandInteraction } from 'discord-api-types/v10';
import { CommandInteraction } from './CommandInteraction.js';
import { SlashCommandOptions } from './SlashCommandOptions.js';

export class SlashCommandInteraction extends CommandInteraction {
    options: SlashCommandOptions;
    constructor(data: APIChatInputApplicationCommandInteraction) {
        // @ts-expect-error
        super(data);
        if (data.data.options && data.data.resolved)
            this.options = new SlashCommandOptions(data.data.options, data.data.resolved);
    }
}
