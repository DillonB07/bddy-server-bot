import {
  BaseInteraction,
  Client,
  Interaction,
  Events,
  EmbedBuilder,
  codeBlock,
  Colors
} from "discord.js";

export default (client: Client): void => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    // @ts-ignore
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Internal Error")
            .setDescription(`${codeBlock("js", `${error}`)}`)
            .setColor(Colors.Red)
            .setFooter({
              text: "Please report this to bddy#5683",
              iconURL: "https://bddy.lol/favicon.png"
            })
        ]
      });
    }
  });
};
