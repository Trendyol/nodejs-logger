declare module 'graylog2' {
  type Message = string | object;

  /* tslint:disable-next-line */
  export class graylog {
    constructor(config: any);

    info(message: Message, meta: import('../types').Detail): void;
    error(message: Message, meta: import('../types').Detail): void;
    warning(message: Message, meta: import('../types').Detail): void;
    debug(message: Message, meta: import('../types').Detail): void;
  }
}
