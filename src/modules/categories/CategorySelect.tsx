import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';

import Icon from '../../components/Icon';
import IconButton from '../../components/IconButton';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import { categoryService } from '../../services/category.service';
import {
  GlobalContextType,
  withGlobalContext,
} from '../../store/GlobalContext';
import { ListItemData, SimpleListItem } from '../../types/shared.types';
import { rgba } from '../../utils/color.utils';

interface Props extends GlobalContextType {
  visible: boolean;
  onClose: () => void;
  onSelect: (id: SimpleListItem) => void;
}

interface ItemProps {
  item: ListItemData;
  onPress: (e: ListItemData) => void;
}

const ItemRow = styled.TouchableHighlight.attrs((props: any) => ({
  activeOpacity: 1,
  underlayColor: rgba(props.theme.button.primary, 0.5),
}))`
  flex-direction: row;
  padding: 10px;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ItemIcon = styled.View`
  width: 30px;
`;

const BackButtonRow = styled.View`
  width: 100px;
  margin-bottom: 5px;
`;

const ItemTitle = styled.View``;

function CategoryItem({ item, onPress }: ItemProps) {
  return (
    <ItemRow onPress={() => onPress(item)}>
      <ItemContainer>
        {item.faIcon ? (
          <ItemIcon>
            <Icon name={item.faIcon} />
          </ItemIcon>
        ) : null}
        <ItemTitle>
          <Text>{item.title}</Text>
        </ItemTitle>
      </ItemContainer>
    </ItemRow>
  );
}

function CategorySelect({ visible, onClose, onSelect, refreshTrigger }: Props) {
  const [categories, setCategories] = useState<ListItemData[]>();
  const [parentItem, setParentItem] = useState<ListItemData>();

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  const loadData = () => {
    const categories = categoryService.getAllCategories();
    setCategories(categories);
  };

  const selectCategory = (item: ListItemData) => {
    if (item.data && item.data.length > 0) setParentItem(item);
    else {
      setParentItem(undefined);
      onSelect(item);
    }
  };

  const listShowing = parentItem ? parentItem.data : categories;

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      title={`Select Category${parentItem ? `: ${parentItem.title}` : ''}`}
    >
      {parentItem && (
        <BackButtonRow>
          <View>
            <IconButton
              name='arrow-left'
              size={25}
              onPress={() => setParentItem(undefined)}
            />
          </View>
        </BackButtonRow>
      )}
      <FlatList
        data={listShowing}
        renderItem={({ item }) => (
          <CategoryItem item={item} onPress={selectCategory} />
        )}
      />
    </Modal>
  );
}

export default withGlobalContext(CategorySelect);
