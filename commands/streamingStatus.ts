import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Changes the bots status to Streaming',

    slash: true,
    testOnly: false,
    ownerOnly: true,

    callback: ({ client }) => {
            client.user?.setPresence({
                status: 'online',
                activities: [
                    {
                        name: "OJ IS STREAMING GO JOIN",
                        type: "STREAMING",
                        url: `https://twitch.tv/ojohyay`
                    }
                ]
            })

        return 'Status Updated'
    },
} as ICommand