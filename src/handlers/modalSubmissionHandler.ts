import InteractionResponse from '../outgoing/interactionResponse';
import Interaction from '../incoming/interaction';
import ModalSubmit from '../incoming/modalSubmit';
import { InteractionCallbackType } from '../outgoing/interactionCallbackType';
import Message from '../outgoing/message';
import SubmissionRegistry from '../submissionRegistry';
import ModuleSubmission from '../moduleSubmission';
import RequestHelper from '../outgoing/requestHelper';
import Embed from '../outgoing/embed/embed';
import EmbedField from '../outgoing/embed/embedField';
import ActionRow from '../components/actionRow';
import Button, { ButtonStyle } from '../components/button';

export default class ModalSubmissionHandler {
  static async handleInteraction(
    interaction: Interaction,
  ): Promise<InteractionResponse> {
    const data = new ModalSubmit(interaction.data);

    if (data.customId.startsWith('submitupdate_')) {
      const moduleId = data.customId.replace('submitupdate_', '');
      const q1: string = data.components[0].components[0].value;
      const q2: string = data.components[1].components[0].value;
      const q3: string = data.components[2].components[0].value;

      console.log(`Incoming update for ${moduleId}`);
      console.log(`Version Number: ${q1}`);
      console.log(`Download URL ${q2}`);
      console.log(`Optional DLL File Name: ${q3}`);

      const submissionRegistry = new SubmissionRegistry();
      const moduleSubmission: ModuleSubmission = {
        ModuleId: moduleId,
        Version: q1,
        DownloadUrl: q2,
        DllFileName: q3,
      };
      await submissionRegistry.CreateSubmission(moduleSubmission);

      const msg = new Message();
      const embed = new Embed('New Update Submission', moduleId);
      embed.fields = [
        new EmbedField('Module Id', moduleId),
        new EmbedField('Version', q1),
        new EmbedField('Download URL', q2),
        new EmbedField('Dll File Name', q3),
      ];

      const acceptButton = new Button(
        'Accept',
        ButtonStyle.Success,
        `acceptupdate_${moduleId}_${q1}`,
      );
      const denyButton = new Button(
        'Deny',
        ButtonStyle.Danger,
        `denyupdate_${moduleId}_${q1}`,
      );

      msg.embeds = [embed];
      msg.components = [new ActionRow([acceptButton, denyButton])];
      await RequestHelper.sendMessageToChannel('930247320832966666', msg);

      return new InteractionResponse(
        InteractionCallbackType.ChannelMessageWithSource,
        new Message(
          true,
          "Sweeeeet! We'll review this and get back to you soon!",
        ),
      );
    }

    return new InteractionResponse(InteractionCallbackType.Pong);
  }
}
