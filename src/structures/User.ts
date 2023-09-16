import { APIUser, UserFlags } from 'discord-api-types/v10';

/**
 * User class
 *
 * @param {Client} client - Client instance
 * @param {APIUser} data - User data
 * @class
 * @param {string} id - User ID
 * @param {string} username - User username (username)
 * @param {string} discriminator - User discriminator (1234)
 * @param {string} tag - User tag (username#1234)
 * @param {boolean} bot - Is the user a bot
 * @param {boolean} system - Is the user a system user
 * @param {UserFlags} flags - User flags
 * @param {number} accentColor - User accent color
 * @param {APIUser} [raw] - Raw user data
 */
export class User {
    id: string;
    username: string;
    discriminator: string;
    tag: string;
    bot: boolean;
    system: boolean;
    flags?: UserFlags;
    accentColor?: number | null;
    raw?: APIUser;
    avatar: string | null;
    banner: string | null | undefined;
    constructor(data: APIUser) {
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.tag = `${this.username}#${this.discriminator}`;
        this.avatar = data.avatar;
        this.bot = data.bot || false;
        this.system = data.system || false;
        this.banner = data.banner;
        this.flags = data.public_flags;
        this.accentColor = data.accent_color;
    }
}
