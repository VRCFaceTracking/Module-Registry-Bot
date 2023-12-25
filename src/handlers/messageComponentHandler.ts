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
import Modal from '../components/modal';
import TextInput, { TextInputStyle } from '../components/textInput';
import SubmissionRegistry from '../submissionRegistry';

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

    const moduleRegistry = new ModuleRegistry();

    if (component.component_type == ComponentType.Button) {
      if (component.custom_id.startsWith('updatemodule_')) {
        const moduleId = component.custom_id.replace('updatemodule_', '');
        const moduleData = await moduleRegistry.GetModule(moduleId);
        const modal = new Modal(
          `submitupdate_${moduleId}`,
          `Update ${moduleData.ModuleName}`,
          [
            new ActionRow([
              new TextInput(
                'updateq1',
                'Version Number',
                1,
                10,
                TextInputStyle.Short,
                true,
                '1.0.0',
              ),
            ]),
            new ActionRow([
              new TextInput(
                'updateq2',
                'Direct Download URL',
                15,
                512,
                TextInputStyle.Paragraph,
                true,
                'https://github.com/EpicPerson/MyAwesomeModule/releases/download/1.0.0/MyAwesomeModule.dll',
              ),
            ]),
            new ActionRow([
              new TextInput(
                'updateq3',
                'DLL File Name (optional)',
                5,
                30,
                TextInputStyle.Short,
                false,
                'MyAwesomeModule.dll',
              ),
            ]),
          ],
        );
        return new InteractionResponse(
          InteractionCallbackType.ModalResponse,
          modal,
        );
      }

      const submissionRegistry = new SubmissionRegistry();
      if (component.custom_id.startsWith('acceptupdate_')) {
        const idSplit = component.custom_id
          .replace('acceptupdate_', '')
          .split('_');

        const moduleId = idSplit[0];
        const version = idSplit[1];

        const currentSubmission = await submissionRegistry.GetSubmission(
          moduleId,
          version,
        );
        const currentModule = await moduleRegistry.GetModule(moduleId);

        currentModule.DllFileName = currentSubmission.DllFileName;
        currentModule.DownloadUrl = currentSubmission.DownloadUrl;
        currentModule.Version = currentSubmission.Version;

        await moduleRegistry.UpdateModule(currentModule);
        await submissionRegistry.DeleteSubmission(moduleId, version);
      }
      if (component.custom_id.startsWith('denyupdate_')) {
        const idSplit = component.custom_id
          .replace('denyupdate_', '')
          .split('_');

        const moduleId = idSplit[0];
        const version = idSplit[1];

        await submissionRegistry.DeleteSubmission(moduleId, version);
      }
    }

    // Regular ol' slash commands
    switch (component.custom_id) {
      case 'moduleselectmenu':
        const moduleId = (component.values as string[])[0];
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
