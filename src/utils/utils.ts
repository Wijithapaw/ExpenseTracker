/* eslint-disable @typescript-eslint/no-var-requires */
//import {configService} from '../services/_shared/config.service';
import { ConfigSettings } from '../types/constants';

// eslint-disable-next-line spellcheck/spell-checker
const uuidv4 = require('uuid/v4');

export const utils = {
  uuid,
  formatCurrency,
  isFloat,
  formatNumber,
};

function uuid(): string {
  // eslint-disable-next-line spellcheck/spell-checker
  return uuidv4();
}

function formatCurrency(
  value: number,
  cutDecimal = false,
  hideSymbol = false,
): string {
  const currencySymbol = 'Rs. '; //configService.getValue(ConfigSettings.currencySymbol);
  return `${hideSymbol ? '' : currencySymbol}${formatNumber(
    value,
    cutDecimal,
  ).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}

function isFloat(value: number) {
  return value === +value && value !== (value | 0);
}

function formatNumber(value: number, cutDecimal = false) {
  return value.toFixed(!cutDecimal && isFloat(value) ? 2 : 0);
}
