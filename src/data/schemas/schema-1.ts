import * as Realm from 'realm';
import { utils } from '../../utils/utils';

const SCHEMA_VERSION = 1;

export class Expense {
  public static schema: Realm.ObjectSchema = {
    name: 'Expense',
    primaryKey: 'id',
    properties: {
      id: 'string',
      type: 'ExpenseType',
      amount: 'float',
      date: 'date',
      createdDate: 'date',
      description: 'string?',
    },
  };

  public id: string;
  public type?: ExpenseType;
  public amount: number;
  public date: Date;
  public description?: string;
  public createdDate: Date;

  constructor(
    id: string,
    amount: number,
    date: Date,
    createdDate: Date,
    type?: ExpenseType,
    description?: string,
  ) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.description = description;
    this.createdDate = createdDate;
  }
}

export class ExpenseType {
  public static schema: Realm.ObjectSchema = {
    name: 'ExpenseType',
    primaryKey: 'id',
    properties: {
      id: 'string',
      code: 'string',
      displayText: 'string',
      inactive: 'bool',
      parentType: 'ExpenseType',
    },
  };

  id: string;
  code: string;
  displayText: string;
  inactive: boolean;
  parentType?: ExpenseType;

  constructor(
    id: string,
    code: string,
    displayText: string,
    inactive: boolean,
    parentType?: ExpenseType,
  ) {
    this.id = id;
    this.code = code;
    this.displayText = displayText;
    this.inactive = inactive;
    this.parentType = parentType;
  }
}

const migrationFunc = (oldRealm: Realm, newRealm: Realm) => {
  // only apply this change if upgrading to schemaVersion 2
  if (oldRealm.schemaVersion < SCHEMA_VERSION) {
    const generalType = new ExpenseType(
      utils.uuid(),
      'GENERAL',
      'General',
      false,
    );
    newRealm.create(ExpenseType.schema.name, generalType);

    const newObjects = newRealm.objects<Expense>(Expense.schema.name);

    // loop through all objects and set the type property in the new schema as General
    for (let i = 0; i < newObjects.length; i++) {
      newObjects[i].type = generalType;
      newObjects[i].description = undefined;
    }
  }
};

export const schema1 = {
  schema: [Expense.schema, ExpenseType.schema],
  schemaVersion: SCHEMA_VERSION,
  migration: migrationFunc,
};
