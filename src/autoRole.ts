import MessageComponentInteractionData from './incoming/messageComponentInteractionData';
import InteractionResponse from './outgoing/interactionResponse';
import GuildMember from './guildMember';
import Message from './outgoing/message';
import { InteractionCallbackType } from './outgoing/interactionCallbackType';
import RequestHelper from './outgoing/requestHelper';
import Interaction from './incoming/interaction';
import Button from './components/button';

const ROLES: Map<string, string> = new Map<string, string>([
  ['vpe', '921099508107071528'],
  ['vft', '921099674641911858'],
  ['pmx', '921099894536675379'],
  ['vrj', '921100061688074290'],
  ['qst', '982380733303771186'],
  ['meetup', '991047446434045952'],
  ['wireless', '1014646386081411073'],
  ['qstpro', '1034535738638880801'],
  ['furry', '1027668810007842936'],
]);

export default class AutoRole {
  static async TryAssignRole(
    component: MessageComponentInteractionData,
    message: Interaction,
  ): Promise<InteractionResponse | null> {
    if (!ROLES.has(component.custom_id)) {
      return null;
    }

    // Get the ID of the role
    const roleId = ROLES.get(component.custom_id);

    // Check if the user already has the role
    const hasRole = message.member.roles.includes(roleId);

    if (component.custom_id === 'furry' && hasRole) {
      const msg = new Message(true, 'You may not unbecome a furry');

      return new InteractionResponse(
        InteractionCallbackType.ChannelMessageWithSource,
        msg,
      );
    }

    if (hasRole) {
      await RequestHelper.removeRole(
        message.member.user.id.toString(),
        roleId,
        message.guildId,
      );
    } else {
      await RequestHelper.addRole(
        message.member.user.id.toString(),
        roleId,
        message.guildId,
      );
    }

    const buttonRows = message.message.components;

    let buttonName = undefined;

    // For each row, get components and recurse until we find the component that matches the custom_id of the button
    for (let i = 0; i < buttonRows.length; i++) {
      const buttonRow = buttonRows[i];
      const buttons = buttonRow.components;
      for (let j = 0; j < buttons.length; j++) {
        const button = buttons[j] as Button;
        if (button.custom_id === component.custom_id) {
          // Toggle the button's style
          buttonName = button.label;
          break;
        }
      }
    }

    const msg = new Message(
      true,
      `Successfully ${hasRole ? 'removed' : 'added'} the ${buttonName} role!`,
    );

    return new InteractionResponse(
      InteractionCallbackType.ChannelMessageWithSource,
      msg,
    );
  }
}
