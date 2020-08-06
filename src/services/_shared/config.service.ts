import { realm } from "../../data/realm.service";
import { ConfigSetting } from "../../data/entity-types";
import { KeyValuePair, ConfigItem } from "../../types/shared.types";

export const configService = {
    getValue,
    updateValue,
    getAllonfigItems
}

let allConfigs: KeyValuePair[];

function loadConfigs() {
    allConfigs = realm.objects<ConfigSetting>(ConfigSetting.schema.name)
    .map(c => ({ key: c.code, value: c.value}));
    return loadConfigs;
}

function getAllonfigItems() {
    let cofigs: ConfigItem[] = realm.objects<ConfigItem>(ConfigSetting.schema.name)
    .map(c => ({ id: c.id, description: c.description, value: c.value}));
    return cofigs;
}

function getValue(key: string) {
    if(allConfigs == undefined)
        loadConfigs();

    if(allConfigs) {
        let config = allConfigs.find(c => c.key == key);
        return config ? config.value : undefined;
    }
    return undefined;    
}

function updateValue(id: string, value: string) {
    realm.write(() => {
        let config = realm.objects<ConfigSetting>(ConfigSetting.schema.name).find(c => c.id == id);
        config.value = value;
        allConfigs = undefined;
    })
}

