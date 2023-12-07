import nacl from 'tweetnacl';
import Interaction from './incoming/interaction';
import { InteractionType } from './incoming/interactionType';
import InteractionResponse from './outgoing/interactionResponse';
import { InteractionCallbackType } from './outgoing/interactionCallbackType';
import SlashCommandHandler from './handlers/slashCommandHandler';
import MessageComponentHandler from './handlers/messageComponentHandler';
import ModalSubmissionHandler from './handlers/modalSubmissionHandler';

const PUBLIC_KEY = process.env['PUBLIC_KEY'];

function verifySig(event) {
  const signature = event.headers['x-signature-ed25519'];
  const timestamp = event.headers['x-signature-timestamp'];
  const body = event.body;

  return nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex'),
  );
}

// Lambda handler
export async function handler(event) {
  if (!verifySig(event)) {
    return {
      statusCode: 401,
      body: 'Invalid request signature',
    };
  }

  const incomingMessage: Interaction = new Interaction(JSON.parse(event.body));

  let data = null;
  switch (incomingMessage.type) {
    case InteractionType.Ping: // Ping
      data = new InteractionResponse(InteractionCallbackType.Pong);
      break;

    case InteractionType.ApplicationCommand: // Slash command
      data = await SlashCommandHandler.handleCommand(incomingMessage);
      break;

    case InteractionType.MessageComponent: // Interaction
      data = await MessageComponentHandler.handleInteraction(incomingMessage);
      break;

    case InteractionType.ModalSubmit:
      data = await ModalSubmissionHandler.handleInteraction(incomingMessage);
      break;
  }

  console.log('Responding with: ' + JSON.stringify(data));
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
