import { graylog } from 'graylog2';
import { Adapter, AdapterLog, GraylogConfig, Message } from '../types';

class GraylogAdapter implements Adapter {
  private config: GraylogConfig;
  private graylog: graylog;

  constructor(config: GraylogConfig) {
    this.config = config;

    this.info = this.info.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
    this.debug = this.debug.bind(this);
    this.setup = this.setup.bind(this);

    this.graylog = this.setup();
  }

  public info(log: AdapterLog) {
    this.graylog.info(GraylogAdapter.messageStringify(log.message), log.meta);
  }

  public error(log: AdapterLog) {
    this.graylog.error(GraylogAdapter.messageStringify(log.message), log.meta);
  }

  public warn(log: AdapterLog) {
    this.graylog.warning(GraylogAdapter.messageStringify(log.message), log.meta);
  }

  public debug(log: AdapterLog) {
    this.graylog.debug(GraylogAdapter.messageStringify(log.message), log.meta);
  }

  public validate() {
    return !!(this.config.facility && this.config.host && this.config.hostname && this.config.port);
  }

  private static messageStringify(message: Message) {
    let mappedMessage = message;
    if (typeof mappedMessage !== 'string') {
      mappedMessage = JSON.stringify(message);
    }
    return mappedMessage;
  }

  private setup() {
    return new graylog({
      servers: [
        {
          host: this.config.host,
          port: this.config.port
        }
      ],
      hostname: this.config.hostname,
      facility: this.config.facility,
      bufferSize: this.config.bufferSize || 1400
    });
  }
}

export { GraylogAdapter };
