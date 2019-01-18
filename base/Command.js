class Command {
    constructor(client, {
        name = null,
        description = "No description provided.",
        category = "General",
        usage = "No usage provided.",
        example = "No example provided",
        extended = "No information provided.",
        hidden = false,
        enabled = true, 
        guildOnly = false,
        aliases = [],
        permissions = [],
        permLevel = 0,
        flags = {},
        subArgs = {}
    }) {
        this.client = client;
        this.conf = {
            enabled,
            hidden,
            guildOnly,
            aliases,
            permissions,
            permLevel,
            flags,
            subArgs
        };
        this.help = {
            name,
            description,
            category,
            usage,
            example,
            extended
        };
    }

    async getUserAndChar(message, [userID, ...searchChar], charNeeded=true) {
        const out = {
            allyCode: null,
            searchChar: null,
            err: null
        };
        if (!userID) {
            // No user or char, just return null for both
            // with an error
            if (charNeeded) {
                out.err = message.language.get("BASE_SWGOH_MISSING_CHAR");
            } else {
                userID = message.author.id;
            }
        } else if (userID !== "me" && !this.client.isAllyCode(userID) && !this.client.isUserID(userID)) {
            // No valid user, so return it all as a character, and 
            // use the message's author as the user
            out.searchChar = (userID + " " + searchChar.join(" ")).trim();
            userID = message.author.id;
        } else {
            // There was a valid user first, so use that and the rest
            // as the character
            if (searchChar.length) {
                out.searchChar = searchChar.join(" ").trim();
            } else if (charNeeded) {
                // There was a userID, but no character
                out.err = message.language.get("BASE_SWGOH_MISSING_CHAR");
            }
        }

        // If it got this far, it's got a valid userID (ally code or Discord ID)
        // so regardless of which, grab an ally code 
        if (userID && (out.searchChar || !charNeeded)) {
            const allyCodes = await this.client.getAllyCode(message, userID);
            if (!allyCodes.length) {
                out.err = message.language.get("BASE_SWGOH_NO_ALLY", message.guildSettings.prefix);
            } else if (allyCodes.length > 1) {
                out.err =  message.channel.send("Found " + allyCodes.length + " matches. Please try being more specific");
            } else {
                out.allyCode = allyCodes[0];
            }
        }

        return out;
    }

    async getUser(message, userID, useAuth=false) {
        let out = null;
        if (useAuth && userID !== "me" && !this.client.isAllyCode(userID) && !this.client.isUserID(userID)) {
            // No valid user, so use the message's author as the user
            userID = message.author.id;
        } 
        // If it got this far, it's got a valid userID (ally code or Discord ID)
        // so regardless of which, grab an ally code 
        if (userID) {
            const allyCodes = await this.client.getAllyCode(message, userID);
            if (allyCodes.length) {
                out = allyCodes[0];
            }
        }

        return out;
    }

    async error(message, err, options) {
        if (!message || !message.channel) throw new Error("Missing message");
        if (!err) throw new Error("Missing error message");
        if (!options) options = {};
        const title = options.title || "Error";
        const footer = options.footer || "";
        const color = options.color || 0xe01414;
        if (options.example) {
            const prefix = message.guildSettings ? message.guildSettings.prefix : ";";
            err += `\n\n**Example:**${message.client.codeBlock(prefix + options.example)}`;
        }
        if (options.edit) {
            try {
                if (message.author.id !== message.client.user.id) {
                    console.log("Trying to edit someone else's message" + message.content);
                    throw new Error("Can't edit someone else's message");
                }
                return message.edit({embed: {
                    author: {name: title},
                    description: err,
                    color: color,
                    footer: {
                        text: footer
                    }
                }});
            } catch (e) {
                console.log("base/Command Error: " + e.message);
                console.log("base/Command Message: " + message.content);
                return message.channel.send({embed: {
                    author: {name: title},
                    description: err,
                    color: color,
                    footer: {
                        text: footer
                    }
                }});
            }
        } else {
            return message.channel.send({embed: {
                author: {name: title},
                description: err,
                color: color,
                footer: {
                    text: footer
                }
            }});
        }
    }
}

module.exports = Command;















