import { APIRole } from 'discord-api-types/v10';
import { Permissions } from '../util/Permissions.js';

/**
 * Role class
 *
 * @param {Client} client - Client instance
 * @param {APIRole} data - Role data
 * @class
 * @property {string} id - Role ID
 * @property {string} name - Role name
 * @property {string} color - Role color
 * @property {string} hoist - Is the role hoisted
 * @property {string} position - Role position
 * @property {string} managed - Is the role managed
 * @property {string} mentionable - Is the role mentionable
 * @property {string} [raw] - Raw role data
 * @property {string} [integrationId] - Integration ID
 * @property {Permissions} permissions - Permissions
 * @property {string} [botId] - Bot ID
 */
export class Role {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: Permissions;
    managed: boolean;
    mentionable: boolean;
    botId?: string;
    integrationId?: string;
    raw?: APIRole;
    constructor(data: APIRole) {
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
        this.hoist = data.hoist;
        this.position = data.position;
        this.permissions = new Permissions(data.permissions);
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        this.botId = data.tags?.bot_id;
        this.integrationId = data.tags?.integration_id;
    }
}
