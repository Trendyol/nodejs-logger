declare module 'graylog2' {
  /* tslint:disable-next-line */
  export class graylog {
    constructor(config: any);

    info(message: string | object, meta: import('../types').Detail): void;
    error(message: string | object, meta: import('../types').Detail): void;
    warning(message: string | object, meta: import('../types').Detail): void;
    debug(message: string | object, meta: import('../types').Detail): void;
  }
}
