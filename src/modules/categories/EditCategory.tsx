import * as React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import showToast, { ToastType } from '../../components/Toast';
import { categoryService } from '../../services/category.service';
import {
  GlobalContextType,
  withGlobalContext,
} from '../../store/GlobalContext';
import { COLORS } from '../../types/colors';
import { FlatListItemData } from '../../types/shared.types';

const Row = styled.View`
  padding: 5px 0;
  flex-direction: row;
`;

const LabelCol = styled.View`
  width: 50px;
  flex-direction: column;
  justify-content: center;
`;

const ValueCol = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const ButtonRow = styled(Row)`
  margin-top: 10px;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  margin: 5px;
`;

interface Props extends GlobalContextType {
  item?: FlatListItemData;
  onSave?: () => void;
  onCancel?: () => void;
  onChangeIcon?: () => void;
  onChange?: (e: any) => void;
  parentItem?: FlatListItemData;
}

function EditCategory({
  item,
  onSave,
  onCancel,
  onChangeIcon,
  onChange,
  parentItem,
  refreshData,
}: Props) {
  const [errors, setErrors] = useState({ title: false, icon: false });

  const parentTitle = (parentItem && parentItem.title) || item.parentTitle;
  const rootCategory = !parentTitle;

  useEffect(() => {
    checkErrors();
  }, [item]);

  const titleChanged = (e: string) => {
    onChange({ title: e });
  };

  const save = () => {
    if (!checkErrors()) {
      if (!item.id) {
        categoryService.createCategory(
          item.title,
          item.faIcon,
          parentItem && parentItem.id,
        );
      } else {
        categoryService.updateCategory(item.id, item.title, item.faIcon);
      }
      onSave && onSave();
      refreshData();
    } else {
      showToast('Fill required fields', ToastType.Error);
    }
  };

  const checkErrors = () => {
    const title = !item.title;
    const icon = !item.faIcon;
    setErrors({ title, icon });
    return title || icon;
  };

  return (
    <View>
      <Row>
        <LabelCol>
          <Text>Title</Text>
        </LabelCol>
        <ValueCol>
          <TextInput
            maxLength={50}
            invalid={errors.title}
            value={item.title}
            placeholder=''
            onChangeText={titleChanged}
          />
        </ValueCol>
      </Row>
      {parentTitle && (
        <Row>
          <LabelCol />
          <ValueCol>
            <Text italic>{`[Parent Category:  ${parentTitle}]`}</Text>
          </ValueCol>
        </Row>
      )}
      {(rootCategory && (
        <Row>
          <LabelCol>
            <Text>Icon</Text>
          </LabelCol>
          <ValueCol>
            <IconButton
              name={item.faIcon || 'question-circle'}
              size={20}
              onPress={onChangeIcon}
              color={errors.icon ? COLORS.red : undefined}
            />
          </ValueCol>
        </Row>
      )) ||
        undefined}
      <ButtonRow>
        <ButtonContainer>
          <Button title='Cancel' onPress={() => onCancel && onCancel()} />
        </ButtonContainer>
        <ButtonContainer>
          <Button title='Save' onPress={save} />
        </ButtonContainer>
      </ButtonRow>
    </View>
  );
}

export default withGlobalContext(EditCategory);
