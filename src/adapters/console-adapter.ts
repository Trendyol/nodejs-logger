import { Adapter, AdapterLog } from '../types';

class ConsoleAdapter implements Adapter {
  public info(log: AdapterLog) {
    if (process.env.NODE_ENV !== 'production') console.info(log.message, log.meta);
  }

  public error(log: AdapterLog) {
    if (process.env.NODE_ENV !== 'production') console.error(log.message, log.meta);
  }

  public warn(log: AdapterLog) {
    if (process.env.NODE_ENV !== 'production') console.warn(log.message, log.meta);
  }

  public debug(log: AdapterLog) {
    if (process.env.NODE_ENV !== 'production') console.debug(log.message, log.meta);
  }
}

export { ConsoleAdapter };
