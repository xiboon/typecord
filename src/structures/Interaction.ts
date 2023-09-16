import { APIChannel, APIInteraction } from 'discord-api-types/v10';
import { Permissions } from '../util/Permissions.js';
import { User } from './User.js';
export class Interaction {
    id: string;
    applicationId: string;
    type: any;
    data: any;
    guildId?: string;
    token: string;
    version: number;
    channel?: APIChannel | string | null;
    user: any;
    appPermissions: Permissions;
    locale: string;
    constructor(data: APIInteraction) {
        this.id = data.id;
        this.applicationId = data.application_id;
        this.type = data.type;
        this.data = data.data;
        this.guildId = data.guild_id;
        // @ts-expect-error
        this.channel = data.channel;
        if (data.user || data.member?.user)
            this.user = new User(data.user || data.member?.user);
        this.token = data.token;
        this.version = data.version;
        // @ts-expect-error
        this.locale = data.locale;
        if (data.app_permissions)
            this.appPermissions = new Permissions(data.app_permissions);
    }
}
