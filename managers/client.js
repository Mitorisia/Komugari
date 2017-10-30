const { CommandoClient } = require('discord.js-commando');
const { WebhookClient } = require('discord.js');
const Logger = require('../logger/Logger');
const WebsocketManager = require('../websocket/WebsocketManager');
const VoiceManager = require('../voice/VoiceManager');
const https = require('https');
const { version } = require('../../package.json');

if (process.env.NODE_ENV === 'production') {
	var Database = require('../data/psql/PostgreSQL');
	var Redis = require('../data/redis/Redis');
} else {
	var Database = require('../data/sqlite/SQLite'); // eslint-disable-line no-redeclare
}

class ListenClient extends CommandoClient {
	constructor(options) {
		super(options);
		this.radioInfo = {};
		this.database = Database ? Database.db : null;
		this.redis = Redis ? Redis.db : null;
		if (options.webhookID && options.webhookToken) {
			this.webhook = new WebhookClient(
				options.webhookID,
				options.webhookToken,
				{ disableEveryone: true }
			);
		}
		this.logger = new Logger();
		this.websocketManager = new WebsocketManager(this);
		this.voiceManager = null;

		/* Database.start(); */
		getStream()
			.then(res => {
				const broadcast = this.createVoiceBroadcast();
				broadcast.playStream(res)
					.on('error', this.logger.error);
				for (const connection of client.voiceConnections.values()) {
					connection.playBroadcast(broadcast);
				}
			})
			.catch(err => {
				this.logger.error(err);
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
		headers: { 'User-Agent': `Listen.moe Official Discord Bot v${version} (https://github.com/LISTEN-moe/discord-bot)` }
	};
	return new Promise((resolve, reject) => {
		https.get(options, res => resolve(res))
			.on('error', err => {
				console.error(err); // eslint-disable-line no-console
				return reject(new Error('error in stream'));
			});
	});
}

module.exports = ListenClient;
