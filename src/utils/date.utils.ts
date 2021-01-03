import moment from 'moment';

import { DateRange } from '../types/shared.types';

export const DATE_FORMATS = {
  dateUniversal: 'yyyy-MM-DD',
  longDate: 'dddd, D MMM',
  shortDate: 'ddd D MMM',
  time12h: 'h:mmA',
  monthYear: 'MMM, YYYY',
  shortDateWithTime12h: 'ddd D MMM, h:mmA',
};

export function isOnSameDay(d1: Date, d2: Date) {
  const date1 = new Date(d1).setHours(0, 0, 0, 0);
  const date2 = new Date(d2).setHours(0, 0, 0, 0);

  return date1.valueOf() === date2.valueOf();
}

export function formatDate(
  d: Date,
  format: string,
  displayFriendlyNames = false,
) {
  if (displayFriendlyNames) {
    const today = new Date();
    if (displayFriendlyNames && isOnSameDay(d, today)) {
      return 'Today';
    }

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (displayFriendlyNames && isOnSameDay(d, yesterday)) {
      return 'Yesterday';
    }
  }
  return formatDate2(d, format);
}

function formatDate2(d: Date, format: string) {
  return moment(d).local().format(format);
}

export function getBackwardMonthRange(date: Date, count: number): DateRange {
  const ref = new Date(date.getFullYear(), date.getMonth(), 1);
  const start = new Date(ref);
  start.setMonth(ref.getMonth() - (count - 1));
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  end.setMilliseconds(end.getMilliseconds() - 1);

  return { start, end };
}
