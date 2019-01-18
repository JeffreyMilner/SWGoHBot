const Command = require("../base/Command");

class Squads extends Command {
    constructor(client) {
        super(client, {
            name: "squads",
            aliases: ["sq", "squad", "raid", "raidteam"],
            category: "Star Wars",
            permissions: ["EMBED_LINKS"]
        });
    }

    async run(client, message, [user, list, phase]) {
        const example = `squads aat 1\n${message.guildSettings.prefix}squads me aat 1\n${message.guildSettings.prefix}squads 123456789 aat 1`;
        const squadList = client.squads;
        const lists = Object.keys(squadList).filter(l => !["psummary", "gsummary"].includes(l));
        let shipEv = false;

        if (!user) {
            return super.error(message, message.language.get("COMMAND_SQUADS_NO_LIST", lists.join(", ")), {title: "Missing category", example: example});
        }

        const lang = message.guildSettings.swgoghLanguage;
        let allyCodes;
        if (user === "me" || client.isUserID(user) || client.isAllyCode(user)) {
            allyCodes = await client.getAllyCode(message, user);
        }
        let player = null;
        let cooldown = null;
        if (!allyCodes || !allyCodes.length || allyCodes.length > 1) {
            phase = list;
            list = user;
        } else {
            cooldown = client.getPlayerCooldown(message.author.id);
            try {
                player = await client.swgohAPI.player(allyCodes[0], lang, cooldown);
            } catch (e) {
                console.log("Broke getting player in squads: " + e);
            }
        }

        if (!list) {
            // No list, show em the possible ones
            return super.error(message, message.language.get("COMMAND_SQUADS_NO_LIST", lists.join(", ")), {title: "Missing category", example: example});
        } else {
            list = list.toLowerCase();
        } 
        if (lists.includes(list)) {
            if (!phase) {
                // They've chosen a list, show em the phase list 
                const outList = squadList[list].phase.map((p, ix) => 
                    "`" + (ix + 1) + "`"+ ": " + p.name.replace("&amp;", "&").toProperCase().replace(/aat/gi, "AAT")
                ).join("\n");
                return super.error(message, message.language.get("COMMAND_SQUADS_SHOW_LIST", list.toProperCase().replace(/aat/gi, "AAT"), outList), {title: "Missing phase", example: example});
            } else if (phase > 0 && phase <= squadList[list].phase.length) {
                phase = phase - 1;
                const sqArray = [];
                if (squadList[list].phase[phase].name) {
                    squadList[list].phase[phase].name = squadList[list].phase[phase].name.replace("&amp;", "&").toProperCase().replace(/aat/gi, "AAT");
                }
                for (const s of squadList[list].phase[phase].squads) {
                    let outStr = s.name ? `**${s.name}**\n` : "";

                    try {
                        outStr += await charCheck(s.team, {
                            level : squadList[list].level,
                            stars : squadList[list].rarity,
                            gear  : squadList[list].gear
                        }, player, s.ships);
                    } catch (e) {
                        return super.error(message, e.message);
                    }
                    if (s.ships) shipEv = true;
                    sqArray.push(outStr);
                }

                const fields = [];
                const outArr = client.msgArray(sqArray, "\n", 1000);
                outArr.forEach((sq, ix) => {
                    fields.push({
                        name: (player ? player.name + "'s " : "") + message.language.get("COMMAND_SQUADS_FIELD_HEADER") + (ix === 0 ? "" : " " + message.language.get("BASE_CONT_STRING")),
                        value: sq
                    });
                });
                let footer = "";
                if (player && cooldown) {
                    if (player.warnings) {
                        fields.push({
                            name: "Warnings",
                            value: player.warnings.join("\n")
                        });
                    }

                    footer = client.updatedFooter(player.updated, message, "player", cooldown);
                }
                return message.channel.send({embed: {
                    author: {
                        name: squadList[list].name.toProperCase().replace(/aat/gi, "AAT")
                    },
                    description: `**${squadList[list].phase[phase].name}**\n${squadList[list].rarity}* ${shipEv ? "" : `| g${squadList[list].gear}`} | lvl${squadList[list].level}`,
                    fields: fields,
                    footer: footer,
                    color: 0x00FF00
                }});
            } else {
                const outList = squadList[list].phase.map((p, ix) => "`" + (ix + 1) + "`"+ ": " + p.name.replace("&amp;", "&").toProperCase().replace(/aat/gi, "AAT")).join("\n");
                return super.error(message, message.language.get("COMMAND_SQUAD_INVALID_PHASE", outList), {example: example});
            }
        } else {
            // Unknown list/ category
            return super.error(message, `Please select one of the following: \n\`${lists.join(", ")}\``, {title: "Invalid Category", example: example});
        }

        async function charCheck(characters, stats, player=null, ships=null) {
            const {level, stars, gear} = stats;
            let outStr = "";
            if (!player) {
                characters.forEach(c => {
                    try {
                        if (!ships) {
                            outStr += client.characters.filter(char => char.uniqueName === c.split(":")[0])[0].name + "\n";
                        } else {
                            outStr += client.ships.filter(ship => ship.uniqueName === c.split(":")[0])[0].name + "\n";
                        }
                    } catch (e) {
                        console.log("Squad broke: " + c + ": " + e);
                    }
                });
            } else {
                if (!player || !player.roster) {
                    throw new Error("Sorry, something broke whlie getting your info. Please try again.");
                }
                for (const c of characters) {
                    try {
                        let ch = player.roster.find(char => char.defId === c.split(":")[0]);
                        if (ch) {
                            ch = await client.swgohAPI.langChar(ch, message.guildSettings.swgohLanguage);
                        }
                        if (!ch) {
                            if (!ships) {
                                outStr += "`✗|✗|✗` " + client.characters.filter(char => char.uniqueName === c.split(":")[0])[0].name + "\n";
                            } else {
                                outStr += "`✗|✗` " + client.characters.filter(char => char.uniqueName === c.split(":")[0])[0].name + "\n";
                            }
                        } else if (ch.rarity >= stars && ch.gear >= gear && ch.level >= level) {
                            if (!ships) {
                                outStr += "`✓|✓|✓` **" + ch.nameKey + "**\n"; 
                            } else {
                                outStr += "`✓|✓` **" + ch.nameKey + "**\n"; 
                            }
                        } else {
                            outStr += ch.rarity >= stars ? "`✓|" : "`✗|";
                            if (!ships) {
                                outStr += ch.gear   >= gear  ? "✓|" : "✗|";
                            }
                            outStr += ch.level  >= level ? "✓` " : "✗` ";
                            outStr += ch.nameKey + "\n";
                        }
                    } catch (e) {
                        console.log("Squad broke: " + c + ": " + e);
                    }
                }
            }
            return outStr;
        }
    }
}

module.exports = Squads;

