
exports.fromNow = (date) => {
    if (!date) {
        return false;
      }
    
      const ms = new Date().getTime() - date.getTime();
    
      if (ms >= 86400000) {
        const days = Math.floor(ms / 86400000);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
      }
    
      return `${this.humanizeDuration(ms, 1, false, false)} ago`;
} 

exports.humanizeDuration = (ms, maxUnits, short = false, fraction = true) => {
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