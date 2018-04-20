const Language = require('../base/Language.js');
const DAYSOFWEEK = {
    SUNDAY: {
        SHORT: 'So',
        LONG: 'Sonntag'
    },
    MONDAY: {
        SHORT: 'Mo',
        LONG: 'Montag'
    },
    TUESDAY: {
        SHORT: 'Di',
        LONG: 'Dienstag'
    },
    WEDNESDAY: {
        SHORT: 'Mi',
        LONG: 'Mittwoch'
    },
    THURSDAY: {
        SHORT: 'Do',
        LONG: 'Donnerstag'
    },
    FRIDAY: {
        SHORT: 'Fr',
        LONG: 'Freitag'
    },
    SATURDAY: {
        SHORT: 'Sa',
        LONG: 'Samstag'
    }
};
const TIMES = {
    DAY: {
        PLURAL: 'Tage',
        SING: 'Tag',
        SHORT_PLURAL: 'T',
        SHORT_SING: 'T'
    },
    HOUR: {
        PLURAL: 'Stunden',
        SING: 'Stunde',
        SHORT_PLURAL: 'Std',
        SHORT_SING: 'Std'
    },
    MINUTE: {
        PLURAL: 'Minuten',
        SING: 'Minute',
        SHORT_PLURAL: 'Min',
        SHORT_SING: 'Min'
    },
    SECOND: {
        PLURAL: 'Sekunden',
        SING: 'Sekunde',
        SHORT_PLURAL: 'Sek',
        SHORT_SING: 'Sek'
    }
};

function getDay(day, type) {
    return DAYSOFWEEK[`${day}`][`${type}`];
}

function getTime(unit, type) {
    return TIMES[`${unit}`][`${type}`];
}

module.exports = class extends Language {
    constructor(...args) {
        super(...args);

        this.getDay = getDay;
        this.getTime = getTime;
        this.language = {
            // Base swgohBot.js file
            BASE_LAST_EVENT_NOTIFICATION: `\n\nDas ist der letzte Eintrag fuer dieses Event. Um weiterhin diese Ankuendigung zu erhalten, erstelle ein neues Event.`,
            BASE_EVENT_STARTING_IN_MSG: (key, timeToGo) => `**${key}**\nStartet in ${timeToGo}`,

            // Base swgohAPI
            BASE_SWGOH_NOT_REG: (user) => `Entschuldigung, aber dieser User ist nicht registriert. Bitte registrieren mit \`;register add @${user} <allycode>\``,

            // Generic (Not tied to a command)
            COMMAND_EXTENDED_HELP: (command) => `**Erweiterte Hilfe fuer ${command.help.name}** \n**Verwendung**: ${command.help.usage} \n${command.help.extended}`,
            COMMAND_INVALID_BOOL: `Ungueltiger Wert, versuche true oder false`,
            COMMAND_MISSING_PERMS: `Entschuldigung, aber Sie haben nicht die richtigen Berechtigungen, um das zu verwenden.`,
            BASE_COMMAND_UNAVAILABLE: "Dieser Befehl ist ueber Privatnachrichten nicht verfuegbar. Bitte fuehre diesen Befehl innerhalb eines Gildenservers aus.",
            BASE_COMMAND_HELP_HEADER: (name) => `Hilfe fuer ${name}`,
            BASE_COMMAND_HELP_HEADER_CONT: (name) => `Fortgesetzte Hilfe fuer ${name}`,
            BASE_COMMAND_HELP_HELP: (name) => {
                return {
                    action: "Help",
                    actionDesc: "Zeigt diese Hilfe an.",
                    usage: `;${name} help`,
                    args: {}
                };
            },

            // Abilities Command 
            COMMAND_ABILITIES_NEED_CHARACTER: (prefix, usage) => `Ein Charakter wird benoetigt. Verwendung \`${prefix}${usage}\``,
            COMMAND_ABILITIES_INVALID_CHARACTER: (prefix, usage) => `Ungueltiger Charakter. Verwendung \`${prefix}${usage}\``,
            COMMAND_ABILITIES_COOLDOWN: (aCooldown) => `**Abklingzeit Faehigkeit:** ${aCooldown}\n`,
            COMMAND_ABILITIES_ABILITY: (aType, mat, cdString, aDesc) => `**Faehigkeiten-Typ:** ${aType}     **Max Faehigkeit Mat benoetigt:** ${mat}\n${cdString}${aDesc}`,
            COMMAND_ABILITIES_ABILITY_CODE: (abilityName, type, tier, aDesc) => `### ${abilityName} ###\n* Faehigkeiten-Typ: ${type}\n* Max Faehigkeit Mat benoetigt: ${tier}\n* Beschreibung: ${aDesc}\n\n`,
            COMMAND_ABILITIES_HELP: {
                description: "Zeigt die Faehigkeiten für einen spezifizierten Charakter.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';abilities <Charaktername>',
                        args: {}
                    }
                ]
            },

            // Activities Command
            COMMAND_ACTIVITIES_SUNDAY: `== Bis Reset == \nArena Kaempfe kaempfen \nCantina Energie sparen \nNormale Energie sparen\n\n== Nach Reset == \nCantina Energie verwenden \nNormale Energie sparen`,
            COMMAND_ACTIVITIES_MONDAY: `== Bis Reset == \nCantina Energie ausgeben \nNormale Energie sparen \nGalaktische Kriegsknoten NICHT kaempfen (bis reset verfuegbar)\n\n== Nach Reset == \nNormale Energie fuer Kaempfe der hellen Seite verwenden \nGalaktische Kriegsknoten weiterhin NICHT kaempfen (bis reset verfuegbar)`,
            COMMAND_ACTIVITIES_TUESDAY: `== Bis Reset == \nNormale Energie fuer Kaempfe der hellen Seite verwenden \nGalaktische Kriegsknoten weiterhin NICHT kaempfen\n\n== Nach Reset == \nGalaktische Kriegsknoten KAEMPFEN \nNormale Energie sparen`,
            COMMAND_ACTIVITIES_WEDNESDAY: `== Bis Reset == \nGalaktische Kriegsknoten KAEMPFEN \nNormale Energie sparen\n\n== Nach Reset == \nNormale Energie fuer Harte Kaempfe verwenden`,
            COMMAND_ACTIVITIES_THURSDAY: `== Bis Reset == \nNormale Energie fuer Harte Kaempfe verwenden \nHerausforderungen sparen\n\n== Nach Reset == \nAlle Herausforderungen beenden / kaempfen \nNormale Energie sparen`,
            COMMAND_ACTIVITIES_FRIDAY: `== Bis Reset == \nAlle Herausforderungen beenden / kaempfen \nNormale Energie spare\n\n== Nach Reset == \nNormale Energie fuer Kaempfe der dunklen Seite verwenden`,
            COMMAND_ACTIVITIES_SATURDAY: `== Bis Reset == \nNormale Energie fuer Kaempfe der dunklen Seite verwenden \nArena Kaempfe sparen \nCantina Energie sparen\n\n== Nach Reset == \nArena Kaempfe kaempfen\nCantina Energie sparen`,
            COMMAND_ACTIVITIES_ERROR: (prefix, usage) => `Ungueltiger Tag, Verwendung lautet \`${prefix}${usage}\``,
            COMMAND_ACTIVITIES_HELP: {
                description: "Zeigt die taeglichen Aktivitaeten der Gilde an.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';activities [Charaktername]',
                        args: {}
                    }
                ]
            },

            // Arenarank Command
            COMMAND_ARENARANK_INVALID_NUMBER: `Bitte einen gueltigen Rang angeben`,
            COMMAND_ARENARANK_BEST_RANK: `Weiter kommt man nicht, gratuliere!`,
            COMMAND_ARENARANK_RANKLIST: (currentRank, battleCount, plural, est, rankList) => `Von Rang ${currentRank}, in ${battleCount} battle${plural} ${est}\nDie bestmoegliche Platzierung ist ${rankList}`,
            COMMAND_ARENARANK_HELP: {
                description: "Zeigt den (vermutlich) hoechsten Rang an, der erreicht werden kann, wenn jeder Arenakampf gewonnen wird.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';arenarank <aktuellerRank>',
                        args: {}
                    }
                ]
            },

            // Challenges Command
            COMMAND_CHALLENGES_TRAINING: "Trainingsdroiden",
            COMMAND_CHALLENGES_ABILITY : "Faehigkeitenfundament",
            COMMAND_CHALLENGES_BOUNTY  : "Kopfgeldjaeger",  
            COMMAND_CHALLENGES_AGILITY : "GES-Ausruestung",   
            COMMAND_CHALLENGES_STRENGTH: "KRA-Ausruestung",  
            COMMAND_CHALLENGES_TACTICS : "Tak-Ausruestung",   
            COMMAND_CHALLENGES_SHIP_ENHANCEMENT: "Schiffsaufwertungsdroiden",
            COMMAND_CHALLENGES_SHIP_BUILDING   : "Schiffbaumaterialien",
            COMMAND_CHALLENGES_SHIP_ABILITY    : "Schiff-Faehigkeitsmaterialien",
            COMMAND_CHALLENGES_MISSING_DAY: 'Ein Tag muss spezifziert werden',
            COMMAND_CHALLENGES_DEFAULT: (prefix, usage) => `Ungueltiges Datum, der Befehl lautet: \`${prefix}${usage}\``,
            COMMAND_CHALLENGES_HELP: {
                description: "Zeigt die taeglichen Herausforderungen der Gilde an.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';challenges <Wochentag>',
                        args: {}
                    }
                ]
            },

            // Changelog Command (Help)
            COMMAND_CHANGELOG_HELP: {
                description: "Fuegt eine Logdatei zur DB hinzu und fuegt diese dem Changelog-Kanal hinzu.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'changelog <Nachricht>',
                        args: {
                            "Nachricht": "Benutze [Updated], [Fixed], [Removed], und [Added] um die Aenderungen zu organisieren."
                        }
                    }
                ]
            },

            // Character gear Command
            COMMAND_CHARGEAR_NEED_CHARACTER: (prefix, usage) => `Benoetigt Charakter. Der Befehl lautet: \`${prefix}${usage}\``,
            COMMAND_CHARGEAR_INVALID_CHARACTER: (prefix, usage) => `Ungueltiger Charakter. Der Befehl lautet: \`${prefix}${usage}\``,
            COMMAND_CHARGEAR_GEAR_ALL: (name, gearString) => ` * ${name} * \n### Komplette benoetigte Ausruestung ### \n${gearString}`,
            COMMAND_CHARGEAR_GEAR_NA: 'Diese Ausruestung wurde nicht eingefuegt',
            COMMAND_CHARACTERGEAR_HELP: {
                description: "Zeigt die Gearanforderungen für den spezifizierten Charakter / Level.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'charactergear <Charakter> [Gearlevel]',
                        args: {}
                    }
                ]
            },

            // Event Command (Create)
            COMMAND_EVENT_INVALID_ACTION: (actions) => `Gueltige Aktionen sind\`${actions}\`.`,
            COMMAND_EVENT_INVALID_PERMS: `Entschuldigung, aber entweder du bist kein Admin, oder der Server Admin hat die noetigen Konfigurationen nicht vorgenommen..\nDu kannst keine Events erstellen oder entfernen, solange du keine Admin Rolle inne hast.`,
            COMMAND_EVENT_ONE_REPEAT: 'Entschuldigung, aber du kannst nicht `repeat` und `repeatDay` in einem Event nutzen. Bitte benutze nur eins der beiden.',
            COMMAND_EVENT_INVALID_REPEAT: 'Die Wiederholung ist im falschen Format. Beispiel: ˋ5d3h8mˋ steht fuer 5 Tage 3 Stunden und 8 Minuten',
            COMMAND_EVENT_USE_COMMAS: `Bitte benutze Komma getrennte Nummern fuer repeatDay. Beispiel: \`1,2,1,3,4\``,
            COMMAND_EVENT_INVALID_CHAN: `Dieser Kanal ist ungueltig. Bitte erneut versuchen`,
            COMMAND_EVENT_CHANNEL_NO_PERM: (channel) => `Ich habe keine Berechtigung in ${channel} Nachrichten zu senden, bitte waehle einen Kanal, wo ich es kann`,
            COMMAND_EVENT_NEED_CHAN: 'FEHLER: Um dies zu senden, wird ein konfigurierter Kanal benoetigt. Konfiguriere ˋannounceChanˋ zum Erstellen von Events..',
            COMMAND_EVENT_NEED_NAME: `Du musst dem Event einen Namen geben.`,
            COMMAND_EVENT_EVENT_EXISTS: `Dieser Eventname existiert bereits. Erneutes anlegen nicht moeglich.`,
            COMMAND_EVENT_NEED_DATE: `Du musst ein Datum fuer dein Event angeben. Akzeptiertes Format ist \`DD/MM/YYYY\`.`,
            COMMAND_EVENT_BAD_DATE: (badDate) => `${badDate} iist kein gueltiges Datum. Akzeptiertes Format ist \`DD/MM/YYYY\`.`,
            COMMAND_EVENT_NEED_TIME: `Du musst fuer dein Event eine Zeit angeben.`,
            COMMAND_EVEMT_INVALID_TIME: `Du musst fuer dein Event eine gueltige Zeit angeben. Akzeptiertes Format ist \`HH:MM\`, bei Nutzung vom 24 Stunden-Format. Aber nicht beim 12 Stunden-Format wie AM und PM`,
            COMMAND_EVENT_PAST_DATE: (eventDATE, nowDATE) => `Du kannst kein Event in der Vergangenheit anlegen. ${eventDATE} ist vor dem heutigen ${nowDATE}`,
            COMMAND_EVENT_CREATED: (eventName, eventDate) => `Event \`${eventName}\` fuer ${eventDate} angelegt`,
            COMMAND_EVENT_TOO_BIG:(charCount) => `Entschuldigung, aber entweder ist der Eventname oder die Eventnachricht zu lang. Bitte kuerze diese um mindestens ${charCount} Zeichen.`,

            // Event Command (View)
            COMMAND_EVENT_TIME: (eventName, eventDate) => `**${eventName}** \nEvent Zeit: ${eventDate}\n`,
            COMMAND_EVENT_TIME_LEFT: (timeLeft) => `Verbleibende Zeit: ${timeLeft}\n`,
            COMMAND_EVENT_CHAN: (eventChan) => `Sende an Kanal: ${eventChan}\n`,
            COMMAND_EVENT_SCHEDULE: (repeatDays) => `Wiederholung: ${repeatDays}\n`,
            COMMAND_EVENT_REPEAT: (eventDays, eventHours, eventMins) => `Wiederhole alle ${eventDays} Tage, ${eventHours} Stunden und ${eventMins} Minuten\n`,
            COMMAND_EVENT_MESSAGE: (eventMsg) => `Event Nachricht: \n\`\`\`md\n${eventMsg}\`\`\``,
            COMMAND_EVENT_UNFOUND_EVENT: (eventName) => `Event konnte nicht gefunden werden \`${eventName}\``,
            COMMAND_EVENT_NO_EVENT: `Es gibt aktuell keine geplanten Events.`,
            COMMAND_EVENT_SHOW_PAGED: (eventCount, PAGE_SELECTED, PAGES_NEEDED, eventKeys) => `Hier ist der Eventplan \n(${eventCount} Gesamtevents: ${eventCount > 1 ? 's' : ''}) Seite ${PAGE_SELECTED}/${PAGES_NEEDED}: \n${eventKeys}`,
            COMMAND_EVENT_SHOW: (eventCount, eventKeys) => `Hier ist der Eventplan \n(${eventCount} Gesamtevents: ${eventCount > 1 ? 's' : ''}): \n${eventKeys}`,

            // Event Command (Delete)
            COMMAND_EVENT_DELETE_NEED_NAME: `Es muss ein Eventname zum loeschen angegeben werden.`,
            COMMAND_EVENT_DOES_NOT_EXIST: `Dieses Event existiert nicht.`,
            COMMAND_EVENT_DELETED: (eventName) => `Geloeschtes Event: ${eventName}`,

            // Event Command (Trigger)
            COMMAND_EVENT_TRIGGER_NEED_NAME: `Es muss ein Event angegeben werden.`,

            // Event Command (Help)
            COMMAND_EVENT_HELP: {
                description: "Wird verwendet um ein Event zu erstellen, zu pruefen oder zu loeschen.",
                actions: [
                    {
                        action: "Create",
                        actionDesc: 'Erstellt ein neues Event',
                        usage: ';event create <eventName> <eventTag> <eventZeit> [eventNachricht]',
                        args: {
                            "--repeat <WiederholZeit>": "Setzt die Dauer / ein Intervall im Format 00d00h00m. Wird nach Ablauf der Dauer in dem angegebenen Intervall wiederholt.",
                            "--repeatDay <planwerte>": "Setzt eine Wiederholung in bestimmten Tagen im Format 0,0,0,0,0.",
                            "--channel <KanalName>": "Setzt einen spezifischen Kanal fuer die Ankuendigung.",
                            "--countdown": "Fuegt dem Event ein Countdown hinzu. Der Parameter - yes ist die einzige gueltige Option."
                        }
                    },
                    {
                        action: "View",
                        actionDesc: 'Zeigt die aktuelle Liste der Events an.',
                        usage: ';event view [eventName]',
                        args: {
                            "--min": "Zeigt alle geplanten Events ohne Event-Nachricht an.",
                            "--page <Seite#>": "Waehlt eine bestimmte Seite des Eventplans aus um diese anzuzeigen."
                        }
                    },
                    {
                        action: "Delete",
                        actionDesc: 'Loescht ein Event.',
                        usage: ';event delete <eventName>',
                        args: {}
                    },
                    {
                        action: "Trigger",
                        actionDesc: 'Loest die Ankuendigung in dem spezifizierten Kanal aus. Das Event bleibt unverändert.',
                        usage: ';event trigger <eventName>',
                        args: {}
                    }
                ]
            },

            // Faction Command
            COMMAND_FACTION_INVALID_CHAR: (prefix, usage) => `Ungueltige Fraktion, das Kommando lautet: \`${prefix}${usage}\``,
            COMMAND_FACTION_CODE_OUT: (searchName, charString) => `# Charakter gehoert zur Fraktion: ${searchName} # \n${charString}`,
            COMMAND_FACTION_HELP: {
                description: "Zeigt die Liste der Charaktere der spezifizierten Fraktion an.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'faction <Fraktion>',
                        args: {
                            "Fraktion": "Die Fraktion, von der Du das Rooster sehen willst. \nDenke dran, diese Anzeige ist wie im Spiel, z.B. Rebell und nicht Rebellen"
                        }
                    }
                ]
            },

            // GuildSearch Command
            COMMAND_GUILDSEARCH_BAD_STAR: 'Du kannst nur ein Sternen-Level von 1-7 waehlen',
            COMMAND_GUILDSEARCH_MISSING_CHAR: 'Du musst einen Charakter angeben',
            COMMAND_GUILDSEARCH_NO_RESULTS: (character) => `Ich habe keine Ergebnisse gefunden fuer ${character}`,
            COMMAND_GUILDSEARCH_CHAR_LIST: (chars) => `Deine Suche hat zu viele Treffer ergeben. Bitte spezifizieren. \nHier ist eine Liste mit den besten Treffern.\n\`\`\`${chars}\`\`\``,
            COMMAND_GUILDSEARCH_FIELD_HEADER: (tier, num, setNum='') => `${tier} Sterne (${num}) ${setNum.length > 0 ? setNum : ''}`,
            COMMAND_GUILDSEARCH_NO_CHAR_STAR: (starLvl) => `Niemand in deiner Gilde scheint diesen Charakter auf ${starLvl} Sterne zu haben.`,
            COMMAND_GUILDSEARCH_NO_CHAR: `Niemand in deiner Gilde scheint diesen Charakter zu haben.`,
            COMMAND_GUILDSEARCH_HELP: {
                description: "Zeigt den Stern-Level des gewaehlten Charakters von allen Gildenmitgliedern an.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';guildsearch [user] <charakter> [starLvl]',
                        args: {
                            "user": "Die Person die du hinzufuegen moechtest. (me | userID | mention)",
                            "character": "Der Charakter nach dem du suchen moechtest.",
                            "starLvl": "Waehle den Star-Level aus den du sehen moechtest."
                        }
                    }
                ]
            },

            // Help Command
            COMMAND_HELP_HEADER: (prefix) => `= Kommandoliste =\n\n[Benutze ${prefix}Help <Kommandoname> fuer Details]\n`,
            COMMAND_HELP_OUTPUT: (command, prefix) => `= ${command.help.name} = \n${command.help.description} \nAliases:: ${command.conf.aliases.join(", ")}\n Befehl:: ${prefix}${command.help.usage}`,
            COMMAND_HELP_HELP: {
                description: "Zeigt die verfuegbaren Kommandos an.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';help [Kommando]',
                        args: {
                            "Kommando": "Das Kommando, zu dem Du die Hilfe aufrufen willst."
                        }
                    }
                ]
            },

            // Info Command
            COMMAND_INFO_OUTPUT: (guilds) => ({
                "header": 'INFORMATION',
                "desc": ` \nLaeuft zur Zeit auf **${guilds}** server \n`,
                "links": {
                    "Einladung": "Lade den Bot ein [here](http://swgohbot.com/invite)",
                    "Support Server": "Wenn du eine Frage hast oder einfach nur vorbeischauen moechtest, der Bot support server lautet [here](https://discord.gg/FfwGvhr)",
                    "Support the Bot": "Der Quellcode des Bots ist auf github [here](https://github.com/jmiln/SWGoHBot), und es kann beigetragen werden. Ich habe ausserdem ein Patreon [here](https://www.patreon.com/swgohbot) falls du interessiert bist."
                }
            }),
            COMMAND_INFO_HELP: {
                description: "Shows useful links pertaining to the bot.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'info',
                        args: {}
                    }
                ]
            },

            // Mods Command
            COMMAND_MODS_NEED_CHARACTER: (prefix, usage) => `Benoetigt einen Charakter. Der Befehl lautet: \`${prefix}${usage}\``,
            COMMAND_MODS_INVALID_CHARACTER: (prefix, usage) => `Ungueltiger Charakter. Der Befehl lautet: \`${prefix}${usage}\``,
            COMMAND_MODS_EMBED_STRING1: (square, arrow, diamond) =>  `\`Quadrat:   ${square}\`\n\`Pfeil:     ${arrow}\`\n\`Diamant:   ${diamond}\`\n`,
            COMMAND_MODS_EMBED_STRING2: (triangle, circle, cross) => `\`Dreieck:   ${triangle}\`\n\`Kreis:     ${circle}\`\n\`Kreuz:     ${cross}\``,
            COMMAND_MODS_EMBED_OUTPUT: (modSetString, modPrimaryString) => `**### Sets ###**\n${modSetString}\n**### Primaer ###**\n${modPrimaryString}`,
            COMMAND_MODS_CODE_STRING1: (square, arrow, diamond) => `* Quadrat:   ${square}  \n* Pfeil:    ${arrow} \n* Diamant:  ${diamond}\n`,
            COMMAND_MODS_CODE_STRING2: (triangle, circle, cross) => `* Dreieck: ${triangle}\n* Kreis:   ${circle}\n* Kreuz:    ${cross}`,
            COMMAND_MODS_CODE_OUTPUT: (charName, modSetString, modPrimaryString) => ` * ${charName} * \n### Sets ### \n${modSetString}\n### Primaer ###\n${modPrimaryString}`,
            COMMAND_MODS_HELP: {
                description: "Zeigt empfohlene Mods für den Charakter an.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';mods <Charakter>',
                        args: {
                            "Charakter": "Der Charakter fuer den Du Mods anzeigen willst"
                        }
                    }
                ]
            },

            // Modsets command
            COMMAND_MODSETS_OUTPUT: `* Kritischer Treffer Chance:  2\n* Kritischer Schaden:  4\n* Abwehr:  2\n* Gesundheit:   2\n* Angriff:  4\n* Effektivität:  2\n* Tempo:    4\n* Zaehigkeit: 2`,
            COMMAND_MODSETS_HELP: {
                description: "Zeigt an, wieviele Mods fuer ein Set benoetigt werden.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';modsets',
                        args: {}
                    }
                ]
            },

            // Nickname Command
            COMMAND_NICKNAME_SUCCESS: `Ich habe meinen nickname geaendert.`,
            COMMAND_NICKNAME_FAILURE: `Entschuldige, aber ich habe keine Berechtigung das zu aendern.`,
            COMMAND_NICKNAME_TOO_LONG: 'Ein Name kann maximal 32 Zeichen lang sein.',
            COMMAND_NICKNAME_HELP: {
                description: "Aendert den Botnamen auf dem Server.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';nickname <Name>',
                        args: {
                            "Name": "Der Name zu dem Du den Botnamen aendern moechtest. Keinen Namen angeben um den Namen auf den Standardwert zurueckzusetzen."
                        }
                    }
                ]
            },

            // Polls Command
            COMMAND_POLL_NO_ARG: 'Es muss eine waehlbare Option oder eine Aktion angegeben werden (create/view/etc).',
            COMMAND_POLL_ALREADY_RUNNING: "Entschuldigung, aber Sie koennen nur eine Umfrage zur gleichen Zeit durchfuehren. Bitte beenden Sie zuerst die aktuelle Umfrage.",
            COMMAND_POLL_MISSING_QUESTION: "Sie muessen etwas angeben, über das abgestimmt werden soll.",
            COMMAND_POLL_TOO_FEW_OPT: "Sie muessen mindestens 2 Optionen zur Wahl stellen.",
            COMMAND_POLL_TOO_MANY_OPT: "Sie koennen max. bis zu 10 Optionen zur Wahl stellen.",
            COMMAND_POLL_CREATED: (name, prefix, poll) => `**${name}** hat eine neue Umfrage gestartet:\nVote mit \`${prefix}poll <choice>\`\n\n${poll}`,
            COMMAND_POLL_NO_POLL: "Es wird aktuell keine Umfrage durchgefuehrt",
            COMMAND_POLL_FINAL: (poll) => `Endergebnisse fuer ${poll}`,
            COMMAND_POLL_FINAL_ERROR: (question) => `Loeschen fehlgeschlagen **${question}**, bitte erneut versuchen.`,
            COMMAND_POLL_INVALID_OPTION: "Das ist keine gueltige Option.",
            COMMAND_POLL_SAME_OPT: (opt) => `Sie haben bereits gewaehlt **${opt}**`,
            COMMAND_POLL_CHANGED_OPT: (oldOpt, newOpt) => `Sie haben Ihre Auswahl von **${oldOpt}** zu **${newOpt}** geaendert`,
            COMMAND_POLL_REGISTERED: (opt) => `Wahl fuer **${opt}** gespeichert`,
            COMMAND_POLL_CHOICE: (opt, optCount, choice) => `\`[${opt}]\` ${choice} **${optCount} vote${optCount === 1 ? '' : 's'}**\n`,
            COMMAND_POLL_HELP: {
                description: "Startet Deine Umfrage mit mehreren Optionen.",
                actions: [
                    {
                        action: "Create",
                        actionDesc: 'Erstelle eine neue Umfrage',
                        usage: ';poll create <Frage> | <Opt1> | <Opt2> | [...] | [Opt10]',
                        args: {
                            "Frage": "Deine Frage, zu der Du Feedback erwartest.",
                            "Opt": "Die Optionen, von denen die Teilnehmer auswaehlen koennen"
                        }
                    },
                    {
                        action: "Vote",
                        actionDesc: 'Waehle Deine Option aus',
                        usage: ';poll <Auswahl>',
                        args: {
                            "Auswahl": "Die Option die Du waehlst."
                        }
                    },
                    {
                        action: "View",
                        actionDesc: 'Sieh Dir die aktuellen Ergebnisse an.',
                        usage: ';poll view',
                        args: {}
                    },
                    {
                        action: "Close",
                        actionDesc: 'Beende die Umfrage und zeige das finale Ergebnis.',
                        usage: ';poll close',
                        args: {}
                    }
                ]
            },

            // Raidteams Command
            COMMAND_RAIDTEAMS_INVALID_RAID: (prefix, help) => `Ungueltiger Raid, Verwendung lautet \`${prefix}${help.usage}\`\n**Beispiel:** \`${prefix}${help.example}\``,
            COMMAND_RAIDTEAMS_INVALID_PHASE: (prefix, help) => `Ungueltige Phase, Verwendung lautet \`${prefix}${help.usage}\`\n**Beispiel:** \`${prefix}${help.example}\``,
            COMMAND_RAIDTEAMS_PHASE_SOLO: 'Solo',
            COMMAND_RAIDTEAMS_PHASE_ONE: 'Phase 1',
            COMMAND_RAIDTEAMS_PHASE_TWO: 'Phase 2',
            COMMAND_RAIDTEAMS_PHASE_THREE: 'Phase 3',
            COMMAND_RAIDTEAMS_PHASE_FOUR: 'Phase 4',
            COMMAND_RAIDTEAMS_CHARLIST: (charList) => `**Charaktere:** \`${charList}\``,
            COMMAND_RAIDTEAMS_SHOWING: (currentPhase) => `Zeige Teams fuer ${currentPhase}`,
            COMMAND_RAIDTEAMS_NO_TEAMS: (currentPhase) => `Keine Teams gefunden \`${currentPhase}\``,
            COMMAND_RAIDTEAMS_CODE_TEAMS: (raidName, currentPhase) => ` * ${raidName} * \n\n* Zeige Teams fuer ${currentPhase}\n\n`,
            COMMAND_RAIDTEAMS_CODE_TEAMCHARS: (raidTeam, charList) => `### ${raidTeam} ### \n* Charaktere: ${charList}\n`,
            COMMAND_RAIDTEAMS_HELP: {
                description: "Zeigt Teams an, die im Raid gut funktionieren.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';raidteams <Raid> <Phase>',
                        args: {
                            "Raid": "Der Raid, fuer welchen Du Teams anzeigen willst. (aat|pit|sith)",
                            "Phase": "Die Phase des Raids, fuer welches Du Teams anzeigen lassen willst. (p1|p2|p3|p4|solo)"
                        }
                    }
                ]
            },

            // Randomchar Command
            COMMAND_RANDOMCHAR_INVALID_NUM: (maxChar) => `Entschuldige, aber du brauchst eine Nummer 1-${maxChar} hier.`,
            COMMAND_RANDOMCHAR_HELP: {
                description: "Nimmt 5 zufaellige Charaktere und erstellt ein Team.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';randomchar [AnzahlCharaktere]',
                        args: {
                            "AnzahlCharaktere": "Die Anzahl der Charaktere, die ausgewaehlt werden sollen"
                        }
                    }
                ]
            },

            // Register Command
            COMMAND_REGISTER_MISSING_ARGS: 'Du musst eine userID (mention or ID) angeben, und einen ally code',
            COMMAND_REGISTER_MISSING_ALLY: 'Du musst einen ally code angeben mit dem du dein Konto verknuepfen willst.',
            COMMAND_REGISTER_INVALID_ALLY: (allyCode) => `Entschuldigung, aber ${allyCode} ist kein gueltiger ally code`,
            COMMAND_REGISTER_PLEASE_WAIT: 'Bitte warten waehrend ich die Daten synchronisiere.',
            COMMAND_REGISTER_SUCCESS: 'Registrierung erfolgreich!',

            // Reload Command
            COMMAND_RELOAD_INVALID_CMD: (cmd) => `Ich kann das Kommando nicht finden: ${cmd}`,
            COMMAND_RELOAD_SUCCESS: (cmd) => `Erfolgreich neu geladen: ${cmd}`,
            COMMAND_RELOAD_FAILURE: (cmd, stackTrace) => `Neuladen des Kommandos fehlgeschlagen: ${cmd}\n\`\`\`${stackTrace}\`\`\``,
            COMMAND_RELOAD_HELP: {
                description: "Laedt die Kommandodatei neu, wenn sie aktualisiert oder geändert wurde.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';reload <Kommando>',
                        args: {
                            "Kommando": "Das Kommando, welches neu geladen werden soll."
                        }
                    }
                ]
            },

            // Setconf Command
            COMMAND_SETCONF_MISSING_PERMS: `Entschuldige, aber entweder bist du kein Admin oder der Anführer dieses Servers hat die Konfiguration nicht eingestellt.`,
            COMMAND_SETCONF_MISSING_OPTION: `Du musst eine Konfig-Option auswaehlen zum aendern.`,
            COMMAND_SETCONF_MISSING_VALUE: `Zum aendern dieser Option musst du einen Wert angeben.`,
            COMMAND_SETCONF_ADMINROLE_MISSING_OPT: 'Es muss `add` oder `remove` benutzt werden.',
            COMMAND_SETCONF_ADMINROLE_NEED_ROLE: (opt) => `Du musst eine Rolle definieren ${opt}.`,
            COMMAND_SETCONF_ADMINROLE_MISSING_ROLE: (roleName) => `Entschuldige, aber ich kann die Rolle nicht finden ${roleName}. Bitte erneut versuchen.`,

            COMMAND_SETCONF_ADMINROLE_ROLE_EXISTS: (roleName) => `Entschuldige, aber ${roleName} ist bereits vorhanden.`,
            COMMAND_SETCONF_ADMINROLE_NOT_IN_CONFIG: (roleName) => `Entschuldige, aber ${roleName} ist nicht in deiner Konfig.`,
            COMMAND_SETCONF_ADMINROLE_SUCCESS: (roleName, action) => `Die Rolle ${roleName} wurde ${action === 'add' ? 'hinzugefuegt' : 'entfernt'} von den Admin-Rollen.`,
            COMMAND_SETCONF_WELCOME_NEED_CHAN: `Entschuldige, aber der Ankuendigungskanal ist nicht definiert oder nicht mehr gueltig.\nSetze \`announceChan\` auf einen gueltigen Kanal und versuche es erneut\``,
            COMMAND_SETCONF_TIMEZONE_NEED_ZONE: `Ungueltige Zeitzone, gehe zu https://en.wikipedia.org/wiki/List_of_tz_database_time_zones \nund suche die du brauchst und gib den Inhalt gemaess der Spalte TZ an`,
            COMMAND_SETCONF_ANNOUNCECHAN_NEED_CHAN: (chanName) => `Entschuldige, aber ich kann diesen Kanal nicht finden ${chanName}. Bitte versuche es erneut.`,
            COMMAND_SETCONF_ANNOUNCECHAN_NO_PERMS: `Entschuldige, aber du hast keine Berechtigung diese Nachricht hier zu senden. Entweder muessen die Berechtigungen angepasst werden oder waehle einen anderen Kanal.`,

            COMMAND_SETCONF_NO_KEY: (prefix) => `Dieser Schluessel ist nicht in der Konfiguration. Schaue in "${prefix}showconf", oder "${prefix}setconf help" fuer eine Uebersicht`,
            COMMAND_SETCONF_UPDATE_SUCCESS: (key, value) => `Gildenkonfiguration ${key} geaendert auf:\n\`${value}\``,
            COMMAND_SETCONF_NO_SETTINGS: `Keine Gildeneinstellungen gefunden.`,
            COMMAND_SETCONF_INVALID_LANG: (value, langList) => `Entschuldige, aber ${value} ist aktuell keine gueltige Sprache. \nUnterstuetzte Sprachen sind: \`${langList}\``,
            COMMAND_SETCONF_HELP: {
                description: "Zum Bearbeiten der Einstellungen des Bots.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';setconf <Schluessel> <Wert>',
                        args: {}
                    },
                    {
                        action: "adminRole",
                        actionDesc: 'Die Rolle, welche die Moeglichkeit haben soll Einstellungen des Bots zu aendern oder Events anlegen kann',
                        usage: ';setconf adminRole <hinzufuegen|entfernen> <Rolle>',
                        args: {
                            'hinzufuegen':  'Eine Rolle zur Liste hinzufuegen',
                            'entfernen': 'Eine Rolle von der Liste entfernen'
                        }
                    },
                    {
                        action: "enableWelcome",
                        actionDesc: 'Schaltet die Willkommensnachricht ein bzw. aus.',
                        usage: ';setconf enableWelcome <true|false>',
                        args: {}
                    },
                    {
                        action: "welcomeMessage",
                        actionDesc: 'Die Willkommensnachricht, die gesendet wird, wenn sie eingeschaltet ist (Besondere Variablen unten)',
                        usage: ';setconf welcomeMessage <Nachricht>',
                        args: {
                            '{{user}}':  "Wird durch den Benutzernamen ersetzt.",
                            '{{userMention}}': "Erwaehnt den neuen Benutzer."
                        }
                    },
                    {
                        action: "useEmbeds",
                        actionDesc: 'Schaltet ein bzw. aus, ob die Ausgabe einiger Kommandos eingebettet werden soll.',
                        usage: ';setconf useEmbeds <true|false>',
                        args: {}
                    },
                    {
                        action: "timezone",
                        actionDesc: 'Setzt die Zeitzone, die fuer Kommandos genutzt werden soll. Hier eine Liste der Zeitzonen https://goo.gl/Vqwe49.',
                        usage: ';setconf timezone <Zeitzone>',
                        args: {}
                    },
                    {
                        action: "announceChan",
                        actionDesc: 'Setzt den Ankuendigungskanal fuer Events etc. Stelle sicher, dass die Berechtigung zum Schreiben in dem Kanal gesetzt ist.',
                        usage: ';setconf announceChan <KanalName>',
                        args: {}
                    },
                    {
                        action: "useEventPages",
                        actionDesc: 'Zeigt Events in Seiten an.',
                        usage: ';setconf useEventPages <true|false>',
                        args: {}
                    },
                    {
                        action: "reset",
                        actionDesc: 'Setzt die Konfiguration auf die Standardwerte zurueck (ACHTUNG nur benutzen, wenn Du Dir sicher bist)',
                        usage: ';setconf reset',
                        args: {}
                    }
                ]
            },

            // Shard times command
            COMMAND_SHARDTIMES_MISSING_USER: `Benutzer wird benoetigt, bitte "me" verwenden, einen Benutzer benennen oder eine Discord ID einfuegen.`,
            COMMAND_SHARDTIMES_MISSING_ROLE: `Ohne Adminrechte, kannst Du nur Dich selbst angeben..`,
            COMMAND_SHARDTIMES_INVALID_USER: `Ungueltiger Benutzer, bitte "me" verwenden, einen Benutzer benennen oder eine Discord ID einfuegen.`,
            COMMAND_SHARDTIMES_MISSING_TIMEZONE: `Bitte eine Zeitzone eintragen.`,
            COMMAND_SHARDTIMES_INVALID_TIMEZONE: `Ungueltige Zeitzone, bitte hier pruefen https://en.wikipedia.org/wiki/List_of_tz_database_time_zones \nwelche benoetigt wird, dann eintragen, was in der TZ-Spalte gennant wird`,
            COMMAND_SHARDTIMES_USER_ADDED: `Benutzer erfolgreich hinzugefuegt!`,
            COMMAND_SHARDTIMES_USER_NOT_ADDED: `Etwas lief schief beim Benutzer hinzufuegen, bitte erneut probieren.`,
            COMMAND_SHARDTIMES_REM_MISSING_PERMS: `Du kannst nur Dich selbst entfernen, es sei denn Du hast Adminrechte.`,
            COMMAND_SHARDTIMES_REM_SUCCESS: `Benutzer erfolgreich entfernt!`,
            COMMAND_SHARDTIMES_REM_FAIL: `Etwas lief schieb beim entfernen des Benutzers, bitte erneut probieren.`,
            COMMAND_SHARDTIMES_REM_MISSING: `Dieser Benutzer scheint hier nicht zu existieren.`,
            COMMAND_SHARDTIMES_SHARD_HEADER: `Splitterauszahlung in:`,
            COMMAND_SHARDTIMES_HELP: {
                description: "Zeigt die Payout-Zeiten von allen registrierten Benutzern an.",
                actions: [
                    {
                        action: "Add",
                        actionDesc: 'Benutzer zum Splitter-Tracker hinzufuegen',
                        usage: ';shardtimes add <Benutzer> <Zeitzone> [Emoji]',
                        args: {
                            "Benutzer": "Der Benutzer, der hinzugefuegt wird. (me | userID | mention)",
                            "Zeitzone": "Die Zeitzone, die fuer Dich gilt.",
                            "Emoji": "OPTIONAL: Ein Emoji, das neben dem Namen angezeigt wird."
                        }
                    },
                    {
                        action: "Remove",
                        actionDesc: 'Benutzer vom Splitter-Tracker entfernen',
                        usage: ';shardtimes remove <Benutzer>',
                        args: {
                            "Benutzer": "Der Benutzer, der entfernt werden soll. (me | userID | mention)"
                        }
                    },
                    {
                        action: "View",
                        actionDesc: 'Zeigt alle Zeiten fuer Dich und Deiner Splitter-Gefaehrten an.',
                        usage: ';shardtimes view',
                        args: {}
                    }
                ]
            },

            // Ships Command
            COMMAND_SHIPS_NEED_CHARACTER: (prefix, usage) => `Benoetigt Charakter oder Schiff. Der Befehl lautet: \`${prefix}${usage}\``,
            COMMAND_SHIPS_INVALID_CHARACTER: (prefix, usage) => `Ungueltiger Charakter oder Schiff. Der Befehl lautet: \`${prefix}${usage}\``,
            COMMAND_SHIPS_TOO_MANY: `Es wurde mehr als ein Ergebnis gefunden. Bitte spezifizieren Sie Ihre Suche genauer.`,
            COMMAND_SHIPS_CREW: 'Crew',
            COMMAND_SHIPS_FACTIONS: 'Fraktionen',
            COMMAND_SHIPS_ABILITIES: (abilities) => `**Faehigkeitstyp:** ${abilities.type}   **Faehigkeitsabklingzeit:** ${abilities.abilityCooldown} \n${abilities.abilityDesc}`,
            COMMAND_SHIPS_CODE_ABILITES_HEADER: ` * Faehigkeiten*\n`,
            COMMAND_SHIPS_CODE_ABILITIES: (abilityName, abilities) => `### ${abilityName} ###\nFaehigkeitstyp: ${abilities.type}   Faehigkeitsabklingzeit: ${abilities.abilityCooldown}\n${abilities.abilityDesc}\n\n`,
            COMMAND_SHIPS_HELP: {
                description: "Zeigt Infos zum ausgewaehlten Schiff.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'ship <Schiff|Pilot>',
                        args: {
                            "Schiff|Pilot": "Das Schiff oder der Pilot zu dem Informationen angezeigt werden sollen."
                        }
                    }
                ]
            },

            // Showconf Command
            COMMAND_SHOWCONF_OUTPUT: (configKeys, serverName) => `Dies ist die aktuelle Konfiguration für ${serverName}: \`\`\`${configKeys}\`\`\``,
            COMMAND_SHOWCONF_HELP: {
                description: "Zeigt die aktuelle Konfiguration fuer den Server an.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';showconf',
                        args: {}
                    }
                ]
            },

            // Stats Command
            COMMAND_STATS_OUTPUT: (memUsage, cpuLoad, uptime, users, servers, channels, shardID) => `= Statisken (${shardID}) =\n
• Speicherauslastung  :: ${memUsage} MB
• CPU Auslastung      :: ${cpuLoad}%
• Uptime              :: ${uptime}
• Anwender            :: ${users}
• Server              :: ${servers}
• Kanaele             :: ${channels}
• Quelle               :: https://github.com/jmiln/SWGoHBot`,
            COMMAND_STATS_HELP: {
                description: "Zeigt die Statistiken des Bots an.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';stats',
                        args: {}
                    }
                ]
            },

            COMMAND_TIME_CURRENT: (time, zone) => `Die aktuelle Uhrzeit ist: ${time} in der Zeitzone ${zone}`,
            COMMAND_TIME_INVALID_ZONE: (time, zone) => `Falsche Zeitzone, hier ist die Zeit Deiner Gilde ${time} in der Zeitzone ${zone}`,
            COMMAND_TIME_NO_ZONE: (time) => `Die aktuelle Uhrzeit ist: ${time} UTC Zeit`,
            COMMAND_TIME_WITH_ZONE: (time, zone) => `Die aktuelle Uhrzeit ist: ${time} in der Zeitzone ${zone}`,
            COMMAND_TIME_HELP: {
                description: "Pruefe die fuer die Gilde eingestellte Zeitzone.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';time [Zeitzone]',
                        args: {
                            "Zeitzone": "OPTIONAL wenn Du sehen moechtest, wie spaet es woanders ist."
                        }
                    }
                ]
            },

            COMMAND_UPDATECHAR_INVALID_OPT: (arg, usableArgs) => `${arg} ist kein gueltiges Argument. Probiere eines von diesen: ${usableArgs}`,
            COMMAND_UPDATECHAR_NEED_CHAR: `Es muss ein Charakter angegeben werden, um Ihn zu aktualisieren.`,
            COMMAND_UPDATECHAR_WRONG_CHAR: (charName) => `Die Suche nach '${charName}' ergab keine Treffer. Bitte erneut versuchen.`,
            COMMAND_UPDATECHAR_HELP: {
                description: "Aktualisiere die Infos zu einem spezifizierten Charakter.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';updatechar [Gear|Info|Mods] [Charakter]',
                        args: {
                            "Gear": "Aktualisiere die Infos zur Gear eines Charakters.",
                            "Info": "Aktualisiere die Infos zu einem Charakter (Link zum Bild, Faehigkeiten etc.)",
                            "Mods": "Aktualisiere die Mods von crouchingrancor.com"
                        }
                    }
                ]
            },
            // Zetas Command
            COMMAND_ZETA_NO_USER: `Entschuldigung, aber diesen User kann ich nicht finden.`,
            COMMAND_ZETA_NO_ZETAS: 'Keine Fähigkeiten mit Zeta gefunden.',
            COMMAND_ZETA_OUT_DESC: `\`${'-'.repeat(30)}\`\n\`[L]\` Anfuehrer | \`[S]\` Spezial | \`[U]\` Einzigartig\n\`${'-'.repeat(30)}\``,
            COMMAND_ZETAS_HELP: {
                description: "Zeigt die Faehigkeiten die mit Zeta hochgestuft  wurden.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';zeta [user]',
                        args: {
                            "user": "Die Person die du hinzufuegen moechtest. (me | userID | mention)"
                        }
                    }
                ]
            }
        };
    }       
};


