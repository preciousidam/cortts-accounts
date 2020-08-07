import {bankaccounts, transactions} from '../constants/data';

export const getAllAcct = _ => {
    return bankaccounts.map(({id}) => {
        return {
            params: {
                id: id.toString(),
            }
        }
    });
} 

export const getAcctDetails = id => {
    
    const acctDetail = bankaccounts.filter(x => x.id == id );
    
    return {
        acctDetail,
        transactions,
    };
}