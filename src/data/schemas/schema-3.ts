
import { Expense } from './schema-1'

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
            faIcon: 'string'
        }
    }

    id: string;
    code: string;
    displayText: string;
    inactive: boolean;
    parentType?: ExpenseType;
    faIcon?: string;

    constructor(id: string, code: string, displayText: string, inactive: boolean, parentType?: ExpenseType, faIcon?: string) {
        this.id = id;
        this.code = code;
        this.displayText = displayText;
        this.inactive = inactive;
        this.parentType = parentType;
        this.faIcon = faIcon
    }
}

export { Expense, ExpenseType }

const migrationFunc = (oldRealm: Realm, newRealm: Realm) => {
    // only apply this change if upgrading to schemaVersion 2
    if (oldRealm.schemaVersion < SCHEMA_VERSION) {
        //Car
        var car = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "CAR");
        car.faIcon = 'car'

        //Foods
        var food = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "FOOD");
        food.faIcon = 'carrot'

        //Bills
        var bills = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "BILLS");
        bills.faIcon = 'donate'

        //Health care
        var healthCare = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "HEALTH");
        healthCare.faIcon = 'briefcase-medical'

        //Toiletries
        var toilatories = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "TOILETRIES");
        toilatories.faIcon = 'bath'

        //Transpotation
        var transpotation = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "TRANSPOTATION");
        transpotation.faIcon = 'bus'

        //Entertainment
        var entertainment = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "ENTERTAINMENT");
        entertainment.faIcon = 'music'

        //Pet care
        var petCare = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "PER_CARE");
        petCare.faIcon = 'dog'

        //Stationary
        var stationary = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "STATIONARY");
        stationary.faIcon = 'book-open'

        //Clothing
        var cloting = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "CLOTHING");
        cloting.faIcon = 'tshirt'

        //Gifts
        var gifts = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "GIFTS");
        gifts.faIcon = 'xbox'

         //General
         var general = newRealm.objects<ExpenseType>(ExpenseType.schema.name).find(t => t.code == "GENERAL");
         general.faIcon = 'creative-commons-nd'
    }
}

export const schema3 = { schema: [Expense.schema, ExpenseType.schema], schemaVersion: SCHEMA_VERSION, migration: migrationFunc }
