const Websocket = require('ws');

class WebsocketManager {
    constructor(client) {
        this.client = client;
        this.ws = null;
    }

    connect() {
        if (this.ws) this.ws.removeAllListeners();
        try {
            this.ws = new Websocket('https://listen.moe/api/v2/socket');
        } catch (error) {
            setTimeout(this.connect.bind(this), 5000);
        }

        this.ws.on('message', this.onMessage.bind(this));
        this.ws.on('close', this.onClose.bind(this));
        this.ws.on('error', console.log(error));
    }

    onMessage(data) {
        try {
            if (!data) return;
            const parsed = JSON.parse(data);
            this.client.radioInfo = {
                songName: parsed.song_name,
                artistName: parsed.artist_name,
                animeName: parsed.anime_name,
                listeners: parsed.listeners,
                requestedBy: parsed.requested_by
            };
        } catch (error) {
            this.client.logger.error(error);
        }
    }

    onClose() {
        setTimeout(this.connect.bind(this), 5000);
    }
}

module.exports = WebsocketManager;