import { Adapter, AdapterLog } from '../types';

class ConsoleAdapter implements Adapter {
  public info(log: AdapterLog) {
    console.info(ConsoleAdapter.mergeLog(log));
  }

  public error(log: AdapterLog) {
    console.error(ConsoleAdapter.mergeLog(log));
  }

  public warn(log: AdapterLog) {
    console.warn(ConsoleAdapter.mergeLog(log));
  }

  public debug(log: AdapterLog) {
    console.debug(ConsoleAdapter.mergeLog(log));
  }

  public static mergeLog(log: AdapterLog) {
    let message = log.message;
    if (typeof message === 'string') {
      message = { message };
    }
    return JSON.stringify({ ...message, ...log.meta });
  }

  public validate() {
    return process.env.DISABLE_CONSOLE_ERROR !== 'true';
  }
}

export { ConsoleAdapter };
