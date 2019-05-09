declare module 'graylog2' {
  /* tslint:disable-next-line */
  export class graylog {
    constructor(config: any);

    info(message: string, meta: import('../types').Detail): void;
    error(message: string, meta: import('../types').Detail): void;
    warning(message: string, meta: import('../types').Detail): void;
    debug(message: string, meta: import('../types').Detail): void;
  }
}
