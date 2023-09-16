import { APIGuildVoiceChannel, APITextChannel, ChannelType } from 'discord-api-types/v10';
import { GuildChannel } from './GuildChannel';

/**
 * A text channel class.
 *
 * @param {Client} client - Client instance
 * @param {any} data - API guild channel data
 * @extends {GuildChannel}
 * @class
 * @property {bigint} lastMessageId - ID of last message
 * @property {number} defaultArchiveDuration - Default thread archive duration
 * @property {string} topic - Channel topic
 * @property {boolean} nsfw - Whether the channel is nsfw
 */
export class TextChannel extends GuildChannel {
    lastMessageId?: string | null;
    defaultArchiveDuration?: number;
    topic?: string | null;
    nsfw?: boolean;
    // messages: MessageManager;
    constructor(data: APITextChannel | APIGuildVoiceChannel) {
        super(data);
        this.nsfw = data.nsfw;
        this.lastMessageId = data.last_message_id;
        if (data.type !== ChannelType.GuildVoice)
            this.defaultArchiveDuration = data.default_auto_archive_duration;
        if (data.type !== ChannelType.GuildVoice) this.topic = data.topic;
        // this.messages = new MessageManager(this.client, this);
    }
}
