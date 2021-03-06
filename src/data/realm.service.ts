import Realm from 'realm';

import { schemas } from './schemas';

export const realmService = {
  closeRealm,
  getRealm,
};

// The first schema to update to is the current schema version
// since the first schema in our array is at nextSchemaIndex:
const currentSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
const latestSchemaIndex = schemas.length - 1;
let nextSchemaIndex = currentSchemaIndex + 1;

while (nextSchemaIndex < latestSchemaIndex) {
  const migratedRealm = new Realm(schemas[nextSchemaIndex++]);
  migratedRealm.close();
}

export const realm: Realm = new Realm(schemas[latestSchemaIndex]);

function closeRealm() {
  realm.close();
}

function getRealm() {
  return realm;
}
