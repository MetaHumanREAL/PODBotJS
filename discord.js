const Discord = require('discord.js');
const bot = new Discord.Client();
var fs = require('fs');
var token = fs.readFileSync('token.txt','utf8');

var green = '88FF70';
var red = 'FF8170';
var gray = 'CBCBCB';

bot.on('ready', async() => {
    bot.user.setActivity('RoboFight.io');
    console.log('RoboBot is now online!');
});

bot.on('message', message => {
    let prefix = "!";
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray;
    let mentioned = message.mentions.users.first();

    if(message.channel.id == "586965772744654848") {
        if(message.id == "587406134122512384") {
            //nothing
        } else if(args[0] == "!suggestion") {
            //nothing
        } else {
            message.channel.bulkDelete(1);
            message.author.send('Please use !suggestion (Description) to send suggestions!');
        }
    }

    if(message.channel.id == "586965796308123666") {
        if(message.id == "587405906879315980") {
            //nothing
        } else if(args[0] == "!bugreport") {
            //nothing
        } else {
            message.channel.bulkDelete(1);
            message.author.send('Please use !bugreport (Description) to send bug reports!');
        }
    }

    if(message.content.includes('nigg') || message.content.includes('niq') || message.content.includes('n1g') || message.content.includes('n1q')) {
        message.author.send('You may not use racial slurs!');
        var embed = new Discord.RichEmbed()
        .setDescription('**Message sent by** <@' + message.author.id + '> **deleted in** <#' + message.channel.id + '>\n' + message.content.split(' ').join(' '))
        .setFooter('Author: ' + message.author.id + ' | Message ID: ' + message.id)
        .setTimestamp(message.createdAt)
        .setColor(red);

        message.guild.channels.get('586966311691878416').send(embed);
        message.channel.bulkDelete(1);
    }

//User Commands:
    if(cmd == prefix + 'help') {
        message.member.send("");
    }

    if(cmd == prefix + 'invite') {
        message.member.send('Invite link: https://discord.gg/9qRPtme');
        message.channel.bulkDelete(1);
    }

    if(cmd == prefix + 'suggestion') {
        if(!args[1]) return message.author.send('Usage: !suggestion (Description)').then(message.channel.bulkDelete(1));
        if(message.channel.id == "586965772744654848") {
            if(message.member.roles.has(message.guild.roles.find(r => r.name == "Suggestion Banned"))) {
                message.author.send("You're currently suggestion banned! If you think this is an error please contact an Administrator for further assistance.");
                message.channel.bulkDelete(1);
            } else {
                message.author.send('**Your suggestion:** \n"**' + args.slice(1).join(' ') + '**"\n\n Has been sent to staff!');
                bot.channels.get('587400712653373440').send("**Name:** <@" + message.author.id + ">\n```md\n# Suggestion:\n- " + args.slice(1).join(' ') + "```");
                message.channel.bulkDelete(1);
            }
        } else {
            message.author.send('Please send the suggestion command in #suggestions!');
            message.channel.bulkDelete(1);
        }
    }

    if(cmd == prefix + 'bugreport') {
        if(!args[1]) return message.author.send('Usage: !bugreport (Description)').then(message.channel.bulkDelete(1));
        if(message.channel.id == "586965796308123666") {
            if(message.member.roles.has(message.guild.roles.find(r => r.name == "Bug Banned"))) {
                message.author.send("You're currently bug banned! If you think this is an error please contact an Administrator for further assistance.");
                message.channel.bulkDelete(1);
            } else {
                message.author.send('**Your bugreport:** \n"**' + args.slice(1).join(' ') + '**"\n\n Has been sent to staff!');
                bot.channels.get('587404592392962051').send("**Name:** <@" + message.author.id + ">\n```md\n# BugReport:\n- " + args.slice(1).join(' ') + "```");
                message.channel.bulkDelete(1);
            }
        } else {
            message.author.send('Please send the bug report command in #bug-reports!');
            message.channel.bulkDelete(1);
        }
    }

//Moderator Commands:
    if(cmd == prefix + 'ban') {
        if(message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')) { //Check if User has permissions
            if(mentioned != null) {
                if(message.guild.member(mentioned).hasPermission('BAN_MEMBERS') || message.guild.member(mentioned).hasPermission('ADMINISTRATOR')) { //Check if banned user has these permissions
                    message.channel.send(args[1] + ' has moderator permissions so I cannot ban him!'); //Output for if banned user has permissions
                    return;
                } else {
                    var embed = new Discord.RichEmbed()
                    .setColor(red)
                    .setTitle('A user has been banned!')
                    .setDescription("**Username:** <@" + mentioned.id + ">\n\n**Reason:** " + args.slice(2).join(' ') + "\n\n**Issued by:** <@" + message.author.id + ">")
                    .setTimestamp(message.createdAt);
                    bot.channels.get('586966311691878416').send(embed);
                    message.channel.send("<@" +message.guild.member(mentioned).id + '> has been banned!');
                    message.guild.member(mentioned).send("You have been banned for: " + args.slice(2).join(' '));
                    setTimeout(function(){
                        message.guild.member(mentioned).ban(args.slice(2).join(' '));
                    }, 1000);
                }
            } else {
                message.channel.send(args[1] + ' cannot be found!'); //Output for if the user specified cannot be found
            }
        } else {
            message.member.send('You do not have the required permissions to use this command!'); //Output for if the user doesn't have the permissions to use this command
            message.channel.bulkDelete(1);
        }
    }

    if(cmd == prefix + 'kick') {
        if(message.member.hasPermission('KICK_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')) {
            if(mentioned != null) {
                if(message.guild.member(mentioned).hasPermission('KICK_MEMBERS') || message.guild.member(mentioned).hasPermission('ADMINISTRATOR')) { //Check if banned user has these permissions
                    message.channel.send(args[1] + ' has moderator permissions so I cannot kick him!'); //Output for if banned user has permissions
                    return;
                } else {
                    var embed = new Discord.RichEmbed()
                    .setColor(red)
                    .setTitle('A user has been kicked!')
                    .setDescription("**Username:** <@" + mentioned.id + ">\n\n**Reason:** " + args.slice(2).join(' ') + "\n\n**Issued by:** <@" + message.author.id + ">")
                    .setTimestamp(message.createdAt);
                    bot.channels.get('586966311691878416').send(embed);
                    message.channel.send("<@" +message.guild.member(mentioned).id + '> has been kicked!');
                    message.guild.member(mentioned).send("You have been kicked for: " + args.slice(2).join(' '));
                    setTimeout(function(){
                        message.guild.member(mentioned).kick(args.slice(2).join(' '));
                    }, 1000);
                }
            } else {
                message.channel.send(args[1] + ' cannot be found!'); //Output for if the user specified cannot be found
            }
        } else {
            message.member.send('You do not have the required permissions to use this command!'); //Output for if the user doesn't have the permissions to use this command
            message.channel.bulkDelete(1);
        }
    }

    if(cmd == prefix + 'mute') {
        if(message.member.hasPermission('MUTE_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')) {
            if(mentioned != null) {
                message.guild.member(mentioned).addRole(message.guild.roles.find(r => r.name == "Muted"));
                var embed = new Discord.RichEmbed()
                .setColor(red)
                .setTitle('A user has been muted!')
                .setDescription("**Username:** <@" + message.guild.member(mentioned).id + ">\n\n**Reason:** " + args.slice(2).join(' ') + "\n\n**Issued by:** <@" + message.author.id + ">")
                .setTimestamp(message.createdAt);

                bot.channels.get('586966311691878416').send(embed);
                message.guild.member(mentioned).send('You have been muted for: ' + args.slice(2).join(' '));
            } else {
                message.channel.send(args[1] + ' cannot be found!'); //Output for if the user specified cannot be found
            }
        } else {
            message.member.send('You do not have the required permissions to use this command!'); //Output for if the user doesn't have the permissions to use this command
            message.channel.bulkDelete(1);
        }
    }

    if(cmd == prefix + 'tmute') {
        if(message.member.hasPermission('MUTE_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')) {
            if(mentioned != null) {
                if(isNaN(args[2])) {
                    message.channel.send('Usage: !tmute <User> <Time> <m/h/d> <reason>');
                } else {
                    if(args[3] == "m") {
                        message.guild.member(mentioned).addRole(message.guild.roles.find(r => r.name == "Muted"));
                        var embed = new Discord.RichEmbed()
                        .setColor(red)
                        .setTitle('A user has been Tempmuted!')
                        .setDescription("**Username:** <@" + message.guild.member(mentioned).id + ">\n**Time:** " + args[2] + "minute(s)\n**Reason:** " + args.slice(4).join(' ') + "\n\n**Issued by:** <@" + message.author.id + ">")
                        .setTimestamp(message.createdAt);

                        bot.channels.get('586966311691878416').send(embed);
                        setTimeout(function() {
                            if(message.guild.member(mentioned).roles.has(r => r.name == "Muted")) {
                                message.guild.member(mentioned).removeRole(message.guild.roles.find(r => r.name == "Muted"));
                                var embed = new Discord.RichEmbed()
                                .setColor(green)
                                .setTitle('A user has been autounmuted!')
                                .setDescription("**Username:** <@" + message.guild.member(mentioned).id + ">\n**Reason:** Autounmute")
                                .setTimestamp(message.createdAt);

                                bot.channels.get('586966311691878416').send(embed);
                            } else {
                                //Nothing
                            }
                        }, args[2] * 60000);
                    } else if(args[3] == "h") {
                        message.guild.member(mentioned).addRole(message.guild.roles.find(r => r.name == "Muted"));
                        var embed = new Discord.RichEmbed()
                        .setColor(red)
                        .setTitle('A user has been Tempmuted!')
                        .setDescription("**Username:** <@" + message.guild.member(mentioned).id + ">\n\n**Time:** " + args[2] + "hour(s)\n\n**Reason:** " + args.slice(4).join(' ') + "\n\n**Issued by:** <@" + message.author.id + ">")
                        .setTimestamp(message.createdAt);

                        bot.channels.get('586966311691878416').send(embed);
                        setTimeout(function() {
                            if(message.guild.member(mentioned).roles.has(r => r.name == "Muted")) {
                                message.guild.member(mentioned).removeRole(message.guild.roles.find(r => r.name == "Muted"));
                                var embed = new Discord.RichEmbed()
                                .setColor(green)
                                .setTitle('A user has been autounmuted!')
                                .setDescription("**Username:** <@" + message.guild.member(mentioned).id + ">\n**Reason:** Autounmute")
                                .setTimestamp(message.createdAt);

                                bot.channels.get('586966311691878416').send(embed);
                            } else {
                                //Nothing
                            }
                        }, args[2] * 3600000);
                    } else if(args[3] == "d") {
                        message.guild.member(mentioned).addRole(message.guild.roles.find(r => r.name == "Muted"));
                        var embed = new Discord.RichEmbed()
                        .setColor(red)
                        .setTitle('A user has been Tempmuted!')
                        .setDescription("**Username:** <@" + message.guild.member(mentioned).id + ">\n\n**Time:** " + args[2] + "day(s)\n\n**Reason:** " + args.slice(4).join(' ') + "\n\n**Issued by:** <@" + message.author.id + ">")
                        .setTimestamp(message.createdAt);

                        bot.channels.get('586966311691878416').send(embed);
                        setTimeout(function() {
                            if(message.guild.member(mentioned).roles.has(message.guild.roles.find(r => r.name == "Muted"))) {
                                message.guild.member(mentioned).removeRole(message.guild.roles.find(r => r.name == "Muted"));
                                var embed = new Discord.RichEmbed()
                                .setColor(green)
                                .setTitle('A user has been autounmuted!')
                                .setDescription("**Username:** <@" + message.guild.member(mentioned).id + ">\n\n**Reason:** Autounmute")
                                .setTimestamp(message.createdAt);

                                bot.channels.get('586966311691878416').send(embed);
                            } else {
                                //Nothing
                            }
                        }, args[2] * 86400000);
                    } else {
                        message.channel.send('Usage: !tmute <User> <Time> <m/h/d> <reason>');
                    }
                }
            } else {
                message.channel.send(args[1] + ' cannot be found!'); //Output for if the user specified cannot be found
            }
        } else {
            message.member.send('You do not have the required permission to use this command!');//Output for if the user doesn't have the permissions to use this command
            message.channel.bulkDelete(1);
        }
    }

    if(cmd == prefix + 'unmute') {
        if(message.member.hasPermission('MUTE_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')) {
            if(mentioned != null) {
                message.guild.member(mentioned).removeRole(message.guild.roles.find(r => r.name == "Muted"));
                var embed = new Discord.RichEmbed()
                .setColor(green)
                .setTitle('A user has been Unmuted!')
                .setDescription("**Username:** <@" + message.guild.member(mentioned).id + ">\n**Reason:** " + args.slice(2).join(' ') + "\n**Issued by:** <@" + message.author.id + ">")
                .setTimestamp(message.createdAt);

                bot.channels.get('586966311691878416').send(embed);
            } else {
                message.channel.send(args[1] + ' cannot be found!'); //Output for if the user specified cannot be found
            }
        } else {
            message.member.send('You do not have the required permission to use this command!');//Output for if the user doesn't have the permissions to use this command
            message.channel.bulkDelete(1);
        }
    }

    if(cmd == prefix + 'sban') {
        if(message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')) {
            if(mentioned != null) {
                message.guild.member(mentioned).send("You have been Suggestion Banned! If you think you've been falsely banned please contact an Administrator immediately.")
                message.guild.member(mentioned).addRole(message.guild.roles.find(r => r.name === "Suggestion Banned"));
                var embed = new Discord.RichEmbed()
                .setColor(red)
                .setDescription('**User <@' + mentioned.id + '> has been Suggestion Banned.\nReason:** ' + args.slice(2).join(' ') + '\n**Issued by:** <@' + message.author.id + '>')
                .setTimestamp(message.createdAt);

                bot.channels.get('586966311691878416').send(embed);
            } else {
                message.channel.send(args[1] + ' cannot be found.');
            }
        } else {
            message.member.send('You do not have the required permission to use this command!');
            message.channel.bulkDelete(1);
        }
    }

    if(cmd == prefix + 'bban') {
        if(message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')) {
            if(mentioned != null) {
                message.guild.member(mentioned).send("You have been Bug Banned! If you think you've been falsely banned please contact an Administrator immediately.")
                message.guild.member(mentioned).addRole(message.guild.roles.find(r => r.name === "Bug Banned"));
                var embed = new Discord.RichEmbed()
                .setColor(red)
                .setDescription('**User <@' + mentioned.id + '> has been Bug Banned.\nReason:** ' + args.slice(2).join(' ') + '\n**Issued by:** <@' + message.author.id + '>')
                .setTimestamp(message.createdAt);

                bot.channels.get('586966311691878416').send(embed);
            } else {
                message.channel.send(args[1] + ' cannot be found.');
            }
        } else {
            message.member.send('You do not have the required permission to use this command!');
            message.channel.bulkDelete(1);
        }
    }

//Admin Commands:
    if(cmd == prefix + 'purge') {
        if(message.member.hasPermission('ADMINISTRATOR')) { //Checks if user is an administrator
            if(isNaN(args[1])) return message.member.send('Please specify a number!'); //Checks if args[1] is not a number
            message.channel.bulkDelete(args[1]);
            var embed = new Discord.RichEmbed()
            .setColor(gray)
            .setTitle('Messages have been purged!')
            .setDescription("<@" + message.member.id + "> has purged " + args[1] + " message(s) in #" + message.channel.name)
            .setTimestamp(message.createdAt);

            bot.channels.get('586966311691878416').send(embed);
        } else {
            message.member.send('You do not have the required permission to use this command!'); //Output for if the user doesn't have the permissions to use this command
        }
    }
});

bot.on('messageReactionAdd', (reactionMessage, user) => {
    var mentioned = reactionMessage.message.mentions.members.first();
    var mescontent = reactionMessage.message.content.split(' ').slice(3);

    if(reactionMessage.message.channel.id == "587400712653373440") {
        if(reactionMessage.emoji.name == "✅") {
            reactionMessage.message.guild.member(mentioned).send('**Your suggestion:**\n"**' + mescontent.join(' ').replace('```', '') + '**"\n\nHas been approved! (This does not mean it will be added in game)');
            reactionMessage.message.delete();
            bot.channels.get('588539646120820736').send("**Name:** <@" + mentioned.id + ">\n```md\n# Suggestion:\n- " + mescontent.join(' ').replace('```', '') + "```");
            return;
        } else if(reactionMessage.emoji.name == "❌") {
            reactionMessage.message.guild.member(mentioned).send('**Your suggestion:**\n"**' + mescontent.join(' ').replace('```', '') + '**"\n\n**Has been denied for any of the following reasons:**\n**1)** It lacked detail.\n**2)** It was a duplicate.\n**3)** Its already in game.');
            reactionMessage.message.delete();
            return;
        }
    } else {
        //nothing
    }

    if(reactionMessage.message.channel.id == "587404592392962051") {
        if(reactionMessage.emoji.name == "✅") {
            reactionMessage.message.guild.member(mentioned).send('**Your BugReport:**\n"**' + mescontent.join(' ').replace('```', '') + '**"\n\nHas been approved! (This does not mean it will be added in game)');
            reactionMessage.message.delete();
            bot.channels.get('589573728221003797').send("**Name:** <@" + mentioned.id + ">\n```md\n# BugReport:\n- " + mescontent.join(' ').replace('```', '') + "```");
            return;
        } else if(reactionMessage.emoji.name == "❌") {
            reactionMessage.message.guild.member(mentioned).send('**Your bugreport:**\n"**' + mescontent.join(' ').replace('```', '') + '**"\n\n**Has been denied for any of the following reasons:**\n**1)** It lacked detail.\n**2)** It was a duplicate.\n**3)** Its already fixed.');
            reactionMessage.message.delete();
            return;
        }
    } else {
        //nothing
    }
});

bot.on('messageDelete', (messageDelete) => {
    var embed = new Discord.RichEmbed()
    .setDescription('**Message sent by** <@' + messageDelete.author.id + '> **deleted in** <#' + messageDelete.channel.id + '>\n' + messageDelete.content.split(' ').join(' '))
    .setFooter('Author: ' + messageDelete.author.id + ' | Message ID: ' + messageDelete.id)
    .setTimestamp(messageDelete.createdAt)
    .setColor(0xE72637);

    messageDelete.guild.channels.get('586966311691878416').send(embed);
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
    if(newMessage.author.bot) return;
    if(oldMessage.author.bot) return;
    if(newMessage.content.includes('nigg') || newMessage.content.includes('niq') || newMessage.content.includes('n1g') || newMessage.content.includes('n1q')) {
        newMessage.delete();
        newMessage.author.send('Nice try...');

    } else {
        var embed = new Discord.RichEmbed()
        .setDescription('**Message sent by** <@' + oldMessage.member.id + '> **edited in** <#' + oldMessage.channel.id + '>\n*' + oldMessage.content.split(' ').join(' ') + '*\n**' + newMessage.content.split(' ').join(' ') + '**')
        .setFooter('Author: ' + oldMessage.author.id + ' | Message ID: ' + newMessage.id)
        .setTimestamp(newMessage.createdAt)
        .setColor(gray);

        oldMessage.guild.channels.get('586966311691878416').send(embed);
    }
});

bot.on('guildMemberAdd', (guildMember) => {
    var leavetime = new Date();
    var embed = new Discord.RichEmbed()
    .setDescription(' **Member Joined**\n<@' + guildMember.user.id + '> ' + guildMember.user.username)
    .setFooter('ID: ' + guildMember.id)
    .setTimestamp(leavetime.getDate)
    .setColor(green);
    guildMember.guild.channels.get('586966311691878416').send(embed);
});

bot.on('guildMemberRemove', (guildMember) => {
    var leavetime = new Date();
    var embed = new Discord.RichEmbed()
    .setDescription(' **Member Left**\n<@' + guildMember.user.id + '> ' + guildMember.user.username)
    .setFooter('ID: ' + guildMember.id)
    .setTimestamp(leavetime.getDate)
    .setColor(red);
    guildMember.guild.channels.get('586966311691878416').send(embed);
});

bot.login(process.env.BOT_TOKEN);
