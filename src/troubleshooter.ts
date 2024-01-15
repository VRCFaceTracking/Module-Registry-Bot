import { Story } from 'inkjs';
import * as fs from 'fs';
import Message from './outgoing/message';
import ActionRow from './components/actionRow';
import Button, { ButtonStyle } from './components/button';

export default class Troubleshooter {
  private readonly inkFile: string;
  private story: InstanceType<typeof Story>;
  private readonly id: string;

  constructor(customId: string = null) {
    this.inkFile = fs
      .readFileSync('dist/vrcft_troubleshooting.ink.json', {
        encoding: 'utf-8',
      })
      .replace(/^\uFEFF/, '');

    this.story = new Story(this.inkFile);
    this.id = customId ?? 'troubleshoot_';

    if (customId == null) return;

    // First, we split the numbers into an array
    const choices: number[] = customId
      .replace('troubleshoot_', '')
      .split(',')
      .filter((i) => i.trim() !== '') // Remove empty strings after split
      .map((i) => Number(i));

    choices.forEach((n) => {
      while (this.story.canContinue) this.story.Continue();
      if (this.story.currentChoices.length > 0) {
        this.story.ChooseChoiceIndex(n);
      } else {
        throw 'Not Implemented';
      }
    });
  }

  getNextMsg(): Message {
    const message = new Message(false, this.story.ContinueMaximally());
    const buttons = this.story.currentChoices.map(
      (choice) =>
        new Button(
          choice.text,
          ButtonStyle.Secondary,
          this.id + choice.index + ',',
        ),
    );
    if (buttons.length > 0) message.components = [new ActionRow(buttons)];
    return message;
  }
}
