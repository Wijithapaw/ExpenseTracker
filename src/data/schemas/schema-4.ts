
import { Expense, ExpenseType } from './schema-3'
import { utils } from '../../utils/utils';
import { ConfigSettings } from '../../types/constants';

const SCHEMA_VERSION = 4;

class ConfigSetting {
    public static schema: Realm.ObjectSchema = {
        name: 'ConfigSetting',
        primaryKey: 'id',
        properties: {
            id: 'string',
            code: 'string',
            value: 'string',
            description: 'string',
            inactive: 'bool'
        }
    }

    id: string;
    code: string;
    description: string;
    value: string;
    inactive: boolean;

    constructor(id: string, code: string, description: string, value: string, inactive: boolean = false) {
        this.id = id;
        this.code = code;
        this.value = value;
        this.description = description;
        this.inactive = inactive;
    }
}

export { Expense, ExpenseType, ConfigSetting }

const migrationFunc = (oldRealm: Realm, newRealm: Realm) => {
    // only apply this change if upgrading to schemaVersion 2
    if (oldRealm.schemaVersion < SCHEMA_VERSION) {
        newRealm.create(ConfigSetting.schema.name, new ConfigSetting(utils.uuid(),  ConfigSettings.currencySymbol, "Currency Symbol",  "$"));
        newRealm.create(ConfigSetting.schema.name, new ConfigSetting(utils.uuid(),  ConfigSettings.monthlyBudget, "Monthly Budget",  "0"));
    }
}

export const schema4 = { schema: [Expense.schema, ExpenseType.schema, ConfigSetting.schema], schemaVersion: SCHEMA_VERSION, migration: migrationFunc }
