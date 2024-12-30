import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Fun',
    description: 'Sends a bonk',
    
    slash: 'both',
    testOnly: false,

    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    guildOnly: true,


    options: [
        {
            description: 'Person to be bonked',
            name: 'user',
            type: 'USER',
            required: true,
        }
    ],

    callback: async({ message, interaction, channel, args, guild }) => {
        if(!guild){
            return 'Please use this command within a server'
        }

        const bonked = message ? message.mentions.users.first() : interaction.options.getUser('user')
        const person = message ? message.member : interaction.user.username
        
        return `${person} bonked ${bonked} BONK!`
    },

    
} as ICommand