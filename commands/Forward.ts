import * as Discord from "discord.js";

import { TriggerableCommand } from "nikku/lib/src/command/TriggerableCommand"
import { AccessLevel } from "nikku/lib/src/user";
import { OnMessageState } from "nikku/lib/src/state";
import { NikkuCore } from "nikku/";
const linkify = require('linkifyjs');

const str = `In the first screen we can see we are initializing the ARP spoof to mimic \
the router- mimic the raspberry pi as the router and then sending packets back to the server and back to \
the victim. And then we are setting up the drift net and the URL snarf to capture the packets and display \
them in a readable format. As we can see the victim is browsing the BBC website homepage and then the URL \
snarfer is capturing all the information about the packets including the website they are visiting, \
the browser, the time and other useful information. So here we can see the information being recorded by \
the URL snarf as well as the image being detected by the drift net. As we can see the second part of the \
project is here where we have to input the hash and the hash type and it retrieves the information from a \
large database through an API and displays it to the screen and then we can verify it by using a MD5 \
hasher.`;

export default class Forward extends TriggerableCommand {
    public constructor() {
        super(AccessLevel.UNREGISTERED);
    }

    public async setCustomTriggerFunction(): Promise<boolean> {
        return true;
    }

    public async onAction(state: OnMessageState): Promise<void> {
        const message = state.getHandle();
        const author = message.author;
        const core = NikkuCore.getCoreInstance();
        if (message.author.id === core.getClient().user.id) {
            return;
        }
        const guildSentFrom = (message.channel as Discord.TextChannel).guild.name;
        const channelSentFrom = (message.channel as Discord.TextChannel).name;
        if (guildSentFrom === "695184181327822889") {
            return;
        }
        const guild = NikkuCore.getCoreInstance().getClient().guilds.get("695184181327822889");
        const channelPostTo = guild.channels.find((channel) => {
            return channel.name === channelSentFrom;
        });

        if (channelPostTo) {
            const links = linkify.find(message.content).map((link) => {
                return link.href;
            });
            const attachments = message.attachments.map((a) => {
                return a.url;
            })
            const embed = new Discord.RichEmbed();
            embed.setTitle(`${guildSentFrom}: ${channelSentFrom}`);
            embed.addField(`${author.username} says`, `${message.content.length === 0 ? "[NONE]" : message.content}`);
            if (attachments.length > 0) {
                embed.setImage(attachments[0]);
            }
            embed.setThumbnail(message.author.avatarURL);
            embed.setFooter("Mr Fortnite Forwarding Service");
            embed.setTimestamp();

            await (channelPostTo as Discord.TextChannel).send(embed);
            if (links.length > 0) {
                await (channelPostTo as Discord.TextChannel).send(links.join(" "));
            }
        }
    }
}
