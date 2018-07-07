const Language = require('../base/Language');
const DAYSOFWEEK = {
    SUNDAY: {
        SHORT: 'Do',
        LONG: 'Domingo'
    },
    MONDAY: {
        SHORT: 'Lu',
        LONG: 'Lunes'
    },
    TUESDAY: {
        SHORT: 'Ma',
        LONG: 'Martes'
    },
    WEDNESDAY: {
        SHORT: 'Mi',
        LONG: 'Miércoles'
    },
    THURSDAY: {
        SHORT: 'Ju',
        LONG: 'Jueves'
    },
    FRIDAY: {
        SHORT: 'Vi',
        LONG: 'Viernes'
    },
    SATURDAY: {
        SHORT: 'Sa',
        LONG: 'Sábado'
    }
};
const TIMES = {
    DAY: {
        PLURAL: 'Días',
        SING: 'Día',
        SHORT_PLURAL: 'DS',
        SHORT_SING: 'D'
    },
    HOUR: {
        PLURAL: 'Horas',
        SING: 'Hora',
        SHORT_PLURAL: 'Hrs',
        SHORT_SING: 'Hr'
    },
    MINUTE: {
        PLURAL: 'Minutos',
        SING: 'minuto',
        SHORT_PLURAL: 'Mins',
        SHORT_SING: 'Min'
    },
    SECOND: {
        PLURAL: 'Segundos',
        SING: 'Segundo',
        SHORT_PLURAL: 'Segs',
        SHORT_SING: 'Seg'
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
            // Default in case it can't find one.
            BASE_DEFAULT_MISSING: '
Se está intentando utilizar una cadena inexistente. Si ves este mensaje, por favor reportarlo así podrá ser reparado.',

            // Base swgohBot.js file
            BASE_LAST_EVENT_NOTIFICATION: `\n\nEsta es la última instancia de este evento. Para continuar recibiendo este aviso, crea un nuevo evento.`,
            BASE_EVENT_STARTING_IN_MSG: (key, timeToGo) => `**${key}**\nEmpieza en ${timeToGo}`,

            // Base swgohAPI
            BASE_SWGOH_NO_ALLY: `Lo siento, pero este usuario no está registrado. Por favor regístrate con  \`;register add <user> <códigoaliado>\``,
            BASE_SWGOH_NOT_REG: (user) => `Lo siento, pero este usuario no está registrado. Por favor regístrate con \`;register add @${user} < códigoaliado>\``,
            BASE_SWGOH_NO_USER: `Lo siento, pero no tengo este usuario listado en ningún sitio.`,
            BASE_SWGOH_MISSING_CHAR: 'Necesitas introducir un personaje para comprobar',
            BASE_SWGOH_NO_CHAR_FOUND: (character) => `No encuentro ningún resultado para ${character}`,
            BASE_SWGOH_CHAR_LIST: (chars) => `Tu búsqueda ha obtenido demasiados resultados, por favor se mas especifico. \nAquí tienes una lista de las coincidencias más cercanas.\n\`\`\`${chars}\`\`\``,
            BASE_SWGOH_NO_ACCT: `Algo ha salido mal, por favor comprueba que tu cuenta se haya sincronizado correctamente.`,
            BASE_SWGOH_LAST_UPDATED: (date) => `Última actualización ${date} pasada`,
            BASE_SWGOH_PLS_WAIT_FETCH: (dType) => `Por favor espera mientras obtengo tu ${dType ? dType : 'data'}`,

            // Generic (Not tied to a command)
            COMMAND_EXTENDED_HELP: (command) => `**Ayuda extendida para ${command.help.name}** \n**Uso**: ${command.help.usage} \n${command.help.extended}`,
            COMMAND_INVALID_BOOL: `Valor invalido, prueba con true o false`,
            COMMAND_MISSING_PERMS: `Lo siento, pero no tienes los suficientes permisos para hacer esto.`,
            BASE_COMMAND_UNAVAILABLE: "Este comando no está disponible vía mensaje privado. Por favor, utiliza este comando en un gremio.",
            BASE_COMMAND_HELP_HEADER: (name) => `Ayuda para ${name}`,
            BASE_COMMAND_HELP_HEADER_CONT: (name) => `Ayuda continuada para ${name}`,
            BASE_COMMAND_HELP_HELP: (name) => {
                return {
                    action: "Ayuda",
                    actionDesc: "Muestra este mensaje",
                    usage: `;${name} help`,
                    args: {}
                };
            },
            BASE_MOD_TYPES: {
                SQUARE: 'Cuadrado',
                ARROW:   'Flecha',
                DIAMOND: 'Diamante',
                TRIANGLE: 'Triangulo',
                CIRCLE: 'Círculo',
                CROSS:   'Cruz',
                ACCURACY:   'Potencia',
                CRITCHANCE: 'Probabilidad de crítico',
                CRITDAMAGE: 'Daño crítico',
                DEFENSE:    'Defensa',
                HEALTH:     'Salud',
                OFFENSE:    'Ataque',
                POTENCY:    'Potencia',
                SPEED:      'Velocidad',
                TENACITY:   'Tenacidad'
            },

            // Abilities Command
            COMMAND_ABILITIES_NEED_CHARACTER: (prefix) => `Se necesita un personaje. Su uso es \`${prefix}abilities <NombrePersonaje>\``,
            COMMAND_ABILITIES_INVALID_CHARACTER: (prefix) => `Personaje inválido. Su uso es \`${prefix}abilities <NombrePersonaje>\``,
            COMMAND_ABILITIES_COOLDOWN: (aCooldown) => `**Tiempo de Refresco:** ${aCooldown}\n`,
            COMMAND_ABILITIES_ABILITY: (aType, mat, cdString, aDesc) => `**Tipo de habilidad:** ${aType}     **Material necesario para la habilidad máxima:**  ${mat}\n${cdString}${aDesc}`,
            COMMAND_ABILITIES_ABILITY_CODE: (abilityName, type, tier, aDesc) => `### ${abilityName} ###\n* Tipo de habilidad: ${type}\n* Material necesario para la habilidad máxima: ${tier}\n* Descripción: ${aDesc}\n\n`,
            COMMAND_ABILITIES_HELP: {
                description: "Muestra las habilidades del personaje especificado.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';abilities <Nombrepersonaje>',
                        args: {}
                    }
                ]
            },

            // Activities Command
            COMMAND_ACTIVITIES_SUNDAY: `== Antes del Refresco == \nCompletar las batallas de Arena \n Ahorrar Energía de la Cantina  \nAhorrar Energía Normal\n\n== Después del Refresco == \nGastar Energía de la Cantina \nAhorrar Energía Normal`,
            COMMAND_ACTIVITIES_MONDAY: `== Antes del Refresco == \nGastar Energía de la Cantina \nAhorrar Energía Normal \n\n== Después del Refresco == \nGastar Energía Normal en Batallas del Lado Luminoso`,
            COMMAND_ACTIVITIES_TUESDAY: `== Antes del Refresco == \nGastar energía normal en Batallas del Lado Luminoso \n Ahorrar Todo Tipo de Energía\n\n== Después del Refresco == \n Gastar Todo Tipo de Energía \n Ahorrar Energía Normal`,
            COMMAND_ACTIVITIES_WEDNESDAY: `== Antes del Refresco == \nGastar Todo Tipo de Energia \nAhorrar Energía Normal\n\n== Después del Refresco == \nGastar Energía Normal en Batallas Difíciles`,
            COMMAND_ACTIVITIES_THURSDAY: `== Antes del Refresco == \nGastar Energía Normal en Batallas Difíciles \nAhorrar Desafíos\n\n== Después del Refresco == \nCompletar los Desafíos \nAhorrar Energía Normal`,
            COMMAND_ACTIVITIES_FRIDAY: `== Antes del Refresco == \nCompletar los Desafíos \nAhorrar Energía Normal\n\n== Después del Refresco == \nGastar Energía Normal en Batallas del Lado Oscuro`,
            COMMAND_ACTIVITIES_SATURDAY: `== Antes del Refresco == \nGastar Energía Normal en Batallas del Lado Oscuro \nAhorrar Batallas de Arena \nAhorrar Energía de Cantina\n\n== Después del Reseteo == \nCompletar batallas de Arena \nAhorrar Energía de Cantina`,
            COMMAND_ACTIVITIES_ERROR: (prefix, usage) => `Día Invalido, su uso es \`${prefix}${usage}\``,
            COMMAND_ACTIVITIES_HELP: {
                description: "Muestra las actividades diarias del gremio.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';activities [DíaDeLaSemana]',
                        args: {}
                    }
                ]
            },

            // Arenarank Command
            COMMAND_ARENARANK_INVALID_NUMBER: `Necesitas introducir un número del ranking valido`,
            COMMAND_ARENARANK_BEST_RANK: `Ya has llegado lo más lejos que puedes posible, felicidades!`,
            COMMAND_ARENARANK_RANKLIST: (currentRank, battleCount, plural, est, rankList) => `Del Ranking ${currentRank}, in ${battleCount} battle${plural} ${est}\nEl mejor que puedes obtener es ${rankList}`,
            COMMAND_ARENARANK_HELP: {
                description: "Muestra el (aproximadamente) mejor rango que puedes obtener si ganas cada batalla de arena.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';arenarank <Rankingactual> [Contador Batallas]',
                        args: {}
                    }
                ]
            },

            // Challenges Command
            COMMAND_CHALLENGES_TRAINING: "Droides de entrenamiento",
            COMMAND_CHALLENGES_ABILITY : "Materiales de habilidad",
            COMMAND_CHALLENGES_BOUNTY  : "Cazar recompensas",
            COMMAND_CHALLENGES_AGILITY : "Equipo de Agi",
            COMMAND_CHALLENGES_STRENGTH: "Equipo de Fue",
            COMMAND_CHALLENGES_TACTICS : "Equipo de Tac",
            COMMAND_CHALLENGES_SHIP_ENHANCEMENT: "Droides de mejora de nave",
            COMMAND_CHALLENGES_SHIP_BUILDING   : "Materiales de construcción de nave",
            COMMAND_CHALLENGES_SHIP_ABILITY    : "Materiales de habilidad de nave",
            COMMAND_CHALLENGES_MISSING_DAY: 'Necesitas especificar un día',
            COMMAND_CHALLENGES_DEFAULT: (prefix, usage) => `Fecha invalida, su uso \`${prefix}${usage}\``,
            COMMAND_CHALLENGES_HELP: {
                description: "Muestra las actividades diarias del gremio.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';challenges <DíaDeLaSemana>',
                        args: {}
                    }
                ]
            },

            // Changelog Command (Help)
            COMMAND_CHANGELOG_HELP: {
                description: "Añade un cambio a la base de datos y lo envía al canal de registro de cambios.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'changelog <mensaje>',
                        args: {
                            "mensaje": "Utiliza [Updated], [Fixed], [Removed], y [Added] para organizar los cambios."
                        }
                    }
                ]
            },

            // Character gear Command
            COMMAND_CHARGEAR_NEED_CHARACTER: (prefix) => `Se necesita un personaje. Su uso es \`${prefix}charactergear <personaje> [NivelEstrella]\``,
            COMMAND_CHARGEAR_INVALID_CHARACTER: (prefix) => `Personaje invalido. Su uso es \`${prefix}charactergear <personaje> [NivelEstrella]\``,
            COMMAND_CHARGEAR_GEAR_ALL: (name, gearString) => ` * ${name} * \n### Gear necesario ### \n${gearString}`,
            COMMAND_CHARGEAR_GEAR_NA: 'Este gear aún no se ha establecido',
            COMMAND_CHARACTERGEAR_HELP: {
                description: "Muestra los requisitos de equipo para el personaje especifico/ lvl.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'charactergear <personaje> [EquipoLvl]',
                        args: {}
                    }
                ]
            },

            // Command Report Command
            COMMAND_COMMANDREPORT_HELP: ({
                description: "Muestra una lista de todos los comandos que has usado en los últimos 10 días.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';commandreport',
                        args: {}
                    }
                ]
            }),

            // Current Events Command
            COMMAND_CURRENTEVENTS_HEADER: "Eventos SWGOH Planificados",
            COMMAND_CURRENTEVENTS_DESC: (num) => `Siguientes ${num} eventos.\nNota: *Las Fechas están sujetas a cambios.*`,
            COMMAND_CURRENTEVENTS_HELP: {
                description: "Muestra cualquier próximo evento.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';currentevents [num]',
                        args: {
                            "num": "El número máximo de eventos que quieres que te muestre"
                        }
                    }
                ]
            },

            // Event Command (Create)
            COMMAND_EVENT_INVALID_ACTION: (actions) => `Las acciones validas són \`${actions}\`.`,
            COMMAND_EVENT_INVALID_PERMS: `Lo siento, pero tal vez no eres administrador, o el líder de tu servidor no ha establecido bien la configuración. \nNo puedes añadir o eliminar un evento a no ser que tengas configurado el rol de administrador.`,
            COMMAND_EVENT_ONE_REPEAT: 'Lo siento, pero no puedes usar ambos `repeat` and `repeatDay` en un mismo evento. Por favor selecciona una u otra opción',
            COMMAND_EVENT_INVALID_REPEAT: `La repetición está en un formato erróneo. Ejemplo: \`5d3h8m\` para 5 días, 3 horas y 8 minutos`,
            COMMAND_EVENT_USE_COMMAS: `Por favor, usa una coma separada de los números para el repeatDay. Ejemplo: \`1,2,1,3,4\``,
            COMMAND_EVENT_INVALID_CHAN: `Este canal es invalido, por favor prueba de nuevo`,
            COMMAND_EVENT_CHANNEL_NO_PERM: (channel) => `No tengo permisos para enviar mensajes en ${channel}, por favor selecciona uno donde pueda`,
            COMMAND_EVENT_NEED_CHAN: `ERROR: Necesito configurar un canal donde poder enviar-lo. Configura \`announceChan\` para ser capaz de crear eventos.`,
            COMMAND_EVENT_NEED_NAME: `Debes de dar un nombre a tu evento.`,
            COMMAND_EVENT_EVENT_EXISTS: `El nombre de este evento ya existe. No se puede añadir de nuevo.`,
            COMMAND_EVENT_NEED_DATE: `Debes dar una fecha para tu evento. El formato Aceptado es \`DD/MM/YYYY\`.`,
            COMMAND_EVENT_BAD_DATE: (badDate) => `${badDate} no es una fecha valida. El formato Aceptado es \`DD/MM/YYYY\`.`,
            COMMAND_EVENT_NEED_TIME: `Debes dar un tiempo a tu evento.`,
            COMMAND_EVEMT_INVALID_TIME: `Debes dar un tiempo correcto para tu evento. El formato Aceptado es \`HH:MM\`, using a 24 hour clock. So no AM or PM`,
            COMMAND_EVENT_PAST_DATE: (eventDATE, nowDATE) => `No puedes establecer un evento en el pasado. ${eventDATE} es anterior ${nowDATE}`,
            COMMAND_EVENT_CREATED: (eventName, eventDate) => `Evento \`${eventName}\` creado para ${eventDate}`,
            COMMAND_EVENT_NO_CREATE: `No he podido establecer este evento, por favor prueba de nuevo.`,
            COMMAND_EVENT_TOO_BIG:(charCount) => `Lo siento, pero el nombre o mensaje de tu evento es demasiado largo. Por favor recórtalo al menos hasta ${charCount} caracteres.`,

            // Event Command (View)
            COMMAND_EVENT_TIME: (eventName, eventDate) => `**${eventName}** \Tiempo del Evento: ${eventDate}\n`,
            COMMAND_EVENT_TIME_LEFT: (timeLeft) => `Tiempo Restante: ${timeLeft}\n`,
            COMMAND_EVENT_CHAN: (eventChan) => `Enviándolo al canal: ${eventChan}\n`,
            COMMAND_EVENT_SCHEDULE: (repeatDays) => `Repetir horario: ${repeatDays}\n`,
            COMMAND_EVENT_REPEAT: (eventDays, eventHours, eventMins) => `Repitiendo cada ${eventDays} días, ${eventHours} horas y ${eventMins} minutos\n`,
            COMMAND_EVENT_MESSAGE: (eventMsg) => `Mensaje Evento: \n\`\`\`md\n${eventMsg}\`\`\``,
            COMMAND_EVENT_UNFOUND_EVENT: (eventName) => `Lo siento, pero no he podido encontrar el evento \`${eventName}\``,
            COMMAND_EVENT_NO_EVENT: `Actualmente no tienes ningún evento programado.`,
            COMMAND_EVENT_SHOW_PAGED: (eventCount, PAGE_SELECTED, PAGES_NEEDED, eventKeys) => `Aquí tienes el Evento Programado de tu servidor \n(${eventCount} eventos totales${eventCount > 1 ? 's' : ''}) Mostrando página ${PAGE_SELECTED}/${PAGES_NEEDED}: \n${eventKeys}`,
            COMMAND_EVENT_SHOW: (eventCount, eventKeys) => `Aquí esta el evento programado de tu servidor \n(${eventCount} eventos totales${eventCount > 1 ? 's' : ''}): \n${eventKeys}`,

            // Event Command (Delete)
            COMMAND_EVENT_DELETE_NEED_NAME: `Debes de dar un nombre al evento a eliminar.`,
            COMMAND_EVENT_DOES_NOT_EXIST: `Este evento no existe.`,
            COMMAND_EVENT_DELETED: (eventName) => `Evento eliminado: ${eventName}`,

            // Event Command (Trigger)
            COMMAND_EVENT_TRIGGER_NEED_NAME: ` Debes  indicar el nombre del evento para iniciarlo.`,

            // Event Command (Help)
            COMMAND_EVENT_HELP: {
                description: "Se usa para crear, comprobar o eliminar un evento.",
                actions: [
                    {
                        action: "Create",
                        actionDesc: 'Crear una nueva lista del evento',
                        usage: ';event create <eventName> <eventDay> <eventTime> [eventMessage]',
                        args: {
                            "--repeat <repeatTime>": "Te permite establecer una duración con el formato 00d00h00m. Se repetirá después de que el tiempo haya pasado.",
                            "--repeatDay <schedule>": "Te permite establecer una repetición en los días con el formato 0,0,0,0,0.",
                            "--channel <channelName>": "Te permite especificar un canal para el evento donde anunciarse.",
                            "--countdown": "Añade un contador cuando tu evento se va a iniciar."
                        }
                    },
                    {
                        action: "View",
                        actionDesc: 'Ver tu lista actual de eventos.',
                        usage: ';event view [eventName]',
                        args: {
                            "--min": "Te permite ver los eventos sin el mensaje de un evento.",
                            "--page <page#>": "Te permite seleccionar una página donde ver los eventos"
                        }
                    },
                    {
                        action: "Delete",
                        actionDesc: 'Eliminar un evento.',
                        usage: ';Eliminación de un evento <eventName>',
                        args: {}
                    },
                    {
                        action: "Trigger",
                        actionDesc: 'Inicia un evento en el canal especificado y deja el otro evento solo.',
                        usage: ';event trigger <eventName>',
                        args: {}
                    }
                ]
            },

            // Faction Command
            COMMAND_FACTION_INVALID_CHAR: (prefix) => `Facción invalida, su uso es \`${prefix}faction <faction>\``,
            COMMAND_FACTION_CODE_OUT: (searchName, charString) => `# caracteres en la ${searchName} facción# \n${charString}`,
            COMMAND_FACTION_HELP: {
                description: "Muestra la lista de personajes en una especificada facción.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'faction <faction>',
                        args: {
                            "faction": "La facción de la cual quieres ver la lista. \nTen en mente, esto es como se muestra en el juego, así que es rebel no rebeldes"
                        }
                    }
                ]
            },

            // Guilds Command
            COMMAND_GUILDS_MORE_INFO: 'Para más información de un Gremio específico:',
            COMMAND_GUILDS_HELP: {
                description: "Muestra los Gremios más TOPS y todas las personas que están registradas en el tuyo.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';guild [user]',
                        args: {
                            "user": "La manera de identificar un gremio. (mention | allyCode | guildName)"
                        }
                    }
                ]
            },

            // GuildSearch Command
            COMMAND_GUILDSEARCH_BAD_STAR: 'Solo puedes seleccionar una estrella del nivel 1 al 7',
            COMMAND_GUILDSEARCH_MISSING_CHAR: 'Necesitas introducir un personaje para la busqueda',
            COMMAND_GUILDSEARCH_NO_RESULTS: (character) => `No he encontrado ningún resultado de ${character}`,
            COMMAND_GUILDSEARCH_CHAR_LIST: (chars) => `La búsqueda se ha encontrado con demasiados resultados, por favor se más especifico. \nAquí tienes una lista de las coincidencias más cercanas.\n\`\`\`${chars}\`\`\``,
            COMMAND_GUILDSEARCH_FIELD_HEADER: (tier, num, setNum='') => `${tier} Estrella (${num}) ${setNum.length > 0 ? setNum : ''}`,
            COMMAND_GUILDSEARCH_NO_CHAR_STAR: (starLvl) => `Parece que nadie de tu gremio tiene un personaje con ${starLvl} estrellas.`,
            COMMAND_GUILDSEARCH_NO_CHAR: `Nadie de tu gremio parece tener este personaje.`,
            COMMAND_GUILDSEARCH_HELP: {
                description: "Muestra el nivel de estrellas del personaje seleccionado de todas las personas del gremio.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';guildsearch [user] <character> [-ships] [starLvl]',
                        args: {
                            "user": "La persona la cual estas añadiendo. (me | userID | mention)",
                            "character": "El personaje el cual quieres realizar la busqueda.",
                            "-ships": "Busqueda de naves, puedes usar `-s, -ship, or -ships`",
                            "starLvl": "Selecciona el nivel de estrella que quieres ver."
                        }
                    }
                ]
            },

            // Heists Command
            COMMAND_HEISTS_HEADER: "SWGOH Robo de Créditos Programado",
            COMMAND_HEISTS_CREDIT: (date) => `**Créditos** : ${date}\n`,
            COMMAND_HEISTS_DROID: (date) => `**Droides**  : ${date}\n`,
            COMMAND_HEISTS_NOT_SCHEDULED: "`No Programado`",
            COMMAND_HEISTS_HELP: {
                description: "Muestra los próximos Desafíos de Robos.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';heists',
                        args: {}
                    }
                ]
            },


            // Help Command
            COMMAND_HELP_HEADER: (prefix) => `= ListaComando =\n\n[Use ${prefix}help <ListaComando> para detalles]\n`,
            COMMAND_HELP_OUTPUT: (command, prefix) => `= ${command.help.name} = \n${command.help.description} \nAliases:: ${command.conf.aliases.join(", ")}\nUso:: ${prefix}${command.help.usage}`,
            COMMAND_HELP_HELP: {
                description: "Muestra la información sobre los comandos disponibles.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';help [Comando]',
                        args: {
                            "Comando": "El comando el cual quieres saber información."
                        }
                    }
                ]
            },

            // Info Command
            COMMAND_INFO_OUTPUT: (guilds) => ({
                "header": 'INFORMATION',
                "desc": ` \nActualmente en proceso en **${guilds}** servidores \n`,
                "links": {
                    "Invite me": "Invita al bot http://swgohbot.com/invite",
                    "Support Server": "Si tienes alguna pregunta, quieres ayudar, o simplemente unirte, el soporte del bot eshttps://discord.gg/FfwGvhr",
                    "Support the Bot": "El código del bot está en github https://github.com/jmiln/SWGoHBot y está abierto a contribuciones. \n\nI también tiene un patrocinador https://www.patreon.com/swgohbot por si estás interesado."
                }
            }),
            COMMAND_INFO_HELP: {
                description: "Muestra links útiles pertinentes del bot.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'info',
                        args: {}
                    }
                ]
            },

            COMMAND_MODS_CRIT_CHANCE_SET: "Prob. Crítico x2",
            COMMAND_MODS_CRIT_DAMAGE_SET: "Daño. Crítico x4",
            COMMAND_MODS_SPEED_SET: "Velocidad x4",
            COMMAND_MODS_TENACITY_SET: "Tenacidad x2",
            COMMAND_MODS_OFFENSE_SET: "Ataque x4",
            COMMAND_MODS_POTENCY_SET: "Potencia x2",
            COMMAND_MODS_HEALTH_SET: "Salud x2",
            COMMAND_MODS_DEFENSE_SET: "Defensa x2",
            COMMAND_MODS_EMPTY_SET: " ",

            COMMAND_MODS_ACCURACY_STAT: "Evasión. Crítico",
            COMMAND_MODS_CRIT_CHANCE_STAT: "Prob. Crítico",
            COMMAND_MODS_CRIT_DAMAGE_STAT: "Daño. Crítico",
            COMMAND_MODS_DEFENSE_STAT: "Defensa",
            COMMAND_MODS_HEALTH_STAT: "Salud",
            COMMAND_MODS_OFFENSE_STAT: "Ataque",
            COMMAND_MODS_PROTECTION_STAT: "Protección",
            COMMAND_MODS_POTENCY_STAT: "Potencia",
            COMMAND_MODS_SPEED_STAT: "Velocidad",
            COMMAND_MODS_TENACITY_STAT: "Tenacidad",
            COMMAND_MODS_UNKNOWN: "Desconocido",

            // Mods Command
            COMMAND_MODS_NEED_CHARACTER: (prefix) => `Se necesita un personaje. Su uso es \`${prefix}mods <characterName>\``,
            COMMAND_MODS_INVALID_CHARACTER: (prefix) => `Personaje inválido. Su uso es \`${prefix}mods <characterName>\``,
            COMMAND_MODS_EMBED_STRING1: (square, arrow, diamond) => `\`Cuadrado:   ${square}\`\n\`Flecha:    ${arrow}\`\n\`Diamante:  ${diamond}\`\n`,
            COMMAND_MODS_EMBED_STRING2: (triangle, circle, cross) => `\`Triangulo: ${triangle}\`\n\`Circulo:   ${circle}\`\n\`Cruz:    ${cross}\`\n`,
            COMMAND_MODS_EMBED_OUTPUT: (modSetString, modPrimaryString) => `**### Sets ###**\n${modSetString}\n**### Primarios ###**\n${modPrimaryString}`,
            COMMAND_MODS_CODE_STRING1: (square, arrow, diamond) => `* Cuadrado:   ${square}  \n* Flecha:    ${arrow} \n* Diamante:  ${diamond}\n`,
            COMMAND_MODS_CODE_STRING2: (triangle, circle, cross) => `* Triangulo: ${triangle}\n* Circlulo:   ${circle}\n* Cruz:    ${cross}`,
            COMMAND_MODS_CODE_OUTPUT: (charName, modSetString, modPrimaryString) => ` * ${charName} * \n### Sets ### \n${modSetString}\n### Primarios ###\n${modPrimaryString}`,
            COMMAND_NO_MODSETS: "No hay mods establecidos en este personaje",
            COMMAND_MODS_HELP: {
                description: "Muestra los mods sugeridos para el personaje especificado.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'mods <character>',
                        args: {
                            "character": "El personaje el cual quieres mostrar sus mods"
                        }
                    }
                ]
            },

            // Modsets command
            COMMAND_MODSETS_OUTPUT: `* Prob. Crítico:  2\n* Daño. Crítico:  4\n* Defensa:  2\n* Salud:   2\n* Ataque:  4\n* Potencia:  2\n* Velocidad:    4\n* Tenacidad: 2`,
            COMMAND_MODSETS_HELP: {
                description: "Muestra cuantos mods de cada tipo necesitas para un Set.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'modsets',
                        args: {}
                    }
                ]
            },
            // MyArena Command
            COMMAND_MYARENA_NO_USER: (user) => `Sorry, but I can't find any arena data for ${user}. Please make sure that account is synced`,
            COMMAND_MYARENA_NO_CHAR: 'Something went wrong, I could not get your characters.',
            COMMAND_MYARENA_ARENA: (rank) => `Char Arena (Rank: ${rank})`,
            COMMAND_MYARENA_FLEET: (rank) => `Ship Arena (Rank: ${rank})`,
            COMMAND_MYARENA_EMBED_HEADER: (playerName) => `${playerName}'s Arena`,
            COMMAND_MYARENA_EMBED_FOOTER: (date) => `Arena data as of: ${date}`,
            COMMAND_MYARENA_HELP: {
                description: "Show user's current arena ranks and their squads.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';myarena [user]',
                        args: {
                            "user": "The person you're checking. (me | userID | mention)"
                        }
                    }
                ]
            },

            // MyCharacter Command
            COMMAND_MYCHARACTER_HELP: ({
                description: "Shows the general stats about the selected character.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';mycharacter [user] <character>',
                        args: {
                            "user": "The person you're checking. (me | userID | mention)",
                            "character": "The character you want to search for."
                        }
                    }
                ]
            }),

            // MyMods Command
            COMMAND_MYMODS_NO_MODS: (charName) => `Sorry, but I couldn't find any mods for your ${charName}`,
            COMMAND_MYMODS_MISSING_MODS: `Sorry, but I can't find your mods right now. Please wait a bit then try again.`,
            COMMAND_MYMODS_LAST_UPDATED: (lastUpdated) => `Mods last updated: ${lastUpdated} ago`,
            COMMAND_MYMODS_HELP: ({
                description: "Shows the mods that you have equipped on the selected character.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';mymods [user] <character>',
                        args: {
                            "user": "The person you're checking. (me | userID | mention)",
                            "character": "The character you want to search for."
                        }
                    }
                ]
            }),

            // MyProfile Command
            COMMAND_MYPROFILE_NO_USER: (user) => `Sorry, but I can't find any arena data for ${user}. Please make sure that account is synced`,
            COMMAND_MYPROFILE_EMBED_HEADER: (playerName, allyCode) => `${playerName}'s profile (${allyCode})`,
            COMMAND_MYPROFILE_EMBED_FOOTER: (date) => `Arena data as of: ${date}`,
            COMMAND_MYPROFILE_DESC: (guildName, level, charRank, shipRank) => `**Guild:** ${guildName}\n**Level:** ${level}\n**Arena rank:** ${charRank}\n**Ship rank:** ${shipRank}`,
            COMMAND_MYPROFILE_CHARS: (gpChar, charList, zetaCount) => ({
                header: `Characters (${charList.length})`,
                stats: [
                    `Char GP  :: ${gpChar}`,
                    `7 Star   :: ${charList.filter(c => c.rarity === 7).length}`,
                    `lvl 85   :: ${charList.filter(c => c.level === 85).length}`,
                    `Gear 12  :: ${charList.filter(c => c.gear === 12).length}`,
                    `Gear 11  :: ${charList.filter(c => c.gear === 11).length}`,
                    `Zetas    :: ${zetaCount}`
                ].join('\n')
            }),
            COMMAND_MYPROFILE_SHIPS: (gpShip, shipList) => ({
                header: `Ships (${shipList.length})`,
                stats: [
                    `Ship GP :: ${gpShip}`,
                    `7 Star  :: ${shipList.filter(s => s.rarity === 7).length}`,
                    `lvl 85  :: ${shipList.filter(s => s.level === 85).length}`
                ].join('\n')
            }),
            COMMAND_MYPROFILE_HELP: {
                description: "Show user's general stats.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';myprofile [user]',
                        args: {
                            "user": "The person you're checking. (me | userID | mention)"
                        }
                    }
                ]
            },

            // Nickname Command
            COMMAND_NICKNAME_SUCCESS: `I have changed my nickname.`,
            COMMAND_NICKNAME_FAILURE: `Sorry, but I don't have permission to change that.`,
            COMMAND_NICKNAME_TOO_LONG: 'Sorry, but a name can only contain up to 32 characters.',
            COMMAND_NICKNAME_HELP: {
                description: "Changes the bot's nickname on the server.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';nickname <name>',
                        args: {
                            "name": "The name you're wanting to change it to. Leave it blank to reset it to default."
                        }
                    }
                ]
            },

            // Polls Command
            COMMAND_POLL_NO_ARG: 'You need to provide either an option to vote on, or an action (create/view/etc).',
            COMMAND_POLL_ALREADY_RUNNING: "Sorry, but you can only run one poll at a time. Please end the current one first.",
            COMMAND_POLL_MISSING_QUESTION: "You need to specify something to vote on.",
            COMMAND_POLL_TOO_FEW_OPT: "You need to have at least 2 options to vote on.",
            COMMAND_POLL_TOO_MANY_OPT: "You can only have up to 10 options to vote on.",
            COMMAND_POLL_CREATED: (name, prefix, poll) => `**${name}** has started a new poll:\nVote with \`${prefix}poll <choice>\`\n\n${poll}`,
            COMMAND_POLL_NO_POLL: "There is no poll in progress",
            COMMAND_POLL_FINAL: (poll) => `Final results for ${poll}`,
            COMMAND_POLL_FINAL_ERROR: (question) => `I couldn't delete **${question}**, please try again.`,
            COMMAND_POLL_INVALID_OPTION: "That is not a valid option.",
            COMMAND_POLL_SAME_OPT: (opt) => `You have already chosen **${opt}**`,
            COMMAND_POLL_CHANGED_OPT: (oldOpt, newOpt) => `You have changed your choice from **${oldOpt}** to **${newOpt}**`,
            COMMAND_POLL_REGISTERED: (opt) => `Choice for **${opt}** registered`,
            COMMAND_POLL_CHOICE: (opt, optCount, choice) => `\`[${opt}]\` ${choice}: **${optCount} vote${optCount === 1 ? '' : 's'}**\n`,
            COMMAND_POLL_HELP: {
                description: "Lets you start a poll with multiple options.",
                actions: [
                    {
                        action: "Create",
                        actionDesc: 'Create a new poll',
                        usage: ';poll create <question> | <opt1> | <opt2> | [...] | [opt10]',
                        args: {
                            "question": "The question that you're wanting feedback on.",
                            "opt": "The options that people can choose from"
                        }
                    },
                    {
                        action: "Vote",
                        actionDesc: 'Vote on the option that you choose',
                        usage: ';poll <choice>',
                        args: {
                            "choice": "The option that you choose."
                        }
                    },
                    {
                        action: "View",
                        actionDesc: 'See what the current tally of votes is.',
                        usage: ';poll view',
                        args: {}
                    },
                    {
                        action: "Close",
                        actionDesc: 'End the poll and show the final tally.',
                        usage: ';poll close',
                        args: {}
                    }
                ]
            },

            // Raidteams Command
            COMMAND_RAIDTEAMS_INVALID_RAID: (prefix) => `Invalid raid, usage is \`${prefix} <raid> <phase>\`\n**Example:** \`${prefix}raidteams pit p3\``,
            COMMAND_RAIDTEAMS_INVALID_PHASE: (prefix) => `Invalid phase, usage is \`${prefix}raidteams <raid> <phase>\`\n**Example:** \`${prefix}raidteams pit p3\``,
            COMMAND_RAIDTEAMS_PHASE_SOLO: 'Solo',
            COMMAND_RAIDTEAMS_PHASE_ONE: 'Phase 1',
            COMMAND_RAIDTEAMS_PHASE_TWO: 'Phase 2',
            COMMAND_RAIDTEAMS_PHASE_THREE: 'Phase 3',
            COMMAND_RAIDTEAMS_PHASE_FOUR: 'Phase 4',
            COMMAND_RAIDTEAMS_CHARLIST: (charList) => `**Characters:** \`${charList}\``,
            COMMAND_RAIDTEAMS_SHOWING: (currentPhase) => `Showing teams for ${currentPhase}`,
            COMMAND_RAIDTEAMS_NO_TEAMS: (currentPhase) => `Cannot find any teams under \`${currentPhase}\``,
            COMMAND_RAIDTEAMS_CODE_TEAMS: (raidName, currentPhase) => ` * ${raidName} * \n\n* Showing teams for ${currentPhase}\n\n`,
            COMMAND_RAIDTEAMS_CODE_TEAMCHARS: (raidTeam, charList) => `### ${raidTeam} ### \n* Characters: ${charList}\n`,
            COMMAND_RAIDTEAMS_HELP: {
                description: "Shows some teams that work well for each raid.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';raidteams <raid> <phase>',
                        args: {
                            "raid": "The raid that you want to see teams for. (aat|pit|sith)",
                            "phase": "The phase of the raid you want to see. (p1|p2|p3|p4|solo)"
                        }
                    }
                ]
            },

            // Randomchar Command
            COMMAND_RANDOMCHAR_INVALID_NUM: (maxChar) => `Sorry, but you need a number from 1-${maxChar} there.`,
            COMMAND_RANDOMCHAR_HELP: {
                description: "Picks up to 5 random characters to form a squad.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';randomchar [numberOfChars]',
                        args: {
                            "numberOfChars": "The number of characters that you want chosen"
                        }
                    }
                ]
            },

            // Register Command
            COMMAND_REGISTER_MISSING_ARGS: 'You need to supply a userID (mention or ID), and an ally code',
            COMMAND_REGISTER_MISSING_ALLY: 'You need to enter an ally code to link your account to.',
            COMMAND_REGISTER_INVALID_ALLY: (allyCode) => `Sorry, but ${allyCode} is not a valid ally code`,
            COMMAND_REGISTER_PLEASE_WAIT: 'Please wait while I sync your data.',
            COMMAND_REGISTER_FAILURE: 'Registration failed, please make sure your ally code is correct.',
            COMMAND_REGISTER_SUCCESS: (user) => `Registration for \`${user}\` successful!`,
            COMMAND_REGISTER_UPDATE_FAILURE: 'Something went wrong, make sure your registered ally code is correct',
            COMMAND_REGISTER_UPDATE_SUCCESS: (user) => `Profile updated for \`${user}\`.`,
            COMMAND_REGISTER_GUPDATE_SUCCESS: (guild) => `Guild updated for \`${guild}\`.`,
            COMMAND_REGISTER_HELP: {
                description: "Register your ally code to your Discord ID, and sync your SWGoH profile.",
                actions: [
                    {
                        action: "Add",
                        actionDesc: 'Link your Discord profile to a SWGoH account',
                        usage: ';register add <user> <allyCode>',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)",
                            "allyCode": "Your ally code from in-game."
                        }
                    },
                    {
                        action: "Update",
                        actionDesc: 'Update/ resync your SWGoH data.',
                        usage: ';register update <user> [-guild]',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)",
                            "-guild": "Tell it to pull/ update your whole guild (-g | -guild | -guilds)"
                        }
                    },
                    {
                        action: "Remove",
                        actionDesc: 'Unlink your Discord profile from a SWGoH account',
                        usage: ';register remove <user>',
                        args: {
                            "user": "You, this is to unlink it if you have the wrong ally code. (me | userID | mention)"
                        }
                    }
                ]
            },



            // Reload Command
            COMMAND_RELOAD_INVALID_CMD: (cmd) => `I cannot find the command: ${cmd}`,
            COMMAND_RELOAD_SUCCESS: (cmd) => `Successfully reloaded: ${cmd}`,
            COMMAND_RELOAD_FAILURE: (cmd, stackTrace) => `Command reload failed: ${cmd}\n\`\`\`${stackTrace}\`\`\``,
            COMMAND_RELOAD_HELP: {
                description: "Reloads the command file, if it's been updated or modified.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';reload <command>',
                        args: {
                            "command": "The command you're wanting to reload."
                        }
                    }
                ]
            },

            // Reload Data Command
            COMMAND_RELOADDATA_HELP: {
                description: "Reloads the selected file(s).",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';reloaddata <option>',
                        args: {
                            "option": "What you're wanting to reload ( commands | data | events | function )."
                        }
                    }
                ]
            },

            // Setconf Command
            COMMAND_SETCONF_MISSING_PERMS: `Sorry, but either you're not an admin, or your server leader has not set up the configs.`,
            COMMAND_SETCONF_MISSING_OPTION: `You must select a config option to change.`,
            COMMAND_SETCONF_MISSING_VALUE: `You must give a value to change that option to.`,
            COMMAND_SETCONF_ARRAY_MISSING_OPT: 'You must use `add` or `remove`.',
            COMMAND_SETCONF_ARRAY_NOT_IN_CONFIG: (key, value) => `Sorry, but \`${value}\` is not set in \`${key}\`.`,
            COMMAND_SETCONF_ARRAY_SUCCESS: (key, value, action) => `\`${value}\` has been ${action} your \`${key}\`.`,
            COMMAND_SETCONF_NO_KEY: (prefix) => `This key is not in the configuration. Look in "${prefix}showconf", or "${prefix}setconf help" for a list`,
            COMMAND_SETCONF_UPDATE_SUCCESS: (key, value) => `Guild configuration item ${key} has been changed to:\n\`${value}\``,
            COMMAND_SETCONF_NO_SETTINGS: `No guild settings found.`,

            COMMAND_SETCONF_ADMINROLE_NEED_ROLE: (opt) => `You must specify a role to ${opt}.`,
            COMMAND_SETCONF_ADMINROLE_MISSING_ROLE: (roleName) => `Sorry, but I cannot find the role ${roleName}. Please try again.`,
            COMMAND_SETCONF_ADMINROLE_ROLE_EXISTS: (roleName) => `Sorry, but ${roleName} is already there.`,
            COMMAND_SETCONF_PREFIX_TOO_LONG: 'Sorry, but you cannot have spaces in your prefix',
            COMMAND_SETCONF_WELCOME_NEED_CHAN: `Sorry, but but your announcement channel either isn't set or is no longer valid.\nGo set \`announceChan\` to a valid channel and try again.\``,
            COMMAND_SETCONF_TIMEZONE_NEED_ZONE: `Invalid timezone, look here https://en.wikipedia.org/wiki/List_of_tz_database_time_zones \nand find the one that you need, then enter what it says in the TZ column`,
            COMMAND_SETCONF_ANNOUNCECHAN_NEED_CHAN: (chanName) => `Sorry, but I cannot find the channel ${chanName}. Please try again.`,
            COMMAND_SETCONF_ANNOUNCECHAN_NO_PERMS: `Sorry, but I don't have permission to send message there. Please either change the perms, or choose another channel.`,
            COMMAND_SETCONF_INVALID_LANG: (value, langList) => `Sorry, but ${value} is not a currently supported language. \nCurrently supported languages are: \`${langList}\``,
            COMMAND_SETCONF_RESET: `Your config has been reset`,
            COMMAND_SETCONF_HELP: {
                description: "Used to set the bot's config settings.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';setconf <key> <value>',
                        args: {}
                    },
                    {
                        action: "prefix",
                        actionDesc: 'Set the bot\'s prefix for your server.',
                        usage: ';setconf prefix <prefix>',
                        args: {}
                    },
                    {
                        action: "adminRole",
                        actionDesc: 'The role that you want to be able to modify bot settings or set up events',
                        usage: ';setconf adminRole <add|remove> <role>',
                        args: {
                            'add':  'Add a role to the list',
                            'remove': 'Remove a role from the list'
                        }
                    },
                    {
                        action: "enableWelcome",
                        actionDesc: 'Toggles the welcome message on/ off.',
                        usage: ';setconf enableWelcome <true|false>',
                        args: {}
                    },
                    {
                        action: "welcomeMessage",
                        actionDesc: 'The welcome message to send if you have it enabled (Special variables below)',
                        usage: ';setconf welcomeMessage <message>',
                        args: {
                            '{{user}}':  "gets replaced with the new user's name.",
                            '{{userMention}}': "makes it mention the new user there."
                        }
                    },
                    {
                        action: "enablePart",
                        actionDesc: 'Toggles the parting message on/ off.',
                        usage: ';setconf enablePart <true|false>',
                        args: {}
                    },
                    {
                        action: "partMessage",
                        actionDesc: 'The part message to send if you have it enabled (Special variables below)',
                        usage: ';setconf partMessage <message>',
                        args: {
                            '{{user}}':  "gets replaced with the new user's name.",
                        }
                    },
                    {
                        action: "useEmbeds",
                        actionDesc: 'Toggles whether or not to use embeds as the output for some commands.',
                        usage: ';setconf useEmbeds <true|false>',
                        args: {}
                    },
                    {
                        action: "timezone",
                        actionDesc: 'Sets the timezone that you want all time related commands to use. Look here if you need a list https://goo.gl/Vqwe49.',
                        usage: ';setconf timezone <timezone>',
                        args: {}
                    },
                    {
                        action: "announceChan",
                        actionDesc: 'Sets the name of your announcements channel for events etc. Make sure it has permission to send them there.',
                        usage: ';setconf announceChan <channelName>',
                        args: {}
                    },
                    {
                        action: "useEventPages",
                        actionDesc: 'Sets it so event view shows in pages, rather than super spammy.',
                        usage: ';setconf useEventPages <true|false>',
                        args: {}
                    },
                    {
                        action: "eventCountdown",
                        actionDesc: 'The time that you want a countdown message to appear',
                        usage: ';setconf eventCountdown <add|remove> <time>',
                        args: {
                            'add':  'Add a time to the list',
                            'remove': 'Remove a time from the list'
                        }
                    },
                    {
                        action: "language",
                        actionDesc: 'Set the bot to use any supported language for the command output.',
                        usage: ';setconf language <lang>',
                        args: {}
                    },
                    {
                        action: "swgohLanguage",
                        actionDesc: 'Sets the bot to use any supported language for the game data output.',
                        usage: ';setconf swgohLanguage <lang>',
                        args: {}
                    },
                    // {
                    //     action: "reset",
                    //     actionDesc: 'Resets the config back to default (ONLY use this if you are sure)',
                    //     usage: ';setconf reset',
                    //     args: {}
                    // }
                ]
            },

            // Shard times command
            COMMAND_SHARDTIMES_MISSING_USER: `I need a user, please enter "me", mention someone here, or input their Discord ID.`,
            COMMAND_SHARDTIMES_MISSING_ROLE: `Sorry, but you can only add yourself unless you have an admin role.`,
            COMMAND_SHARDTIMES_INVALID_USER: `Invalid user, please enter "me", mention someone here, or input their discord ID.`,
            COMMAND_SHARDTIMES_MISSING_TIMEZONE: `You need to enter a timezone.`,
            COMMAND_SHARDTIMES_INVALID_TIMEZONE: `Invalid timezone, look here https://en.wikipedia.org/wiki/List_of_tz_database_time_zones \nand find the one that you need, then enter what it says in the TZ column`,
            COMMAND_SHARDTIMES_USER_ADDED: `User successfully added!`,
            COMMAND_SHARDTIMES_USER_NOT_ADDED: `Something went wrong when with adding this user. Please try again.`,
            COMMAND_SHARDTIMES_REM_MISSING_PERMS: `Sorry, but you can only remove yourself unless you have an admin role.`,
            COMMAND_SHARDTIMES_REM_SUCCESS: `User successfully removed!`,
            COMMAND_SHARDTIMES_REM_FAIL: `Something went wrong when removing this user. Please try again.`,
            COMMAND_SHARDTIMES_REM_MISSING: `Sorry, but that user does not seem to be here.`,
            COMMAND_SHARDTIMES_SHARD_HEADER: `Shard payouts in:`,
            COMMAND_SHARDTIMES_HELP: {
                description: "Lists the time until the payouts of anyone registered.",
                actions: [
                    {
                        action: "Add",
                        actionDesc: 'Add a user to the shard tracker',
                        usage: ';shardtimes add <user> <timezone> [flag/emoji]',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)",
                            "timezone": "The zone that your account is based in",
                            "flag/emoji": "An optional emoji if you want it to show by your name"
                        }
                    },
                    {
                        action: "Remove",
                        actionDesc: 'Remove a user from the tracker',
                        usage: ';shardtimes remove <user>',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)"
                        }
                    },
                    {
                        action: "View",
                        actionDesc: 'Look at all the tracked times for you and your shardmates',
                        usage: ';shardtimes view',
                        args: {}
                    }
                ]
            },

            // Ships Command
            COMMAND_SHIPS_NEED_CHARACTER: (prefix) => `Need a character or ship. Usage is \`${prefix}ship <ship|pilot>\``,
            COMMAND_SHIPS_INVALID_CHARACTER: (prefix) => `Invalid character or ship. Usage is \`${prefix}ship <ship|pilot>\``,
            COMMAND_SHIPS_TOO_MANY: `I found more than one result from that search. Please try to be more specific.`,
            COMMAND_SHIPS_CREW: 'Crew',
            COMMAND_SHIPS_FACTIONS: 'Factions',
            COMMAND_SHIPS_ABILITIES: (abilities) => `**Ability Type:** ${abilities.type}   **Ability Cooldown:** ${abilities.abilityCooldown} \n${abilities.abilityDesc}`,
            COMMAND_SHIPS_CODE_ABILITES_HEADER: ` * Abilities *\n`,
            COMMAND_SHIPS_CODE_ABILITIES: (abilityName, abilities) => `### ${abilityName} ###\nAbility Type: ${abilities.type}   Ability Cooldown: ${abilities.abilityCooldown}\n${abilities.abilityDesc}\n\n`,
            COMMAND_SHIPS_HELP: {
                description: "Shows info about the selected ship.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'ship <ship|pilot>',
                        args: {
                            "ship|pilot": "The ship or pilot for the ship you want info on."
                        }
                    }
                ]
            },

            // Showconf Command
            COMMAND_SHOWCONF_OUTPUT: (configKeys, serverName) => `The following is the current configuration for ${serverName}: \`\`\`${configKeys}\`\`\``,
            COMMAND_SHOWCONF_HELP: {
                description: "Shows the current configs for your server.",
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
            COMMAND_STATS_OUTPUT: (memUsage, cpuLoad, uptime, users, servers, channels, shardID) => `= STATISTICS (${shardID}) =\n
• Mem Usage  :: ${memUsage} MB
• CPU Load   :: ${cpuLoad}%
• Uptime     :: ${uptime}
• Users      :: ${users}
• Servers    :: ${servers}
• Channels   :: ${channels}
• Source     :: https://github.com/jmiln/SWGoHBot`,
            COMMAND_STATS_HELP: {
                description: "Shows the bot's stats.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';stats',
                        args: {}
                    }
                ]
            },

            // Test command (in .gitignore)
            COMMAND_TEST_HELP: {
                description: "A command to test things out.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';test',
                        args: {}
                    }
                ]
            },

            // Time Command
            COMMAND_TIME_CURRENT: (time, zone) => `Current time is: ${time} in ${zone} time`,
            COMMAND_TIME_INVALID_ZONE: (time, zone) => `Invalid timezone, here's your guild's time ${time} in ${zone} time`,
            COMMAND_TIME_NO_ZONE: (time) => `Current time is: ${time} UTC time`,
            COMMAND_TIME_WITH_ZONE: (time, zone) => `Current time is: ${time} in ${zone} time`,
            COMMAND_TIME_HELP: {
                description: "Used to check the time with the guild's configured timezone.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';time [timezone]',
                        args: {
                            "timezone": "Optional if you want to see what time it is elsewhere"
                        }
                    }
                ]
            },

            // Updatechar Command
            COMMAND_UPDATECHAR_INVALID_OPT: (arg, usableArgs) => `Sorry, but ${arg} isn't a valid argument. Try one of these: ${usableArgs}`,
            COMMAND_UPDATECHAR_NEED_CHAR: `You need to specify a character to update.`,
            COMMAND_UPDATECHAR_WRONG_CHAR: (charName) => `Sorry, but your search for '${charName}' did not find any results. Please try again.`,
            COMMAND_UPDATECHAR_HELP: {
                description: "Update the info on a specified character.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';updatechar [gear|info|mods] [charater]',
                        args: {
                            "gear": "Update the gear for the character.",
                            "info": "Update the info for the character (Image link, abilities etc.)",
                            "mods": "Update the mods from crouchingrancor.com"
                        }
                    }
                ]
            },

            // UpdateClient Command
            COMMAND_UPDATECLIENT_HELP: {
                description: "Update the client for the SWGoHAPI.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';updateclient',
                        args: {}
                    }
                ]
            },

            // Zetas Command
            COMMAND_ZETA_NO_USER: `Sorry, but I don't have that user listed anywhere.`,
            COMMAND_ZETA_NO_ZETAS: 'You don\'t seem to have any abilities zetad.',
            COMMAND_ZETA_OUT_DESC: `\`${'-'.repeat(30)}\`\n\`[L]\` Leader | \`[S]\` Special | \`[U]\` Unique\n\`${'-'.repeat(30)}\``,
            COMMAND_ZETAS_HELP: {
                description: "Show the abilities that you have put zetas on.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';zeta [user]',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)"
                        }
                    }
                ]
            }
        };
    }
};
