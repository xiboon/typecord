import {
    APIAllowedMentions,
    APIEmbed,
    AllowedMentionsTypes
} from 'discord-api-types/v10';

export interface RawReplyOptions {
    content?: string;
    embeds?: APIEmbed[];
    allowedMentions?: RawAllowedMentions;
    ephemeral?: boolean;
}
export interface RawAllowedMentions {
    parse?: AllowedMentionsTypes[];
    roles?: string[];
    users?: string[];
    repliedUser?: boolean;
}
export class AllowedMentions {
    parse: AllowedMentionsTypes[];
    roles: string[];
    users: string[];
    replied_user: boolean;
    constructor(data: RawAllowedMentions) {
        this.parse = data.parse;
        this.roles = data.roles;
        this.users = data.users;
        this.replied_user = data.repliedUser;
    }
}
export class InteractionReplyOptions {
    content: string;
    embeds: APIEmbed[];
    allowed_mentions: APIAllowedMentions;
    constructor(data: RawReplyOptions) {
        this.content = data.content;
        this.embeds = data.embeds;
        this.allowed_mentions = new AllowedMentions(data.allowedMentions);
    }
}
