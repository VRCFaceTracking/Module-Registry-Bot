import Interaction from '../incoming/interaction';
import InteractionResponse from '../outgoing/interactionResponse';
import ApplicationCommandInteractionData from '../incoming/applicationCommandInteractionData';

export default class SlashCommandHandler {
  public static async handleCommand(
    interaction: Interaction,
  ): Promise<InteractionResponse> {
    const command = new ApplicationCommandInteractionData(interaction.data);
    // TODO
  }
}
