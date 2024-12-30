import { ICommand } from "wokcommands";
import testSchema from "../test-schema";

export default {
    category: 'testing',
    description: 'simulates a join',

    slash: 'both',
    testOnly: true,

    callback: ({ member, client }) => {
        client.emit('guildMemberAdd', member)
        return 'Join simulated!'
    }
} as ICommand