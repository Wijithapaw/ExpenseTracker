//import {configService} from '../services/_shared/config.service';
import { ConfigSettings } from '../types/constants';

const uuidv4 = require('uuid/v4');

export const utils = {
  uuid,
  formatCurrency,
  isFloat,
  formatNumber,
};

function uuid() {
  return uuidv4();
}

function formatCurrency(num, cutDecimal = false, hideSymbol = false) {
  const currencySym = 'Rs. '; //configService.getValue(ConfigSettings.currencySymbol);
  return `${hideSymbol ? '' : currencySym}${formatNumber(
    num,
    cutDecimal,
  ).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}

function isFloat(n: any) {
  return n === +n && n !== (n | 0);
}

function formatNumber(n: number, cutDecimal = false) {
  return n.toFixed(!cutDecimal && isFloat(n) ? 2 : 0);
}
