import { Expense, ExpenseType } from '../data/entity-types';
import { realm, realmService } from '../data/realm.service';
import { ExpenseCategoryMap } from '../types/expense.types';
import { ListItemData } from '../types/shared.types';
import { utils } from '../utils/utils';

export const categoryService = {
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  isCategoryInUsed,
  createCategory,
  getCategoryCodeMap,
};

function getAllCategories() {
  const allCategories = realmService
    .getRealm()
    .objects<ExpenseType>(ExpenseType.schema.name)
    .sorted('displayText', false);

  const rootItems: ListItemData[] = allCategories
    .filter(c => c.parentType == undefined)
    .map(c => ({
      id: c.id,
      title: c.displayText,
      faIcon: c.faIcon,
      parentId: c.parentType && c.parentType.id,
      data: getChildCategories(allCategories, c.id),
    }));

  return rootItems;
}

function getCategoryCodeMap() {
  const map: ExpenseCategoryMap = realmService
    .getRealm()
    .objects<ExpenseType>(ExpenseType.schema.name)
    .map(t => ({ [t.code]: t }))
    .reduce((prev, cur) => ({ ...prev, ...cur }), {});

  return map;
}

function getChildCategories(
  items: Realm.Results<ExpenseType>,
  parentId?: string,
) {
  const children: ListItemData[] = items
    .filter(i => i.parentType && i.parentType.id == parentId)
    .map(c => ({
      id: c.id,
      title: c.displayText,
      faIcon: c.faIcon,
      parentId: parentId,
      parentTitle: c.parentType && c.parentType.displayText,
      data: getChildCategories(items, c.id),
    }));

  if (children.length > 0) {
    const parent = items.find(i => i.id == parentId);
    children.push({
      id: parentId,
      title: `Other`,
      parentId: parentId,
      parentTitle: parent.displayText,
    });
  }

  return children;
}

function getCategory(id: string) {
  const type = realmService
    .getRealm()
    .objects<ExpenseType>(ExpenseType.schema.name)
    .find(t => t.id == id);
  return type;
}

function updateCategory(id: string, title: string, icon = '') {
  realm.write(() => {
    const category = realm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(c => c.id == id);
    category.displayText = title;
    category.faIcon = icon;
  });
}

function createCategory(title: string, icon = '', parentId?: string) {
  realm.write(() => {
    const parentCategory = realm
      .objects<ExpenseType>(ExpenseType.schema.name)
      .find(c => c.id == parentId);
    realm.create(
      ExpenseType.schema.name,
      new ExpenseType(
        utils.uuid(),
        utils.uuid(),
        title,
        false,
        parentCategory,
        icon,
      ),
    );
  });
}

function deleteCategory(id: string) {
  const hasUsed = isCategoryInUsed(id);
  if (!hasUsed) {
    realm.write(() => {
      const category = realm
        .objects<ExpenseType>(ExpenseType.schema.name)
        .find(c => c.id == id);
      realm.delete(category);
    });
  }
}

function isCategoryInUsed(id: string) {
  const hasUsed = realm
    .objects<Expense>(Expense.schema.name)
    .filter(e => e.type && e.type.id === id).length;
  const isParent = realm
    .objects<ExpenseType>(ExpenseType.schema.name)
    .filter(c => c.parentType && c.parentType.id === id).length;
  return hasUsed || isParent;
}
