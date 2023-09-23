import { APIMessageComponentInteraction, ComponentType } from 'discord-api-types/v10';
import { ButtonInteraction } from '../structures/ButtonInteraction.js';
import { FastifyReply } from 'fastify';
import { StringSelectMenuInteraction } from '../structures/StringSelectMenuInteraction.js';
import { ChannelSelectMenuInteraction } from '../structures/ChannelSelectMenuInteraction.js';
import { RoleSelectMenuInteraction } from '../structures/RoleSelectMenuInteraction.js';
import { UserSelectMenuInteraction } from '../structures/UserSelectMenuInteraction.js';
import { MentionableSelectMenuInteraction } from '../structures/MentionableSelectMenuInteraction.js';

export function componentType(
    interaction: APIMessageComponentInteraction,
    _reply: FastifyReply
) {
    switch (interaction.data.component_type) {
        case ComponentType.Button:
            return new ButtonInteraction(interaction, _reply);
        case ComponentType.StringSelect:
            // @ts-expect-error
            return new StringSelectMenuInteraction(interaction, _reply);
        case ComponentType.ChannelSelect:
            // @ts-expect-error
            return new ChannelSelectMenuInteraction(interaction, _reply);
        case ComponentType.RoleSelect:
            // @ts-expect-error
            return new RoleSelectMenuInteraction(interaction, _reply);
        case ComponentType.UserSelect:
            // @ts-expect-error
            return new UserSelectMenuInteraction(interaction, _reply);
        case ComponentType.MentionableSelect:
            // @ts-expect-error
            return new MentionableSelectMenuInteraction(interaction, _reply);
    }
}
