import { ICommand } from "wokcommands";
import DJS from 'discord.js'
import quotesSchema from "../models/quotes-schema";

export default {
    category: 'Configuration',
    description: 'Sets the channel for the Quote command.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    expectedArgs: '<channel>',

    slash: 'both',
    testOnly: false,

    options: [
        {
            name: 'channel',
            description: 'Quote Channel',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        },
    ],

    callback: async({ guild, message, interaction, args }) => {
        if ( !guild ){
            return 'Please enter this command within a server'
        }

        const target = message ? message.mentions.channels.first() : interaction.options.getChannel('channel')

        if(!target || target.type !== 'GUILD_TEXT'){
            return 'Please tag a text channel'
        }

        await quotesSchema.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            channelId: target.id,
        }, {
            upsert: true,
        })

        return 'Quotes Channel Set!'
    },
} as ICommand