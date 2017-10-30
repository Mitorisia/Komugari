class VoiceManager {
	constructor(client, broadcast) {
		this.client = client;
		this.broadcast = broadcast;
	}

	async joinVoice(channel) {
		try {
			const connection = await channel.join();
			connection.playBroadcast(this.broadcast)
				.on('error', err => {
					this.client.logger.error(err);
					connection.disconnect();
				});
		} catch (error) {
			this.client.logger.error(error);
		}
	}

	leaveVoice(channel) {
		channel.disconnect();
	}
}

module.exports = VoiceManager;
