import { utils } from '../../utils/utils';
import { Expense, ExpenseType } from './schema-1';

export { Expense, ExpenseType };

const SCHEMA_VERSION = 2;

const migrations = (oldRealm: Realm, newRealm: Realm) => {
  // only apply this change if upgrading to schemaVersion 2
  if (oldRealm.schemaVersion < SCHEMA_VERSION) {
    //Car
    const car = newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'CAR', 'Car', false),
    );

    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'CAR_FUEL', 'Fuel', false, car),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(
        utils.uuid(),
        'CAR_MAINTENANCE',
        'Maintenance',
        false,
        car,
      ),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'CAR_TOLLS', 'Tolls', false, car),
    );

    //Foods
    const food = newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'FOOD', 'Food', false),
    );

    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'FOOD_FISH', 'Fish', false, food),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(
        utils.uuid(),
        'FOOD_MEAT_EGG',
        'Meal and Egg',
        false,
        food,
      ),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(
        utils.uuid(),
        'FOOD_VEGETABLES',
        'Vegetables',
        false,
        food,
      ),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'FOOD_EAT_OUT', 'Eat Out', false, food),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'FOOD_SNACKS', 'Snacks', false, food),
    );

    //Bills
    const bills = newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'BILLS', 'Bills', false),
    );

    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'BILLS_WATER', 'Water', false, bills),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(
        utils.uuid(),
        'BILLS_ELECTRICITY',
        'Electricity',
        false,
        bills,
      ),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(
        utils.uuid(),
        'BILLS_TELEPHONE',
        'Telephone',
        false,
        bills,
      ),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'BILLS_INTERNET', 'Internet', false, bills),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'BILLS_TV', 'TV', false, bills),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'BILLS_RENT', 'Rent', false, bills),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'BILLS_GAS', 'Gas', false, bills),
    );

    //Health care
    const healthCare = new ExpenseType(
      utils.uuid(),
      'HEALTH',
      'Health Care',
      false,
    );
    newRealm.create(ExpenseType.schema.name, healthCare);

    //Toiletries
    const toiletries = new ExpenseType(
      utils.uuid(),
      'TOILETRIES',
      'Toiletries',
      false,
    );
    newRealm.create(ExpenseType.schema.name, toiletries);

    //Transportation
    const transportation = newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(utils.uuid(), 'TRANSPOTATION', 'Transportation', false),
    );

    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(
        utils.uuid(),
        'TRANSPOTATION_TAXI',
        'Taxi',
        false,
        transportation,
      ),
    );
    newRealm.create(
      ExpenseType.schema.name,
      new ExpenseType(
        utils.uuid(),
        'TRANSPOTATION_PUBLIC',
        'Public',
        false,
        transportation,
      ),
    );

    //Entertainment
    const entertainment = new ExpenseType(
      utils.uuid(),
      'ENTERTAINMENT',
      'Entertainment',
      false,
    );
    newRealm.create(ExpenseType.schema.name, entertainment);

    //Pet care
    const petCare = new ExpenseType(
      utils.uuid(),
      'PER_CARE',
      'Pet Care',
      false,
    );
    newRealm.create(ExpenseType.schema.name, petCare);

    //Stationary
    const stationary = new ExpenseType(
      utils.uuid(),
      'STATIONARY',
      'Stationary',
      false,
    );
    newRealm.create(ExpenseType.schema.name, stationary);

    //Clothing
    const clothing = new ExpenseType(
      utils.uuid(),
      'CLOTHING',
      'Clothing',
      false,
    );
    newRealm.create(ExpenseType.schema.name, clothing);

    //Gifts
    const gifts = new ExpenseType(utils.uuid(), 'GIFTS', 'Gifts', false);
    newRealm.create(ExpenseType.schema.name, gifts);
  }
};

export const schema2 = {
  schema: [Expense.schema, ExpenseType.schema],
  schemaVersion: SCHEMA_VERSION,
  migration: migrations,
};
