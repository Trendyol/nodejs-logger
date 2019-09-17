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
    const isProduction = process.env.NODE_ENV === 'production';
    const isConfigEnabled =
      process.env.CONSOLE_LOG_ENABLED !== undefined && process.env.CONSOLE_LOG_ENABLED.toLowerCase() === 'true';

    if (isProduction && !isConfigEnabled) {
      return false;
    }

    return true;
  }
}

export { ConsoleAdapter };
