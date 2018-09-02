import Logger from 'js-logger';

if (process.env.NODE_ENV !== 'production') {
  Logger.useDefaults();
}
