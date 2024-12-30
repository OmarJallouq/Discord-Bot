import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

let Days: string[] = [];
let Time:string = "7:00pm";

export default {
    category: 'Stream',
    description: 'Sends out OJs Streaming Schedule',
    testOnly: false,

    callback: async({channel}) => {
        const twitchLink = `https://twitch.tv/ojohyay`
        const embed = new MessageEmbed()
            .setTitle(`OJOhYay's Streaming Schedule:`)
            .setColor('PURPLE')
        
        if(Days.length == 0){
            embed
            .setDescription("Stream Schedule has not been decided yet! Please check back another time")
        }
        else{
            embed
            .setDescription("All streams will be at "+Time+" GMT+3 :D")

            for(let i = 0; i < Days.length; i++){
                embed.
                    addFields({
                        name: Days[i],
                        value: `https://twitch.tv/ojohyay`,
                        inline: false,
                    })
            }
        }
            channel.send({ embeds: [embed] })

        return 1
    },
} as ICommand