declare module 'graylog2' {
  /* tslint:disable-next-line */
  export class graylog {
    constructor(config: any);

    info(message: string, meta: { [key: string]: string }): void;
    error(message: string, meta: { [key: string]: string }): void;
    warning(message: string, meta: { [key: string]: string }): void;
  }
}
