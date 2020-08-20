import { realmService, realm } from "../data/realm.service";
import { utils } from "../utils/utils";
import { Expense } from "../data/entity-types";
import { categoryService } from "./category.service";
import { Alert } from "react-native";

export const expenseService = {
    getAllExpenses,
    createExpense,
    deleteExpense,
    updateExpense,
    getExpense,
    getExpenseSummary
}

function getAllExpenses() {
    let vals = realmService.getRealm().objects<Expense>(Expense.schema.name);
    return vals;
}

function createExpense(amount: number, typeId: string, date: Date, description?: string) {
    realm.write(() => {
        let id = utils.uuid();
        let type = categoryService.getCategory(typeId);
        let now = new Date();

        realm.create(Expense.schema.name, new Expense(id, amount, date, now, type, description));
    });
}

function updateExpense(id: string, amount: number, typeId: string, date: Date, description?: string) {
    realm.write(() => {
        var expense = realm.objects<Expense>(Expense.schema.name).find(e => e.id == id);
        expense.amount = amount;
        expense.type = categoryService.getCategory(typeId);
        expense.date = date;
        expense.description = description;
    });
}

function getExpense(id: string) {
    var expense = realm.objects<Expense>(Expense.schema.name).find(e => e.id == id);
    return expense;
}

function deleteExpense(id: string) {
    realm.write(() => {
        let item = realm.objects<Expense>(Expense.schema.name).find(e => e.id == id);
        realm.delete(item);
    });
}

function getExpenseSummary(month: Date) {
    let startDate = new Date(month.getFullYear(), month.getMonth(), 1);
    let endDate = new Date(month.getFullYear(), month.getMonth() + 1, 1);;
    console.log(startDate);
    console.log(endDate);

    let expences = realm.objects<Expense>(Expense.schema.name).filtered("date >= $0 AND date < $1", startDate, endDate)
        .map((e) => ({ 
            category: e.type.parentType ? e.type.parentType : e.type,
            amount: e.amount,
        }));

    let uniqueCats = Array.from(new Set(expences.map(e => e.category.code)));

    let catSummary = uniqueCats.map(code => {
        let amount = expences.filter(e => e.category.code == code).map(e => e.amount).reduce((a, b)=> a + b, 0);
        let name = expences.filter(e => e.category.code == code)[0].category.displayText;
        return {
            amount,
            name,
            code
        }
    });

    console.log(catSummary);
    

    return catSummary;
}