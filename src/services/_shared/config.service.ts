import { realm } from '../../data/realm.service';
import { ConfigSetting } from '../../data/entity-types';
import { KeyValuePair, ConfigItem } from '../../types/shared.types';

export const configService = {
  getValue,
  updateValue,
  getAllConfigItems,
};

let allConfigs: KeyValuePair[];

function loadConfigs() {
  allConfigs = realm
    .objects<ConfigSetting>(ConfigSetting.schema.name)
    .map(c => ({ key: c.code, value: c.value }));
  return loadConfigs;
}

function getAllConfigItems() {
  const configs: ConfigItem[] = realm
    .objects<ConfigItem>(ConfigSetting.schema.name)
    .map(c => ({ id: c.id, description: c.description, value: c.value }));
  return configs;
}

function getValue(key: string) {
  if (allConfigs == undefined) loadConfigs();

  if (allConfigs) {
    const config = allConfigs.find(c => c.key == key);
    return config ? config.value : undefined;
  }
  return undefined;
}

function updateValue(id: string, value: string) {
  realm.write(() => {
    const config = realm
      .objects<ConfigSetting>(ConfigSetting.schema.name)
      .find(c => c.id == id);
    config.value = value;
    allConfigs = undefined;
  });
}
