import {getAccts} from '../utility/fetcher';
import {backend} from '../constants/url';

export const getAllAcct = async _ => {

    const acct = await getAccts([`${backend}/api/accounts/`]);
    
    return acct.map(({id}) => {
        
        return {
            params: {
                id: id.toString(),
            }
        }
    });
} 

export const getAcctDetails = async (id) => {
    
    const acct = await getAccts([`${backend}/api/accounts/${id}`]);
    
    return {
        acctDetail: acct,
        transactions: acct.transactions,
    };
}