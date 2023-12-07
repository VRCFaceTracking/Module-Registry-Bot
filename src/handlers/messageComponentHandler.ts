import Interaction from '../incoming/interaction';
import MessageComponentInteractionData from '../incoming/messageComponentInteractionData';
import InteractionResponse from '../outgoing/interactionResponse';
import { InteractionCallbackType } from '../outgoing/interactionCallbackType';

export default class MessageComponentHandler {
  public static async handleInteraction(
    interaction: Interaction,
  ): Promise<InteractionResponse> {
    const component = new MessageComponentInteractionData(interaction.data);
    // TODO

    return new InteractionResponse(InteractionCallbackType.Pong);
  }
}
