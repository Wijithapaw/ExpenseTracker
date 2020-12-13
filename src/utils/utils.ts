/* eslint-disable @typescript-eslint/no-var-requires */

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
  amount: number,
  cutDecimal = false,
  currencySymbol = '',
): string {
  return `${currencySymbol}${formatNumber(amount, cutDecimal).replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    '$1,',
  )}`;
}

function isFloat(value: number) {
  return value === +value && value !== (value | 0);
}

function formatNumber(value: number, cutDecimal = false) {
  return value.toFixed(!cutDecimal && isFloat(value) ? 2 : 0);
}
