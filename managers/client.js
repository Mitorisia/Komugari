const { CommandoClient } = require('../commando');

const WebsocketManager = require('./websocketManager');
const VoiceManager = require('./VoiceManager');
const https = require('https');


class KomugariClient extends CommandoClient {
    constructor(options) {
        super(options);
        this.radioInfo = {};

        this.websocketManager = new WebsocketManager(this);
        this.voiceManager = null;

        getStream()
            .then(res => {
                const broadcast = this.createVoiceBroadcast();
                broadcast.playStream(res)
                    .on('error', console.log(err));
                for (const connection of client.voiceConnections.values()) {
                    connection.playBroadcast(broadcast);
                }
            })
            .catch(err => {
                console.log(err);
                this.voiceManager.broadcast.destroy();
                setTimeout(getStream(options.stream), 5000);
            });
    }
}

function getStream() {
    const options = {
        hostname: 'listen.moe',
        port: '',
        path: '/stream',
        method: 'GET',
        headers: { 'User-Agent': `Komugari; Discord Bot in Development; Github: https://github.com/Mitorisia/Komugari` }
    };
    return new Promise((resolve, reject) => {
        https.get(options, res => resolve(res))
            .on('error', err => {
                console.error(err); // eslint-disable-line no-console
                return reject(new Error('error in stream'));
            });
    });
}

module.exports = KomugariClient;