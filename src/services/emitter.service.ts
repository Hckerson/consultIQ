import { logger } from "src/lib/logger";
import { EventEmitter } from "node:stream";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class EventService extends EventEmitter {
  constructor() {
    super();
    this.initializeError();
  }

  initializeError() {
    this.on("error", (error) => {
      logger.error(`Event error`, error);
      throw new InternalServerErrorException();
    });
  }

  registerListeners(eventName: string, func: (...args: any[]) => void) {
    this.on(eventName, (...args) => {
      logger.log(`Event ${eventName} triggered`, null);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      func(...args);
    });
  }

  registerNewEvent(eventName: string, args: unknown[]) {
    this.emit(eventName, ...args);
  }

  checkEventsRegistered(eventName: string) {
    return this.eventNames().includes(eventName);
  }

  removeEvent(eventName: string) {
    this.removeListener(eventName, () => {
      logger.log(`Event ${eventName} removed`, null);
    });
  }

  removeAllEvents() {
    this.removeAllListeners();
  }
}
