import {expensesData, transactions} from '../constants/data';

export const getRef = _ => {
    return expensesData.map(({ref}) => {
        console.log(ref)
        return {
            params: {
                id: ref.toString(),
            }
        }
    });
} 

export const getExpenses = id => {
    
    const expenses = expensesData.filter(x => x.ref == id );
    
    return {
        expenses: expenses[0],
    };
}