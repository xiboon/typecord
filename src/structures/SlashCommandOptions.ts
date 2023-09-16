import { Member, Role, User, Attachment, Guild } from '../index.js';
import { channelType } from '../util/channelType.js';
import {
    APIInteractionDataResolved,
    ApplicationCommandOptionType
} from 'discord-api-types/v10';

/**
 * A class for parsing interaction options.
 * @param {Client} client - Client instance
 * @param {any[]} options - Options data
 * @param {Object} resolved - Resolved options data
 * @param {Guild} guild - Guild instance, if present.
 * @class
 * @property {Object} options - Parsed options data
 * @property {Object} resolved - Resolved options data
 */
export class SlashCommandOptions {
    options: Map<string, any>;
    guild?: Guild;
    subcommandGroup?: string;
    subcommand?: string;
    resolved: APIInteractionDataResolved;
    constructor(options: any[], resolved: APIInteractionDataResolved, guild?: Guild) {
        this.options = new Map();
        this.guild = guild;
        this.resolved = resolved;
        if (
            options &&
            options[0]?.type === ApplicationCommandOptionType.SubcommandGroup
        ) {
            this.subcommandGroup = options[0].name;
            [{ options }] = options;
        }
        if (options && options[0]?.type === ApplicationCommandOptionType.Subcommand) {
            this.subcommand = options[0].name;
            [{ options }] = options;
        }
        options?.forEach(option => {
            this.options.set(option.name, option);
        });
    }

    /**
     * Get the value of a string option
     * @param {string} name - Name of the option to get
     * @returns {string}
     */
    getString(name: string): string | undefined {
        const option = this.options.get(name);
        if (!option) return;
        if (option.type !== ApplicationCommandOptionType.String)
            throw new TypeError(`Option '${name}' is not a string`);
        return option.value;
    }

    /**
     * Get the value of a number option
     * @param {string} name - Name of the option to get
     * @returns {number}
     */
    getNumber(name: string): number | undefined {
        const option = this.options.get(name);
        if (!option) return;
        if (option.type !== ApplicationCommandOptionType.Number)
            throw new TypeError(`Option '${name}' is not a number`);
        return option.value;
    }

    /**
     * Get the value of a boolean option
     * @param name - Name of the option to get
     * @returns {boolean}
     */
    getBoolean(name: string): boolean | undefined {
        const option = this.options.get(name);
        if (!option) return;
        if (option.type !== ApplicationCommandOptionType.Boolean)
            throw new TypeError(`Option '${name}' is not a boolean`);
        return option.value;
    }

    /**
     * Get the value of a user option
     * @param name - Name of the option to get
     * @returns {User}
     */
    getUser(name: string): User | undefined {
        const option = this.options.get(name);
        if (!option) return;
        if (!this.resolved?.users) return;
        if (
            option.type !== ApplicationCommandOptionType.User ||
            option.type !== ApplicationCommandOptionType.Mentionable
        )
            throw new TypeError(`Option '${name}' is not a user`);
        return new User(this.resolved?.users[option.value]);
    }

    /**
     * Get the value of a user option as a member
     * @param {string} name - Name of the option to get
     * @returns {Member}
     */
    getMember(name: string): Member | undefined {
        const option = this.options.get(name);
        if (!option) return;
        if (!this.resolved?.members) return;
        if (
            option.type !== ApplicationCommandOptionType.User &&
            option.type !== ApplicationCommandOptionType.Mentionable
        )
            throw new TypeError(`Option '${name}' is not a user`);
        if (!this.guild) return;
        // @ts-expect-error
        return new Member(this.resolved.members[option.value], this.guild);
    }

    /**
     * Get the value of a channel option
     * @param name - Name of the option to get
     * @returns {Channel}
     */
    getChannel(name: string) {
        const option = this.options.get(name);
        if (!option) return null;
        if (!this.resolved?.channels) return;
        if (option.type !== ApplicationCommandOptionType.Channel)
            throw new TypeError(`Option '${name}' is not a channel`);
        const channelData = this.resolved.channels[option.value];
        // @ts-expect-error
        const channel = channelType(channelData);
        return channel;
    }

    /**
     * Get the value of a role option
     * @param name - Name of the option to get
     * @returns {Role}
     */
    getRole(name: string): Role | undefined {
        const option = this.options.get(name);
        if (!this.resolved?.roles) return;
        if (!option) return;
        if (
            option.type !== ApplicationCommandOptionType.Role &&
            option.type !== ApplicationCommandOptionType.Mentionable
        )
            throw new TypeError(`Option '${name}' is not a role`);
        return new Role(this.resolved.roles[option.value]);
    }

    /**
     * Get the value of a attachment option
     * @param name - Name of the option to get
     * @returns {Attachment}
     */
    getAttachment(name: string): Attachment | undefined {
        const option = this.options.get(name);
        if (!option) return;
        if (!this.resolved?.attachments) return;
        if (option.type !== ApplicationCommandOptionType.Attachment)
            throw new TypeError(`Option '${name}' is not an attachment`);
        return new Attachment(this.resolved.attachments[option.value]);
    }

    /**
     * Get the value of a integer option
     * @param name - Name of the option to get
     * @returns {number}
     */
    getInteger(name: string): number | undefined {
        const option = this.options.get(name);
        if (!option) return;
        if (option.type !== ApplicationCommandOptionType.Integer)
            throw new TypeError(`Option '${name}' is not an integer`);
        return option.value;
    }
}
