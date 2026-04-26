import { Injectable, LoggerService, LogLevel } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  private formatMessage(level: string, message: any, context?: string, meta?: any) {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'App';
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level.toUpperCase()}] [${ctx}] ${message}${metaStr}`;
  }

  log(message: any, context?: string) {
    console.log(this.formatMessage('info', message, context));
  }

  error(message: any, trace?: string, context?: string) {
    console.error(this.formatMessage('error', message, context));
    if (trace) console.error(trace);
  }

  warn(message: any, context?: string) {
    console.warn(this.formatMessage('warn', message, context));
  }

  debug(message: any, context?: string) {
    console.debug(this.formatMessage('debug', message, context));
  }

  verbose(message: any, context?: string) {
    console.log(this.formatMessage('verbose', message, context));
  }

  info(message: any, meta?: object, context?: string) {
    console.log(this.formatMessage('info', message, context, meta));
  }
}