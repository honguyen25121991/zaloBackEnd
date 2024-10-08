import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const { combine, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  const vnTime = new Date(timestamp);
  vnTime.setHours(vnTime.getHours() + 7); // Chuyển đổi sang múi giờ GMT+7

  const formattedTime = vnTime.toISOString().replace('T', ' ').substring(0, 19); // Định dạng lại thời gian

  return `${formattedTime} [${level}]: ${message}`;
});

export const logger = createLogger({
  format: combine(
    format.timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});