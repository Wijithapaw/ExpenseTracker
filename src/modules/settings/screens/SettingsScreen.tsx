import * as React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import Button from '../../../components/Button';
import IconButton from '../../../components/IconButton';
import Screen from '../../../components/Screen';
import Text from '../../../components/Text';
import TextInput from '../../../components/TextInput';
import showToast from '../../../components/Toast';
import { configService } from '../../../services/_shared/config.service';
import { FontSize } from '../../../types/enums';
import { ConfigItem } from '../../../types/shared.types';

const ItemRow = styled.View`
  flex-direction: row;
  margin: 10px 0;
`;

const IconCol = styled.View`
  justify-content: center;
  align-items: flex-end;
  width: 70px;
`;

const KeyCol = styled.View`
  min-width: 120px;
  justify-content: center;
`;

const ValueCol = styled.View`
  flex: 2;
  margin-left: 5px;
  justify-content: center;
`;

const EditButtons = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;

interface Props {
  navigation: any;
}

export default function SettingsScreen({ navigation }: Props) {
  const [configSettings, setConfigSettings] = useState<ConfigItem[]>();
  const [editingId, setEditingId] = useState<string>();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const data = configService.getAllConfigItems();
    setConfigSettings(data);
  };

  const update = () => {
    const item = configSettings.find(c => c.id == editingId);
    configService.updateValue(editingId, item.value);
    setEditingId(undefined);
    loadItems();
    showToast('Settings updated');
  };

  const cancelEdit = () => {
    setEditingId(undefined);
  };

  const handleChange = (id: string, value: string) => {
    const settings = [...configSettings];
    const item = settings.find(c => c.id == id);
    item.value = value;
    setConfigSettings(settings);
  };

  const editCategories = () => {
    navigation.navigate('CategorySelect');
  };

  return (
    <Screen>
      <View>
        {configSettings &&
          configSettings.map(c => {
            return (
              <ItemRow key={c.id}>
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
                    <EditButtons>
                      <IconButton name='ban' onPress={cancelEdit} />
                      <IconButton name='save' onPress={update} />
                    </EditButtons>
                  )) || (
                    <IconButton
                      name='pencil'
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
        <Button onPress={editCategories} title='Edit Categories' />
      </View>
    </Screen>
  );
}
