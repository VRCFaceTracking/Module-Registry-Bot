import Interaction from '../incoming/interaction';
import InteractionResponse from '../outgoing/interactionResponse';
import ApplicationCommandInteractionData from '../incoming/applicationCommandInteractionData';
import { InteractionCallbackType } from '../outgoing/interactionCallbackType';
import ModuleRegistry from '../moduleRegistry';
import SelectMenu from '../components/selectMenu';
import Message from '../outgoing/message';
import ActionRow from '../components/actionRow';
import Troubleshooter from '../troubleshooter';

export default class SlashCommandHandler {
  public static async handleCommand(
    interaction: Interaction,
  ): Promise<InteractionResponse> {
    const command = new ApplicationCommandInteractionData(interaction.data);

    switch (command.name) {
      case 'listusermodules':
        const moduleRegistry = new ModuleRegistry();
        const ownedModules = await moduleRegistry.GetAllOwnedModules(
          interaction.user.id.toString(),
        );

        // Create a dropdown selector thingy
        const selectMenu = new SelectMenu('moduleselectmenu', 1, 1);
        ownedModules.forEach((module) => {
          selectMenu.addOption(
            module.ModuleName,
            module.ModuleId,
            module.ModuleDescription,
          );
        });

        const msg = new Message(true, 'Here are your modules');
        msg.components = [new ActionRow([selectMenu])];

        return new InteractionResponse(
          InteractionCallbackType.ChannelMessageWithSource,
          msg,
        );
      case 'troubleshoot':
        const troubleshooter = new Troubleshooter(command.name + '_');
        return new InteractionResponse(
          InteractionCallbackType.ChannelMessageWithSource,
          troubleshooter.getNextMsg(),
        );
    }

    return new InteractionResponse(InteractionCallbackType.Pong);
  }
}
