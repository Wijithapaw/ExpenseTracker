
import { Expense, ExpenseType } from './schema-1'
import { utills } from '../../utills/utills';

export { Expense, ExpenseType }

const SCHEMA_VERSION = 2;

const migrationFunc = (oldRealm: Realm, newRealm: Realm) => {
    // only apply this change if upgrading to schemaVersion 2
    if (oldRealm.schemaVersion < SCHEMA_VERSION) {
        //Car
        let car = newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "CAR", "Car", false));

        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "CAR_FUEL", "Fuel", false, car));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "CAR_MAINTENANCE", "Maintenance", false, car));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "CAR_TOLLS", "Tolls", false, car));

        //Foods
        let food =  newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "FOOD", "Food", false));

        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "FOOD_FISH", "Fish", false, food));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "FOOD_MEAT_EGG", "Meal and Egg", false, food));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "FOOD_VEGITABLES", "Vegitables", false, food));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "FOOD_EAT_OUT", "Eat Out", false, food));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "FOOD_SNACKS", "Snacks", false, food));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "FOOD_OTHER", "Other", false, food));

        //Bills
        let bills = newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "BILLS", "Bills", false));

        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "BILLS_WATER", "Water", false, bills));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "BILLS_ELECTRICITY", "Electricity", false, bills));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "BILLS_TELEPHONE", "Telephone", false, bills));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "BILLS_INTERNET", "Internet", false, bills));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "BILLS_TV", "TV", false, bills));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "BILLS_RENT", "Rent", false, bills));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "BILLS_GAS", "Gas", false, bills));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "BILLS_OTHER", "Other", false, bills));
      
        //Health care
        let healthCare = new ExpenseType(utills.uuid(), "HEALTH", "Health Care", false);
        newRealm.create(ExpenseType.schema.name, healthCare);

        //Toiletries
        let toilatories = new ExpenseType(utills.uuid(), "TOILETRIES", "Toiletries", false);
        newRealm.create(ExpenseType.schema.name, toilatories);

        //Transpotation
        let transpotation =  newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "TRANSPOTATION", "Transpotation", false));       

        newRealm.create(ExpenseType.schema.name,  new ExpenseType(utills.uuid(), "TRANSPOTATION_TAXI", "Taxi", false, transpotation));
        newRealm.create(ExpenseType.schema.name, new ExpenseType(utills.uuid(), "TRANSPOTATION_PUBLIC", "Public", false, transpotation));

        //Entertainment
        let entertainment = new ExpenseType(utills.uuid(), "ENTERTAINMENT", "Entertainment", false);
        newRealm.create(ExpenseType.schema.name, entertainment);

        //Pet care
        let petCare = new ExpenseType(utills.uuid(), "PER_CARE", "Pet Care", false);
        newRealm.create(ExpenseType.schema.name, petCare);

        //Stationary
        let stationary = new ExpenseType(utills.uuid(), "STATIONARY", "Stationary", false);
        newRealm.create(ExpenseType.schema.name, stationary);

        //Clothing
        let clothing = new ExpenseType(utills.uuid(), "CLOTHING", "Clothing", false);
        newRealm.create(ExpenseType.schema.name, clothing);

        //Gifts
        let gifts = new ExpenseType(utills.uuid(), "GIFTS", "Gifts", false);
        newRealm.create(ExpenseType.schema.name, gifts);
    }
}

export const schema2 = { schema: [Expense.schema, ExpenseType.schema], schemaVersion: SCHEMA_VERSION, migration: migrationFunc }
