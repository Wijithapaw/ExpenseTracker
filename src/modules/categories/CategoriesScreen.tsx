import React, { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import styled from 'styled-components/native';

import Icon from '../../components/Icon';
import IconButton from '../../components/IconButton';
import IconPicker from '../../components/IconPicker';
import Modal from '../../components/Modal';
import Screen from '../../components/Screen';
import { messagingService } from '../../services/_shared/messaging.service';
import { categoryService } from '../../services/category.service';
import {
  GlobalContextType,
  withGlobalContext,
} from '../../store/GlobalContext';
import { COLORS } from '../../types/colors';
import { ScreenMode } from '../../types/enums';
import {
  FlatListItemData,
  ListItemData,
  SimpleListItem,
} from '../../types/shared.types';
import EditCategory from './EditCategory';

const ItemRow = styled.View<any>`
  flex-direction: row;
  padding: 4px;
  background-color: ${(props: any) =>
    props.selected ? props.theme.button.primary : COLORS.transparent};
`;

const Body = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

const IconCol = styled.View`
  width: 35px;
  align-items: center;
  justify-content: center;
`;

const TextCol = styled.View`
  flex: 1;
  justify-content: center;
`;

const ActionBtnCol = styled.View`
  width: 30px;
  align-items: center;
  justify-content: center;
  margin: 0 3px;
`;

const AddNewRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export interface Props extends GlobalContextType {
  callback?: (id: SimpleListItem) => void;
  selectedId?: string;
  mode?: ScreenMode;
}

function CategoriesScreen({ selectedId, refreshData }: Props) {
  const [categories, setCategories] = useState<FlatListItemData[]>([]);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<FlatListItemData>();
  const [parentItem, setParentItem] = useState<FlatListItemData>();
  const [showIconPicker, setShowIconPicker] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const categories = categoryService.getAllCategories();
    const items = flattenList(categories);
    setCategories(items);
  };

  const flattenList = (data: ListItemData[]) => {
    const flatList: FlatListItemData[] = [];

    data.map(val => {
      const items = flattenSingleItem(val, 0);
      flatList.push(...items);
    });

    return flatList;
  };

  const flattenSingleItem = (
    item: ListItemData,
    level: number,
    parentId?: string,
    parentTitle?: string,
    show?: boolean,
  ) => {
    const flatItems: FlatListItemData[] = [];

    const itemFlatten: FlatListItemData = {
      id: item.id,
      title: item.title,
      faIcon: item.faIcon,
      expanded:
        item.data && item.data.findIndex(i => i.id == selectedId) >= 0
          ? true
          : false,
      show: show || level == 0,
      parentId: parentId,
      parentTitle: parentTitle,
      level,
      hasChildren: item.data && item.data.length > 0,
    };

    const subItems =
      item.data &&
      item.data.map(child =>
        flattenSingleItem(
          child,
          level + 1,
          item.id,
          item.title,
          itemFlatten.expanded,
        ),
      );

    flatItems.push(itemFlatten);
    subItems &&
      subItems.forEach(element => {
        flatItems.push(...element);
      });

    return flatItems;
  };

  const toggleItems = (parentId: string) => {
    const newList = [...categories];
    const item = categories.find(c => c.id == parentId);
    if (item) {
      item.expanded = !item.expanded;

      categories
        .filter(c => c.parentId == parentId)
        .forEach(c => (c.show = item.expanded));
    }
    setCategories(newList);
  };

  const onEdit = (data: FlatListItemData) => {
    setShowEdit(true);
    setEditingItem(data);
    setParentItem(undefined);
  };

  const onDelete = (id: string) => {
    if (!categoryService.isCategoryInUsed(id)) {
      messagingService.confirm('Delete Category', 'Are you sure?', () => {
        categoryService.deleteCategory(id);
        loadData();
        refreshData();
      });
    } else {
      Alert.alert(
        'Already in Use',
        'This category is in use. Please delete/modify all the associate expense entries and try again.',
      );
    }
  };

  const onSaveCompleted = () => {
    loadData();

    setShowEdit(false);
    setParentItem(undefined);
  };

  const onUpdateCancel = () => {
    setShowEdit(false);
    setParentItem(undefined);
  };

  const onAdd = (parent?: FlatListItemData) => {
    setShowEdit(true);
    setEditingItem({ title: '', id: '', level: 0 });
    setParentItem(parent);
  };

  const handleIconSelect = (icon: string) => {
    setEditingItem({ ...editingItem, faIcon: icon });
    setShowIconPicker(false);
  };

  const handleEditingItemOnChange = (e: any) => {
    setEditingItem({ ...editingItem, ...e });
  };

  return (
    <Screen>
      <AddNewRow>
        <IconButton name='plus-circle' size={25} onPress={() => onAdd()} />
      </AddNewRow>
      <Body>
        {categories
          .filter(c => c.show)
          .map((l, i) => (
            <ItemRow key={i} selected={selectedId === l.id}>
              <IconCol>{l.faIcon ? <Icon name={l.faIcon} /> : null}</IconCol>
              <TextCol style={{ paddingLeft: 10 * l.level + 5 }}>
                <Text>{l.title}</Text>
              </TextCol>
              {l.parentId == undefined && (
                <ActionBtnCol>
                  <IconButton name='plus-circle' onPress={() => onAdd(l)} />
                </ActionBtnCol>
              )}
              <ActionBtnCol>
                {!(l.parentId && l.id == l.parentId) && (
                  <IconButton name='pencil' onPress={() => onEdit(l)} />
                )}
              </ActionBtnCol>
              <ActionBtnCol>
                {(l.hasChildren && (
                  <IconButton
                    name={l.expanded ? 'compress' : 'expand'}
                    onPress={() => toggleItems(l.id)}
                  />
                )) ||
                  (!(l.parentId && l.id == l.parentId) && (
                    <IconButton name='trash' onPress={() => onDelete(l.id)} />
                  ))}
              </ActionBtnCol>
            </ItemRow>
          ))}
      </Body>

      <Modal
        visible={showEdit}
        transparent={true}
        onRequestClose={() => setShowEdit(false)}
        title={
          showIconPicker
            ? `Select Icon${
                (editingItem &&
                  editingItem.title &&
                  ` - ${editingItem.title}`) ||
                ''
              }`
            : editingItem && editingItem.id
            ? 'Edit Category'
            : 'New Category'
        }
      >
        {showIconPicker ? (
          <IconPicker
            onSelect={handleIconSelect}
            onHide={() => setShowIconPicker(false)}
          />
        ) : (
          <EditCategory
            item={editingItem}
            parentItem={parentItem}
            onCancel={onUpdateCancel}
            onSave={onSaveCompleted}
            onChange={handleEditingItemOnChange}
            onChangeIcon={() => setShowIconPicker(true)}
          />
        )}
      </Modal>
    </Screen>
  );
}

export default withGlobalContext(CategoriesScreen);
