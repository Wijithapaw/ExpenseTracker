import React, {useEffect, useState} from 'react';
import {
  ListItemData,
  FlatListItemData,
  SimpleListItem,
} from '../../types/shared.types';
import {View, Text, Alert} from 'react-native';
import {ScreenMode} from '../../types/enums';
import EditCategory from './EditCategory';
import {messagingService} from '../../services/_shared/messaging.service';
import {categoryService} from '../../services/category.service';
import Screen from '../../components/Screen';
import Icon from '../../components/Icon';
import styled from 'styled-components/native';
import {COLORS} from '../../types/colors';
import Modal from '../../components/Modal';
import IconPicker from '../../components/IconPicker';

interface ItemRowProps {
  selected: boolean;
}

const ItemRow = styled.View<ItemRowProps>`
  flex-direction: row;
  padding: 10px;
  background-color: ${(props: any) =>
    props.selected ? props.theme.button.primary : COLORS.transparent};
`;

const IconCol = styled.View`
  width: 25px;
  align-items: flex-start;
`;

const TextCol = styled.View`
  flex: 1;
  padding-left: ${(props: any) => 10 * props.level}px;
`;

const ActionBtnCol = styled.View`
  width: 40px;
  align-items: flex-end;
`;

const AddNewRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px;
`;

export interface Props {
  callback?: (id: SimpleListItem) => void;
  selectedId?: string;
  mode?: ScreenMode;
  componentId?: string;
}

export default function CategorySelect({
  selectedId,
  mode,
  componentId,
  callback,
}: Props) {
  const [categories, setCategories] = useState<FlatListItemData[]>([]);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<FlatListItemData>();
  const [parentItem, setParentItem] = useState<FlatListItemData>();
  const [showIconPicker, setShowIconPicker] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    let categories = categoryService.getAllCategories();
    let items = flattenList(categories);
    setCategories(items);
  };

  const flattenList = (data: ListItemData[]) => {
    let flatList: FlatListItemData[] = [];

    data.map((val, index) => {
      let items = flattenSingleItem(val, 0);
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
    let flatItems: FlatListItemData[] = [];

    let itemFlatten: FlatListItemData = {
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

    let subItems =
      item.data &&
      item.data.map((child, index) =>
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
    let item = categories.find(c => c.id == parentId);
    if (item) {
      item.expanded = !item.expanded;

      categories
        .filter(c => c.parentId == parentId)
        .forEach(c => (c.show = item!.expanded));
    }
    setCategories(newList);
  };

  const onItemSelect = (data: FlatListItemData) => {
    callback && callback(data);
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
      });
    } else {
      Alert.alert(
        'Already in Use',
        'This category is in use. Please delete/modify all the associate expenses and try again.',
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
    setEditingItem({title: '', id: '', level: 0});
    setParentItem(parent);
  };

  let editMode = true; // mode === ScreenMode.Edit;

  const handleIconSelect = (icon: string) => {
    setEditingItem({...editingItem, faIcon: icon});
    setShowIconPicker(false);
  };

  const handleEditingItemOnChange = (e: any) => {
    setEditingItem({...editingItem, ...e});
  };

  return (
    <Screen>
      {editMode && (
        <AddNewRow>
          <Icon name="plus-circle" size={25} onPress={() => onAdd()} />
        </AddNewRow>
      )}
      {categories
        .filter(c => c.show)
        .map((l, i) => (
          <ItemRow key={i} selected={selectedId === l.id}>
            <IconCol>
              <Icon name={l.faIcon} size={15} />
            </IconCol>
            <View style={{flex: 1, paddingLeft: 10 * l.level}}>
              <Text>{l.title}</Text>
            </View>
            {l.parentId == undefined && (
              <ActionBtnCol>
                {editMode && (
                  <Icon name="plus-circle" onPress={() => onAdd(l)} />
                )}
              </ActionBtnCol>
            )}
            <ActionBtnCol>
              {editMode && !(l.parentId && l.id == l.parentId) && (
                <Icon name="pencil" onPress={() => onEdit(l)} />
              )}
            </ActionBtnCol>
            <ActionBtnCol>
              {(l.hasChildren && (
                <Icon
                  name={l.expanded ? 'compress' : 'expand'}
                  onPress={() => toggleItems(l.id)}
                />
              )) ||
                (editMode ? (
                  !(l.parentId && l.id == l.parentId) && (
                    <Icon name="trash" onPress={() => onDelete(l.id)} />
                  )
                ) : (
                  <Icon name="hand-o-left" onPress={() => onItemSelect(l)} />
                ))}
            </ActionBtnCol>
          </ItemRow>
        ))}

      <Modal
        visible={showEdit}
        transparent={true}
        onRequestClose={() => setShowEdit(false)}
        title={
          showIconPicker
            ? `Select Icon${(editingItem &&
                editingItem.title &&
                ` - ${editingItem.title}`) ||
                ''}`
            : editingItem && editingItem.id
            ? 'Edit Category'
            : 'New Category'
        }>
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
