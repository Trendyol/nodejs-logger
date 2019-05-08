interface GraylogConfig {
  hostname: string;
  host: string;
  port: number;
  facility: string;
  bufferSize: number;
}

interface AdapterLog {
  message: string;
  meta: { [key: string]: string };
}

interface Adapter {
  info: (log: AdapterLog) => void;
  error: (log: AdapterLog) => void;
  warning: (log: AdapterLog) => void;
}

export { GraylogConfig, Adapter, AdapterLog };
