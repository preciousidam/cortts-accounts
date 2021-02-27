import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {CommaFormatted} from '../../utility/index';
import { useRouter } from 'next/router';
import { getViewData } from '../../lib/hooks';

export const TransTable = ({ filter}) =>{
    const route = useRouter();
    const {id} = route.query;
    const {data, isLoading, isError} = getViewData(`accounts/transactions/?id=${id}`);
   
    return (
        <div className="trans-table">
            <table>
                <thead>
                    <tr>
                        <th>Sn</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && data?.map(({id,created_at, amount, desc, type, ben_name}, i) => (
                        <tr key={id}>
                            <td>{i+1}</td>
                            <td>{moment(created_at).fromNow()}</td>
                            <td>{ben_name}</td>
                            <td className="justify">{CommaFormatted(parseFloat(amount).toFixed(2))} <FontAwesomeIcon icon={type=='debit' ? 'arrow-up': 'arrow-down'} color={type=='debit' ? '#f00': '#0f0'} /></td>
                            <td>{type=='debit'|| type == 'transfer'? 'debit transaction': 'credit transaction'} | {desc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}