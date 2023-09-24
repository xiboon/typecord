import {
    APIApplicationCommandAutocompleteInteraction,
    APIApplicationCommandOptionChoice,
    ApplicationCommandType,
    InteractionResponseType
} from 'discord-api-types/v10';
import { Interaction } from './Interaction.js';
import { FastifyReply } from 'fastify';
import { SlashCommandOptions } from '../structures/SlashCommandOptions.js';

export class AutocompleteInteraction extends Interaction {
    _reply: FastifyReply;
    commandId: string;
    commandName: string;
    commandType: ApplicationCommandType;
    options: SlashCommandOptions;
    constructor(
        interaction: APIApplicationCommandAutocompleteInteraction,
        reply: FastifyReply
    ) {
        super(interaction);
        this._reply = reply;
        this.commandId = interaction.data.id;
        this.commandName = interaction.data.name;
        this.commandType = interaction.data.type;
        this.options = new SlashCommandOptions(
            interaction.data.options,
            interaction.data.resolved
        );
    }
    reply(suggestions: APIApplicationCommandOptionChoice[]) {
        this._reply.send({
            type: InteractionResponseType.ApplicationCommandAutocompleteResult,
            data: {
                choices: suggestions
            }
        });
    }
}
