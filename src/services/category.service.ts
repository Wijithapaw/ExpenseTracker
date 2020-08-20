import { realmService, realm } from "../data/realm.service";
import { utils } from "../utils/utils";
import { Expense, ExpenseType } from "../data/entity-types";
import { ListItemData } from "../types/shared.types";

export const categoryService = {
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    isCategoryInUsed,
    createCategory
}

function getAllCategories() {
    let vals = realmService.getRealm().objects<ExpenseType>(ExpenseType.schema.name).sorted('displayText', false);
    let rootItems: ListItemData[] = vals.filter(c => c.parentType == undefined)
        .map(c => ({
            id: c.id,
            title: c.displayText,
            faIcon: c.faIcon,
            parentId: c.parentType && c.parentType.id,
            data: getChildCategories(vals, c.id)
        }));

    return rootItems;
}

function getChildCategories(items: Realm.Results<ExpenseType>, parentId?: string) {
    let children: ListItemData[] = items.filter(i => i.parentType && i.parentType.id == parentId)
        .map(c => ({
            id: c.id,
            title: c.displayText,
            faIcon: c.faIcon,
            parentId: parentId,
            parentTitle: c.parentType && c.parentType.displayText,
            data: getChildCategories(items, c.id)
        }));
    
    if(children.length > 0) {
        let parent = items.find(i => i.id == parentId);
        children.push({
            id: parentId,
            title: `Other`,
            parentId: parentId,
            parentTitle: parent.displayText
        })
    }

    return children;
}

function getCategory(id: string) {
    var type = realmService.getRealm().objects<ExpenseType>(ExpenseType.schema.name).find(t => t.id == id);
    return type;
}

function updateCategory(id: string, title: string, icon?: string) {
    realm.write(() => {
        let category = realm.objects<ExpenseType>(ExpenseType.schema.name).find(c => c.id == id);
        category.displayText = title;
        category.faIcon = icon;
    });
}

function createCategory(title: string, icon?: string, parentId?: string) {
    realm.write(() => {
        let parentCategory = realm.objects<ExpenseType>(ExpenseType.schema.name).find(c => c.id == parentId);
        realm.create(ExpenseType.schema.name, new ExpenseType(utils.uuid(), utils.uuid(), title, false, parentCategory, icon));
    });
}

function deleteCategory(id: string) {
    let hasUsed = isCategoryInUsed(id);
    if(!hasUsed) {
        realm.write(() => {
            let category = realm.objects<ExpenseType>(ExpenseType.schema.name).find(c => c.id == id);
            realm.delete(category);
        });
    }
}

function isCategoryInUsed(id: string) {
    let hasUsed = realm.objects<Expense>(Expense.schema.name).filter(e => e.type && e.type.id === id).length;
    let isParent = realm.objects<ExpenseType>(ExpenseType.schema.name).filter(c =>c.parentType && c.parentType.id === id).length;
    return hasUsed || isParent;
}