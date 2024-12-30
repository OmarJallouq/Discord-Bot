import { Channel, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sends list of the commands',
    slash: 'both',
    testOnly: false,
    

    callback: async({message, interaction, text, channel}) => {
        const embed = new MessageEmbed()
        .setDescription("You can use the prefix ! instead of / too!")
        .setTitle(`OJBot Commands`)
        .setColor('PURPLE')
        .setFooter('https://twitch.tv/ojohyay')
        .addFields([
            {
                name: 'Bonk',
                value: 'Bonks another server member! \n' + '`/bonk <user>`',
                inline: false,
            },
            {
                name: 'Schedule',
                value: `Sends out OJ's Stream Schedule! \n` + '`/schedule`',
                inline: false,
            },
            {
                name: 'Quotes',
                value: 'Posts a quote to the dedicated quotes channel! \n' + '`/quote <user> <message>`',
                inline: false,
            }

        ])


        if(interaction){
            interaction.reply({
                embeds: [embed]
            })
        }
        else
            channel.send({ embeds: [embed] })

        return 0
    },
} as ICommand