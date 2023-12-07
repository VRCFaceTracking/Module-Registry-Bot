import InteractionResponse from '../outgoing/interactionResponse';
import Interaction from '../incoming/interaction';
import ModalSubmit from '../incoming/modalSubmit';

export default class ModalSubmissionHandler {
  static async handleInteraction(
    interaction: Interaction,
  ): Promise<InteractionResponse> {
    const data = new ModalSubmit(interaction.data);
    // TODO
  }
}
