import {
    APIGuild,
    APIGuildWelcomeScreen,
    APISticker,
    GuildDefaultMessageNotifications,
    GuildExplicitContentFilter,
    GuildFeature,
    GuildMFALevel,
    GuildNSFWLevel,
    GuildPremiumTier,
    GuildVerificationLevel
} from 'discord-api-types/v10';
import { Permissions } from '../util/Permissions.js';
import { Emoji } from './Emoji.js';
import { Role } from './Role.js';

/**
 * Description
 * @property {string} id
 * @property {string} name
 * @property {string | null} icon - Icon hash of the guild
 * @property {string} ownerId - ID of the guild's owner
 * @property {Permissions}  permissions
 * @property {GuildFeature[]} features - Array of guild features enabled.
 * @property {string | null} splash - Splash hash of the guild
 * @property {string | null} discoverySplash - Discovery splash hash of the guild
 * @property {boolean | undefined} owner - Whether the user is the owner of the guild
 * @property {string | null} afkChannelId -
 * @property {number} afkTimeout -
 * @property {boolean | undefined} widgetEnabled -
 * @property {string | null | undefined} widgetChannelId -
 * @property {any} verificationLevel -
 * @property {any} defaultMessageNotifications -
 * @property {any} explicitContentFilter -
 * @property {Role[]} roles -
 * @property {Emoji[]} emojis -
 * @property {GuildMFALevel} mfaLevel -
 * @property {string | null} applicationId -
 * @property {string | null} systemChannelId -
 * @property {any} systemChannelFlags -
 * @property {string | null} rulesChannelId -
 * @property {number | undefined} maxMembers -
 * @property {number | null | undefined} maxPresences -
 * @property {string | null} vanityUrlCode -
 * @property {string | null} description -
 * @property {string | null} banner -
 * @property {GuildPremiumTier} premiumTier -
 * @property {number | undefined} premiumSubscriptionCount -
 * @property {string} preferredLocale -
 * @property {string | null} publicUpdatesChannelId -
 * @property {number | undefined} maxVideoChannelUsers -
 * @property {number | undefined} approximateMemberCount -
 * @property {number | undefined} approximatePresenceCount -
 * @property {any} welcomeScreen -
 * @property {GuildNSFWLevel} nsfwLevel -
 * @property {any} stickers -
 **/
export class Guild {
    id: string;
    name: string;
    icon: string | null;
    permissions?: Permissions;
    features: GuildFeature[];
    splash: string | null;
    discoverySplash: string | null;
    owner: boolean | undefined;
    ownerId: string;
    afkChannelId: string | null;
    afkTimeout: number;
    widgetEnabled: boolean | undefined;
    widgetChannelId: string | null | undefined;
    verificationLevel: GuildVerificationLevel;
    defaultMessageNotifications: GuildDefaultMessageNotifications;
    explicitContentFilter: GuildExplicitContentFilter;
    roles: Role[];
    emojis: Emoji[];
    mfaLevel: GuildMFALevel;
    applicationId: string | null;
    systemChannelId: string | null;
    systemChannelFlags: any;
    rulesChannelId: string | null;
    maxMembers: number | undefined;
    maxPresences: number | null | undefined;
    vanityUrlCode: string | null;
    description: string | null;
    banner: string | null;
    premiumTier: GuildPremiumTier;
    premiumSubscriptionCount: number | undefined;
    preferredLocale: string;
    publicUpdatesChannelId: string | null;
    maxVideoChannelUsers: number | undefined;
    approximateMemberCount: number | undefined;
    approximatePresenceCount: number | undefined;
    welcomeScreen?: APIGuildWelcomeScreen;
    nsfwLevel: GuildNSFWLevel;
    stickers: APISticker[];
    constructor(data: APIGuild) {
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.ownerId = data.owner_id;
        this.features = data.features;
        if (data.permissions) this.permissions = new Permissions(data.permissions);
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.owner = data.owner;
        this.afkChannelId = data.afk_channel_id;
        this.afkTimeout = data.afk_timeout;
        this.widgetEnabled = data.widget_enabled;
        this.widgetChannelId = data.widget_channel_id;
        this.verificationLevel = data.verification_level;
        this.defaultMessageNotifications = data.default_message_notifications;
        this.explicitContentFilter = data.explicit_content_filter;
        // TODO: make it map to Role and Emoji structures once done
        this.roles = data.roles.map(e => new Role(e));
        this.emojis = data.emojis.map(e => new Emoji(e));
        this.features = data.features;
        this.mfaLevel = data.mfa_level;
        this.applicationId = data.application_id;
        this.systemChannelId = data.system_channel_id;
        this.systemChannelFlags = data.system_channel_flags;
        this.rulesChannelId = data.rules_channel_id;
        this.maxMembers = data.max_members;
        this.maxPresences = data.max_presences;
        this.vanityUrlCode = data.vanity_url_code;
        this.description = data.description;
        this.banner = data.banner;
        this.premiumTier = data.premium_tier;
        this.premiumSubscriptionCount = data.premium_subscription_count;
        this.preferredLocale = data.preferred_locale;
        this.publicUpdatesChannelId = data.public_updates_channel_id;
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.approximateMemberCount = data.approximate_member_count;
        this.approximatePresenceCount = data.approximate_presence_count;
        this.welcomeScreen = data.welcome_screen;
        this.nsfwLevel = data.nsfw_level;
        this.stickers = data.stickers;
    }
}
