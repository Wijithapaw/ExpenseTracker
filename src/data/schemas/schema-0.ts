import * as Realm from 'realm'

const SCHEMA_VERSION = 0;

export class Expense {
  public static schema: Realm.ObjectSchema = {
    name: 'Expense',
    primaryKey: 'id',
    properties: {
      id: 'string',
      type: 'string',
      amount: 'float',
      date: 'date'
    }
  }

  public id: string;
  public type: string;
  public amount: number;
  public date: Date;

  constructor(id: string, type: string, amount: number, date: Date) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.date = date;
  }
};

export class ExpenseType {
  public static schema: Realm.ObjectSchema = {
    name: 'ExpenseType',
    primaryKey: 'id',
    properties: {
      id: 'string',
      code: 'string',
      displayText: 'string',
      inactive: 'bool',
      parentType: 'ExpenseType?'
    }
  }

  id: string;
  code: string;
  displayText: string;
  inactive: boolean;
  parentType?: ExpenseType;

  constructor(id: string, code: string, displayText: string, inactive: boolean, parentType?: ExpenseType) {
    this.id = id;
    this.code = code;
    this.displayText = displayText;
    this.inactive = inactive;
    this.parentType = parentType;
  }
}

export const schema0 = { schema: [Expense.schema, ExpenseType.schema], schemaVersion: SCHEMA_VERSION }


