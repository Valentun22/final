import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { badWords } from '../../../constants/bad-words';

@Injectable()
export class BadWordsValidation implements CanActivate {
  private numberOfAttempts = 0;

  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { description } = request.body;
    if (this.numberOfAttempts === 3) {
      this.numberOfAttempts = 0;
      request.body.description = this.censorDescription(description);
      return true;
    }
    this.checkForBadWords(description);
    return true;
  }

  private censorDescription(description: string): string {
    return description
      .split(' ')
      .map((word) =>
        badWords.includes(word.toLowerCase()) ? '*'.repeat(word.length) : word,
      )
      .join(' ');
  }

  private checkForBadWords(description: string): void {
    if (!description) {
      throw new BadRequestException('Description empty');
    }
    description = description.toLowerCase();
    for (const word of badWords) {
      if (description.includes(word)) {
        this.numberOfAttempts++;
        if (this.numberOfAttempts === 3) {
          return;
        }
        throw new BadRequestException('Profanity is present');
      }
    }
  }
}
