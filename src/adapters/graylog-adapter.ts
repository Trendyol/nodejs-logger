import { graylog } from 'graylog2';
import { Adapter, AdapterLog, GraylogConfig } from '../types';

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
    this.graylog.info(log.message, log.meta);
  }

  public error(log: AdapterLog) {
    this.graylog.error(log.message, log.meta);
  }

  public warn(log: AdapterLog) {
    this.graylog.warning(log.message, log.meta);
  }

  public debug(log: AdapterLog) {
    this.graylog.debug(log.message, log.meta);
  }

  public validate() {
    return !!(this.config.facility && this.config.host && this.config.hostname && this.config.port);
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
