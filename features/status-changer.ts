import { randomInt } from "crypto";
import { Client } from "discord.js";

export default (client: Client) => {
    const statusOptions = [
        'Beep Boop',
        'OJ is the BEST',
        `I'm self sufficient`,
        `I'm the hottest bot`,
        'Ping Pong',
        'YOOO'
    ]
    let counter = randomInt(statusOptions.length)

    const updateStatus = () => {
        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    name: statusOptions[counter],
                    type: "PLAYING",
                    url: `https://twitch.tv/ojohyay`
                }
            ]
        })

        counter = randomInt(statusOptions.length)

        setTimeout(updateStatus, 1000*60*60*24)
    }
    updateStatus()
}


export const config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer',
}