import { Client, Guild, Message, Options, TextChannel, User } from "discord.js";
import { ICommand } from "wokcommands";
import quotesSchema from "../models/quotes-schema";

const quoteData = {} as {
    [key: string]: [TextChannel, string]
}

export default {
    category: 'OJ Stuff',
    description: 'Quotes OJ and sends it to the specified channel',
    testOnly: false,
    slash: 'both',
    
    minArgs: 2,
    expectedArgs: '<name> <quote>',
    
    options: [
        {
            description: 'Person who said quote',
            name: 'user',
            type: 'USER',
            required: true,
        },
        {
            description: 'The quote itself',
            name: 'quote',
            type: 'STRING',
            required: true,
        }
    ],


    callback: async({ message, interaction, args, member, guild }) => {
        if(!guild){
            return 'Please use this command within a server'
        }


        const sayer = message ? message.mentions.users.first() : interaction.options.getUser('user')


        
        args.shift()
        const quote = args.join(' ')
        
        let data = quoteData[guild.id]

        const targetChannel = await quotesSchema.findById(guild.id)
        if(!targetChannel){
            return 'Please set a channel by using /setquote'
        }

        const { channelId } = targetChannel
        const channel = guild.channels.cache.get(channelId) as TextChannel
        data = quoteData[guild.id] = [channel, quote]

        data[0].send({
            content: `${sayer}:  ${data[1]}`,
            allowedMentions:{
                users: [],
            }
        })

        return 'Quote sent!'
    }
} as ICommand