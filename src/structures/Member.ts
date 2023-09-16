import { Guild, User } from '../index.js';

import { APIGuildMember } from 'discord-api-types/v10';

/**
 * Member class
 *
 * @param {Client} client - Client instance
 * @param {APIGuildMember} data - Member data
 * @class
 * @property {Guild} guild - Guild the member belongs to
 * @property {Role[]} roles - Array of roles the member has
 * @property {User} user - User instance
 * @property {string} nick - Guild nickname
 * @property {string} joinedAt - when did the member join the guild
 * @property {string[]} roles - array of role IDs
 * @property {string} premiumSince - Since when is the member boosting the guild
 * @property {string} deaf - Is the member deafened
 * @property {string} mute - Is the member muted
 * @property {bigint} id - Member ID
 * @property {number} communicationDisabledUntil - When the member's timeout will expire
 * @property {boolean} pending - Is the member pending verification
 */
export class Member {
    mute: boolean;
    deaf: boolean;
    premiumSince?: string | null;
    joinedAt: string;
    nick?: string | null;
    user: User;
    raw?: APIGuildMember;
    id: string;
    guildId: string;
    guild?: Guild;
    communicationDisabledUntil: number;
    pending: boolean;
    // roles: MemberRoleManager;
    avatar?: string | null;
    constructor(data: APIGuildMember, guild: Guild) {
        this.guild = guild;
        if (data.user) this.user = new User(data.user);
        this.nick = data.nick;
        this.avatar = data.avatar;
        this.joinedAt = data.joined_at;
        this.premiumSince = data.premium_since;
        this.deaf = data.deaf;
        this.mute = data.mute;
        if (data.communication_disabled_until)
            this.communicationDisabledUntil =
                new Date(data.communication_disabled_until).getTime() / 1000;
        this.pending = data.pending || false;
        this.id = this.user.id;
        this.guildId = guild?.id;
        // this.roles = new MemberRoleManager(this, data.roles.map(BigInt));
    }
}
