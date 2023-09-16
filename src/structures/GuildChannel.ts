import { APIGuildChannel } from 'discord-api-types/v10';
import { Guild } from './Guild';
import { Channel } from './Channel';

/**
 * A guild channel class.
 *
 * @param {Client} client - Client instance
 * @param {any} data - API guild channel data
 * @extends {Channel}
 * @property {Guild} guild - Guild the channel is in
 * @property {bigint} guildId - Guild id
 * @property {number} position - Channel position
 * @property {any[]} permissionOverwrites - Channel permission overwrites
 * @property {string} parentId - Channel parent category
 */
export class GuildChannel extends Channel {
    guildId?: string;
    position: number;
    permissionOverwrites?: any[];
    permissions: string;
    guild: Guild;
    parentId?: string | null;
    constructor(data: APIGuildChannel<any>) {
        super(data);
        this.guildId = data.guild_id;
        this.position = data.position;
        this.permissionOverwrites = data.permission_overwrites;
        this.parentId = data.parent_id;
    }
}
