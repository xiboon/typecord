import { APIThreadChannel, APIThreadMetadata } from 'discord-api-types/v10';
import { TextChannel } from '../index.js';

/**
 * A thread channel class.
 *
 * @param {Client} client - Client instance
 * @param {any} data - API thread channel data
 * @extends {TextChannel}
 * @class
 * @property {number} memberCount - Count of thread members, stops at 50
 * @property {number} messageCount - Count of messages in thread, stops at 50
 * @property {APIThreadChannel} threadMetadata - Metadata
 */
export class ThreadChannel extends TextChannel {
    memberCount?: number;
    messageCount?: number;
    threadMetadata?: APIThreadMetadata;
    constructor(data: APIThreadChannel) {
        // @ts-expect-error
        super(data);
        this.messageCount = data.message_count;
        this.memberCount = data.member_count;
        this.threadMetadata = data.thread_metadata;
    }
}
