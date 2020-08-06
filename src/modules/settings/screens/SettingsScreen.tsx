import * as React from 'react';
import {View} from 'react-native';
import {useEffect, useState} from 'react';
import {configService} from '../../../services/_shared/config.service';
import {ConfigItem} from '../../../types/shared.types';
import {FontSize} from '../../../types/enums';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import TextInput from '../../../components/TextInput';
import styled from 'styled-components/native';
import Screen from '../../../components/Screen';
import IconButton from '../../../components/IconButton';

const ItemRow = styled.View`
  flex-direction: row;
  margin: 10px 0;
`;

const IconCol = styled.View`
  justify-content: center;
  align-items: center;
  width: 50px;
`;

const KeyCol = styled.View`
  flex: 1
`

const ValueCol = styled.View`
  flex: 2
`

interface Props {
  navigation: any;
}

export default function SettingsScreen({navigation}: Props) {
  const [configSettings, setConfigSettings] = useState<ConfigItem[]>();
  const [editingId, setEditingId] = useState<string>();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    let data = configService.getAllonfigItems();
    setConfigSettings(data);
  };

  const update = () => {
    let item = configSettings.find(c => c.id == editingId);
    configService.updateValue(editingId, item.value);
    setEditingId(undefined);
    loadItems();
  };

  const handleChange = (id: string, value: string) => {
    let settings = [...configSettings];
    let item = settings.find(c => c.id == id);
    item.value = value;
    setConfigSettings(settings);
  };

  const editCategories = () => {
    navigation.navigate('CategorySelect')
  };

  return (
    <Screen>
      <View>
        {configSettings &&
          configSettings.map((c, i) => {
            return (
              <ItemRow key={i}>
                <KeyCol>
                  <Text size={FontSize.Regular}>{c.description}</Text>
                </KeyCol>
                <ValueCol>
                  {(editingId == c.id && (
                    <TextInput
                      maxLength={100}
                      value={c.value}
                      onChangeText={e => handleChange(c.id, e)}
                    />
                  )) || <Text>{c.value}</Text>}
                </ValueCol>
                <IconCol>
                  {(editingId == c.id && (
                    <IconButton key={i} name="save" onPress={update} />
                  )) || (
                    <IconButton
                      key={i}
                      name="pencil"
                      onPress={() => {
                        setEditingId(c.id);
                      }}
                    />
                  )}
                </IconCol>
              </ItemRow>
            );
          })}
      </View>
      <View>
        <Button onPress={editCategories} title="Edit Categories" />
      </View>
    </Screen>
  );
}
