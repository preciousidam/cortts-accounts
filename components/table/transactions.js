import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {CommaFormatted} from '../../utility/index'

export const TransTable = ({data, filter}) =>{

    const sortdata = (x,y) =>{
        let date1 = new Date(x.date.split('-')[2],x.date.split('-')[1] - 1, x.date.split('-')[0]);
        let date2 = new Date(y.date.split('-')[2],y.date.split('-')[1] - 1, y.date.split('-')[0]);

        if(date1 > date2){
            return -1;
        }
        if (date1 < date2){
            return 1;
        }

        return 0
    }

    const applyFilter = data => {
        const byDate = data.filter(({date}) => 
                                    filter.date[0] <= moment(date, 'DD-MM-YYYY')
                                    && filter.date[1] >= moment(date, 'DD-MM-YYYY'));
        
        const bytype = filter.transType == 'all'? byDate : byDate.filter(({transType}) => transType == filter.transType);
        
        return bytype;
    }

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
                    {applyFilter(data.sort(sortdata)).map(({id,date, amount, description, transType, beneficiary}, i) => (
                        <tr key={id}>
                            <td>{i+1}</td>
                            <td>{date}</td>
                            <td>{beneficiary}</td>
                            <td className="justify">{CommaFormatted(parseFloat(amount).toFixed(2))} <FontAwesomeIcon icon={transType=='debit'|| transType == 'transfer'? 'arrow-up': 'arrow-down'} color={transType=='debit'|| transType == 'transfer'? '#f00': '#0f0'} /></td>
                            <td>{transType=='debit'|| transType == 'transfer'? 'debit transaction': 'credit transaction'} | {description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}