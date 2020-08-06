import { schemas } from "./schemas";

const Realm = require('realm');

export const realmService = {
    closeRelm,
    getRealm
}

// The first schema to update to is the current schema version
// since the first schema in our array is at nextSchemaIndex:
let currentSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
let latestSchemaIndex = schemas.length - 1;
let nextSchemaIndex = currentSchemaIndex + 1;

while(nextSchemaIndex < latestSchemaIndex) {
    const migratedRealm = new Realm(schemas[nextSchemaIndex++]);
    migratedRealm.close();
}

export const realm: Realm = new Realm(schemas[latestSchemaIndex]);

function closeRelm() {
    realm.close();
}

function getRealm() {
    return realm;
}