import { Adapter, LoggerProps, LogContext, AdapterLog, LevelMap, LogLevel, Message } from '../types';
import { mapLogDetail } from '../mappers/log-mapper';
import { ActionType } from '../actions/actions';

const logLevels: LevelMap = {
  [LogLevel.error]: 3,
  [LogLevel.warn]: 4,
  [LogLevel.info]: 6,
  [LogLevel.debug]: 7
};

class Logger {
  private adapters: Adapter[];
  private isDoubleStringifyEnabled: boolean;
  constructor(props: LoggerProps) {
    this.adapters = props.adapters.filter(adapter => adapter.validate());
    this.isDoubleStringifyEnabled = props.isDoubleStringifyEnabled || false;
  }

  public info(action: ActionType, message: Message, requestContext?: LogContext) {
    const logDetail = mapLogDetail(message, action, requestContext, this.isDoubleStringifyEnabled);

    this.adapters.forEach((adapter: Adapter) => this.sendLog(adapter.info, logDetail, LogLevel.info));
  }

  public error(action: ActionType, message: Message, requestContext?: LogContext) {
    const logDetail = mapLogDetail(message, action, requestContext, this.isDoubleStringifyEnabled);

    this.adapters.forEach((adapter: Adapter) => this.sendLog(adapter.error, logDetail, LogLevel.error));
  }

  public warn(action: ActionType, message: Message, requestContext?: LogContext) {
    const logDetail = mapLogDetail(message, action, requestContext, this.isDoubleStringifyEnabled);

    this.adapters.forEach((adapter: Adapter) => this.sendLog(adapter.warn, logDetail, LogLevel.warn));
  }

  public debug(action: ActionType, message: Message, requestContext?: LogContext) {
    const logDetail = mapLogDetail(message, action, requestContext, this.isDoubleStringifyEnabled);

    this.adapters.forEach((adapter: Adapter) => this.sendLog(adapter.debug, logDetail, LogLevel.debug));
  }

  private getLogLevel() {
    const logLevelAsText = process.env.LOG_LEVEL || LogLevel.warn;

    let level: number = logLevels[logLevelAsText as LogLevel];

    if (typeof level === 'undefined') {
      level = logLevels[LogLevel.warn];
    }

    return level;
  }

  private sendLog(log: (log: AdapterLog) => void, logDetail: AdapterLog, level: LogLevel) {
    const logLevel = this.getLogLevel();

    if (logLevels[level] <= logLevel) {
      log(logDetail);
    }
  }
}

export { Logger };
