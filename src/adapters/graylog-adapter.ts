import { graylog } from 'graylog2';
import { Adapter, AdapterLog, GraylogConfig } from '../types';

class GraylogAdapter implements Adapter {
  private config: GraylogConfig;
  private graylog: graylog;

  constructor(config: GraylogConfig) {
    this.config = config;
    this.graylog = this.setup();
  }

  public info(log: AdapterLog) {
    this.graylog.info(log.message, log.meta);
  }

  public error(log: AdapterLog) {
    this.graylog.error(log.message, log.meta);
  }

  public warning(log: AdapterLog) {
    this.graylog.warning(log.message, log.meta);
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
      bufferSize: this.config.bufferSize
    });
  }
}

export { GraylogAdapter };
