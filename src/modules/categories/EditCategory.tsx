import * as React from 'react';
import {FlatListItemData} from '../../types/shared.types';
import {View} from 'react-native';
import {useState, useEffect} from 'react';
import {categoryService} from '../../services/category.service';
import IconButton from '../../components/IconButton';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import styled from 'styled-components/native';
import Text from '../../components/Text';

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

interface Props {
  item?: FlatListItemData;
  onSave?: () => void;
  onCancel?: () => void;
  onChangeIcon?: () => void;
  onChange?: (e: any) => void;
  parentItem?: FlatListItemData;
}

export default function EditCategory({
  item,
  onSave,
  onCancel,
  onChangeIcon,
  onChange,
  parentItem,
}: Props) {
  const [valid, setValid] = useState(true);


  const parentTitle = parentItem && parentItem.title || item.parentTitle;
  const rootCategory = !parentTitle;

  useEffect(() => {
    validate();
  }, [item]);

  const titleChanged = (e: string) => {
    onChange({title: e});
  };

  const save = () => {
    if (validate()) {
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
    }
  };

  const validate = () => {
    let valid = item.title && item.title.length > 0;
    setValid(valid);
    return valid;
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
            invalid={!valid}
            value={item.title}
            placeholder=""
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
            />
          </ValueCol>
        </Row>
      )) ||
        undefined}
      <ButtonRow>
        <ButtonContainer>
          <Button
            title="Cancel"
            onPress={() => onCancel && onCancel()}
            icon="save"
          />
        </ButtonContainer>
        <ButtonContainer>
          <Button title="Save" onPress={save} icon="save" />
        </ButtonContainer>
      </ButtonRow>
    </View>
  );
}
