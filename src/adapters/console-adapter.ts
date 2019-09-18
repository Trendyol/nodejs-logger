import { Adapter, AdapterLog } from '../types';

class ConsoleAdapter implements Adapter {
  public info(log: AdapterLog) {
    console.info(log.message, log.meta);
  }

  public error(log: AdapterLog) {
    console.error(log.message, log.meta);
  }

  public warn(log: AdapterLog) {
    console.warn(log.message, log.meta);
  }

  public debug(log: AdapterLog) {
    console.debug(log.message, log.meta);
  }

  public validate() {
    // Console is always available
    return true;
  }
}

export { ConsoleAdapter };
