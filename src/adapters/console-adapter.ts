import { Adapter, AdapterLog, LogLevel } from '../types';

class ConsoleAdapter implements Adapter {
  public info(log: AdapterLog) {
    console.info(ConsoleAdapter.mergeLog(log, LogLevel.info));
  }

  public error(log: AdapterLog) {
    console.error(ConsoleAdapter.mergeLog(log, LogLevel.error));
  }

  public warn(log: AdapterLog) {
    console.warn(ConsoleAdapter.mergeLog(log, LogLevel.warn));
  }

  public debug(log: AdapterLog) {
    console.debug(ConsoleAdapter.mergeLog(log, LogLevel.debug));
  }

  public static mergeLog(log: AdapterLog, level: LogLevel) {
    let message = log.message;
    if (typeof message === 'string') {
      message = { message };
    }
    return JSON.stringify({ ...message, level, ...log.meta });
  }

  public validate() {
    return process.env.DISABLE_CONSOLE_ERROR !== 'true';
  }
}

export { ConsoleAdapter };
