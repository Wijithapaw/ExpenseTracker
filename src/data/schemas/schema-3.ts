import { Expense } from './schema-1';

const SCHEMA_VERSION = 3;

class ExpenseType {
  public static schema: Realm.ObjectSchema = {
    name: 'ExpenseType',
    primaryKey: 'id',
    properties: {
      id: 'string',
      code: 'string',
      displayText: 'string',
      inactive: 'bool',
      parentType: 'ExpenseType',
      faIcon: 'string',
    },
  };

  id: string;
  code: string;
  displayText: string;
  inactive: boolean;
  parentType?: ExpenseType;
  faIcon?: string;

  constructor(
    id: string,
    code: string,
    displayText: string,
    inactive: boolean,
    parentType?: ExpenseType,
    faIcon?: string,
  ) {
    this.id = id;
    this.code = code;
    this.displayText = displayText;
    this.inactive = inactive;
    this.parentType = parentType;
    this.faIcon = faIcon;
  }
}

export { Expense, ExpenseType };

const migrations = (oldRealm: Realm, newRealm: Realm) => {
  // only apply this change if upgrading to schemaVersion 2
  if (oldRealm.schemaVersion < SCHEMA_VERSION) {
    //Car
    const car = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'CAR');
    car.faIcon = 'car';

    //Foods
    const food = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'FOOD');
    food.faIcon = 'cutlery';

    //Bills
    const bills = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'BILLS');
    bills.faIcon = 'money';

    //Health care
    const healthCare = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'HEALTH');
    healthCare.faIcon = 'plus-square';

    //Toiletries
    const toiletries = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'TOILETRIES');
    toiletries.faIcon = 'bath';

    //Transportation
    const transportation = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'TRANSPOTATION');
    transportation.faIcon = 'bus';

    //Entertainment
    const entertainment = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'ENTERTAINMENT');
    entertainment.faIcon = 'music';

    //Pet care
    const petCare = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'PER_CARE');
    petCare.faIcon = 'paw';

    //Stationary
    const stationary = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'STATIONARY');
    stationary.faIcon = 'book';

    //Clothing
    const clothing = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'CLOTHING');
    clothing.faIcon = 'suitcase';

    //Gifts
    const gifts = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'GIFTS');
    gifts.faIcon = 'gift';

    //General
    const general = newRealm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(t => t.code == 'GENERAL');
    general.faIcon = 'star';
  }
};

export const schema3 = {
  schema: [Expense.schema, ExpenseType.schema],
  schemaVersion: SCHEMA_VERSION,
  migration: migrations,
};
