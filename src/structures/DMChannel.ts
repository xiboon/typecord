import { APIDMChannel, APIGroupDMChannel, ChannelType } from 'discord-api-types/v10';
import { User } from '../index.js';
import { Channel } from './Channel.js';

/**
 * DM Channel class
 *
 * @param {Client} client - Client instance
 * @param {APIChannel} data - Channel data
 * @class
 * @property {bigint} lastMessageId - ID of last message
 * @property {bigint} applicationId - ID of application (exists only if an application created the DM)
 * @property {bigint} ownerId - ID of DM creator
 * @property {User[]} recipients - Array of recipient users
 * @property {string} icon - DM icon hash
 * @property {string} lastPinTimestamp - Timestamp of last pinned message
 * @extends {Channel}
 */
export class DMChannel extends Channel {
    lastMessageId?: string | null;
    recipients?: User[];
    icon?: string | null;
    ownerId?: string;
    applicationId?: string;
    lastPinTimestamp?: string | null;
    constructor(data: APIDMChannel | APIGroupDMChannel) {
        super(data);
        this.lastPinTimestamp = data.last_pin_timestamp;
        this.lastMessageId = data.last_message_id;
        if (data.type === ChannelType.GroupDM) {
            this.icon = data.icon;
            this.applicationId = data.application_id;
            this.ownerId = data.owner_id;
            this.recipients = data.recipients?.map(user => new User(user));
        }
    }
}
