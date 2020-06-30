/* eslint no-undef: 0 */
// const {inspect} = require("util");
module.exports = async (Bot, client) => {
    // Logs that it's up, and some extra info
    client.shard.id = client.shard.ids[0];
    let readyString = `${client.user.username} is ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`;
    if (client.shard) {
        readyString = `${client.user.username} is ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers. Shard #${client.shard.id}`;
        if (client.shard.id === 0) {
            // Reload the patrons' goh data, and check for arena rank changes every minute
            if (Bot.config.premium) {
                setInterval(async () => {
                    await Bot.getRanks();
                    await Bot.shardRanks();
                }, 1 * 60 * 1000);
            }
        }

        // If it's the last shard being started, load all the emotes in
        if ((client.shard.id + 1) === client.shard.count) {
            Bot.logger.log("Loading up emotes");
            await client.shard.broadcastEval("this.loadAllEmotes()");
        }
    } else {
        client.loadAllEmotes();
    }

    Bot.logger.log(readyString, "ready", true);

    // Sets the status as the current server count and help command
    const playingString =  `${Bot.config.prefix}help ~ swgohbot.com`;
    client.user.setPresence({ game: { name: playingString, type: 0 } }).catch(console.error);

    // Update the player/ guild count every 5 min
    setInterval(async () => {
        const dbo = await Bot.mongo.db(Bot.config.mongodb.swapidb);
        Bot.swgohPlayerCount = await dbo.collection("playerStats").find({}).count();
        Bot.swgohGuildCount  = await dbo.collection("guilds").find({}).count();
    }, 5 * 60 * 1000);

    Bot.loadAllEvents();
};
