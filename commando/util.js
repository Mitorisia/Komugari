function disambiguation(items, label, property = 'name') {
    const itemList = items.map(item => `"${(property ? item[property] : item).replace(/ /g, '\xa0')}"`).join(',   ');
    return `Multiple ${label} found, please be more specific!`;
}

function paginate(items, page = 1, pageLength = 10) {
    const maxPage = Math.ceil(items.length / pageLength);
    if (page < 1) page = 1;
    if (page > maxPage) page = maxPage;
    let startIndex = (page - 1) * pageLength;
    return {
        items: items.length > pageLength ? items.slice(startIndex, startIndex + pageLength) : items,
        page,
        maxPage,
        pageLength
    };
}

const permissions = {
    ADMINISTRATOR: 'Administrator',
    VIEW_AUDIT_LOG: 'View audit log',
    MANAGE_GUILD: 'Manage server',
    MANAGE_ROLES: 'Manage roles',
    MANAGE_CHANNELS: 'Manage channels',
    KICK_MEMBERS: 'Kick members',
    BAN_MEMBERS: 'Ban members',
    CREATE_INSTANT_INVITE: 'Create instant invite',
    CHANGE_NICKNAME: 'Change nickname',
    MANAGE_NICKNAMES: 'Manage nicknames',
    MANAGE_EMOJIS: 'Manage emojis',
    MANAGE_WEBHOOKS: 'Manage webhooks',
    VIEW_CHANNEL: 'Read text channels and see voice channels',
    SEND_MESSAGES: 'Send messages',
    SEND_TTS_MESSAGES: 'Send TTS messages',
    MANAGE_MESSAGES: 'Manage messages',
    EMBED_LINKS: 'Embed links',
    ATTACH_FILES: 'Attach files',
    READ_MESSAGE_HISTORY: 'Read message history',
    MENTION_EVERYONE: 'Mention everyone',
    USE_EXTERNAL_EMOJIS: 'Use external emojis',
    ADD_REACTIONS: 'Add reactions',
    CONNECT: 'Connect',
    SPEAK: 'Speak',
    MUTE_MEMBERS: 'Mute members',
    DEAFEN_MEMBERS: 'Deafen members',
    MOVE_MEMBERS: 'Move members',
    USE_VAD: 'Use voice activity'
};


function fromNow(date) {
    if (!date) {
        return false;
    }

    const ms = new Date().getTime() - date.getTime();

    if (ms >= 86400000) {
        const days = Math.floor(ms / 86400000);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }

    return `${humanizeDuration(ms, 1, false, false)} ago`;
}

function humanizeDuration(ms, maxUnits, short = false, fraction = true) {
    const round = ms > 0 ? Math.floor : Math.ceil
    const parsed = [{
            int: round(ms / 604800000),
            sin: 'week',
            plu: 'weeks',
            sho: 'w'
        },
        {
            int: round(ms / 86400000) % 7,
            sin: 'day',
            plu: 'days',
            sho: 'd'
        },
        {
            int: round(ms / 3600000) % 24,
            sin: 'hour',
            plu: 'hours',
            sho: 'h'
        },
        {
            int: round(ms / 60000) % 60,
            sin: 'minute',
            plu: 'minutes',
            sho: 'm'
        },
        {
            int: (round(ms / 1000) % 60) + (round(ms) % 1000 / 1000),
            sin: 'second',
            plu: 'seconds',
            sho: 's'
        }
    ]

    const result = []
    for (let i = 0; i < parsed.length; i++) {
        if (!result.length && parsed[i].int === 0) {
            continue
        }

        if (result.length >= maxUnits) {
            break
        }

        let int = parsed[i].int
        if (!result.length && fraction && i === parsed.length - 1) {
            int = int.toFixed(1)
        } else {
            int = int.toFixed(0)
        }

        result.push(`${int}${short ? parsed[i].sho : ' ' + (parseFloat(int) !== 1 ? parsed[i].plu : parsed[i].sin)}`)
    }

    return result.map((res, i) => {
        if (!short) {
            if (i === result.length - 2) {
                return res + ' and'
            } else if (i !== result.length - 1) {
                return res + ','
            }
        }
        return res
    }).join(' ')
}

module.exports = {
    disambiguation,
    paginate,
    permissions,
    fromNow,
    humanizeDuration
};