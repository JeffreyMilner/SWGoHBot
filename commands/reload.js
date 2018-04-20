const Command = require('../base/Command');

class Reload extends Command {
    constructor(client) {
        super(client, {
            name: 'reload',
            aliases: ['r'],
            permLevel: 10,
            category: 'Dev'
        });
    }

    async run(client, message, args) {
        let command;
        if (client.commands.has(args[0])) {
            command = args[0];
        } else if (client.aliases.has(args[0])) {
            command = client.aliases.get(args[0]);
        }
        if (!command) {
            return message.channel.send(message.language.get('COMMAND_RELOAD_INVALID_CMD', args[0])).then(msg => msg.delete(4000)).catch(console.error);
        } else {
            message.channel.send(`Reloading: ${command}`)
                .then(async m => {
                    if (client.shard && client.shard.count > 0) {
                        await client.shard.broadcastEval(`
                            this.reload('${command}');
                        `)
                            .then(() => {
                                m.edit(message.language.get('COMMAND_RELOAD_SUCCESS', command));
                            })
                            .catch(e => {
                                m.edit(message.language.get('COMMAND_RELOAD_FAILURE',command, e.stack));
                            });
                    } else {
                        client.reload(command)
                            .then(() => {
                                m.edit(message.language.get('COMMAND_RELOAD_SUCCESS', command));
                            })
                            .catch(e => {
                                m.edit(message.language.get('COMMAND_RELOAD_FAILURE', command, e.stack));
                            });
                    }
                });
        }
    }
}

module.exports = Reload;

