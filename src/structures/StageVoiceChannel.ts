import { APIGuildStageVoiceChannel, APIOverwrite } from 'discord-api-types/v10';

export class StageVoiceChannel {
    guildId?: string;
    position: number;
    permissionOverwrites?: APIOverwrite[];
    parentId?: string | null;
    constructor(data: APIGuildStageVoiceChannel) {
        this.guildId = data.guild_id;
        this.position = data.position;
        this.permissionOverwrites = data.permission_overwrites;
        this.parentId = data.parent_id;
    }
}
