import Interaction from '../incoming/interaction';
import MessageComponentInteractionData from '../incoming/messageComponentInteractionData';
import InteractionResponse from '../outgoing/interactionResponse';
import { InteractionCallbackType } from '../outgoing/interactionCallbackType';
import { ComponentType } from '../components/componentType';
import AutoRole from '../autoRole';
import ModuleRegistry from '../moduleRegistry';
import Message from '../outgoing/message';
import Button, { ButtonStyle } from '../components/button';
import ActionRow from '../components/actionRow';

export default class MessageComponentHandler {
  public static async handleInteraction(
    interaction: Interaction,
  ): Promise<InteractionResponse> {
    const component = new MessageComponentInteractionData(interaction.data);
    // TODO

    if (component.component_type == ComponentType.Button) {
      const autoRole = await AutoRole.TryAssignRole(component, interaction);

      if (autoRole != null) {
        return autoRole;
      }
    }

    switch (component.custom_id) {
      case 'moduleselectmenu':
        const moduleId = (component.values as string[])[0];
        const moduleRegistry = new ModuleRegistry();
        const moduleObject = await moduleRegistry.GetModule(moduleId);

        if (moduleObject.OwnerId !== interaction.member.user.id) {
          const msg = new Message(true, 'Weird. You do not own this module...');
          return new InteractionResponse(
            InteractionCallbackType.ChannelMessageWithSource,
            msg,
          );
        }

        const messageTxt = `\`\`\`json\n${JSON.stringify(
          moduleObject,
          null,
          2,
        )}\`\`\``;
        const newUpdateButton = new Button(
          'Update',
          ButtonStyle.Success,
          `updatemodule_${moduleId}`,
        );
        const returnMsg = new Message(true, messageTxt);
        returnMsg.components = [new ActionRow([newUpdateButton])];

        return new InteractionResponse(
          InteractionCallbackType.ChannelMessageWithSource,
          returnMsg,
        );
    }

    return new InteractionResponse(InteractionCallbackType.Pong);
  }
}
