import { APIChannel, ChannelType } from 'discord-api-types/v10';
import {
    Channel,
    DMChannel,
    StageVoiceChannel,
    TextChannel,
    ThreadChannel,
    VoiceChannel
} from '../index.js';

/**
 * Get the correct channel type. This is used to determine which channel class to call.
 * @param {APIChannel} data The channel to get.
 */
export function channelType(data: APIChannel): Channel {
    let channel;
    switch (data.type) {
        case ChannelType.GuildText:
            channel = new TextChannel(data);
            break;
        case ChannelType.DM:
            channel = new DMChannel(data);
            break;
        case ChannelType.GuildVoice:
            channel = new VoiceChannel(data);
            break;
        case ChannelType.PublicThread:
            channel = new ThreadChannel(data);
            break;
        case ChannelType.PrivateThread:
            channel = new ThreadChannel(data);
            break;
        case ChannelType.AnnouncementThread:
            channel = new ThreadChannel(data);
            break;
        case ChannelType.GuildStageVoice:
            channel = new StageVoiceChannel(data);
            break;
        default:
            channel = new Channel(data);
            break;
    }
    return channel;
}
