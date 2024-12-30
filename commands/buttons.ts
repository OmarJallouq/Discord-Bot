import { Interaction, Message, MessageActionRow, MessageButton, MessageComponentInteraction } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'testing',
    description: 'testing',
    slash: true,
    testOnly: true,

    callback: async({ interaction: msgInt, channel }) => {
        //const = a new row for buttons, then each .addcomponents is a button
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
             .setCustomId('ban_yes')
             .setEmoji('😊')
             .setLabel('Confirm')
             .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
             .setCustomId('ban_no')
             .setLabel('Cancel')
             .setStyle('DANGER')
        )
        
        const linkRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                 .setURL('https://wornoffkeys.com')
                 .setStyle('LINK')
                 .setLabel('link heh')
            )

        // message itself
        await msgInt.reply({
            content: 'Are you sure?',
            components: [row, linkRow],
            ephemeral: true,
        })

        //checks if the user who clicked the button is the one who called it
        const filter = (btnInt: Interaction) => {
            return msgInt.user.id === btnInt.user.id
        }

        //"collecter" as in time to get the response (conditions)
        const collector = channel.createMessageComponentCollector({
            filter, //remove if anyone should be able to respond
            max: 1,
            time: 15000
        })

        //'collect' as in a response has been recorded
        collector.on('collect', (i: MessageComponentInteraction) => {
            i.reply({
                content: 'You clicked a button',
                ephemeral: true
            })
        })

        //'end' as in once collection is done (max is fulfilled/time is exceeded)
        collector.on('end', async(collection) => {
            //logs each response/click (person id and button id)
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })

            if(collection.first()?.customId === 'ban_yes'){
                // ban the target user
            }

            //...

            //edits orig message
            await msgInt.editReply({
                content: 'an action has already been taken',
                components: [],
            })
        })
    },
} as ICommand