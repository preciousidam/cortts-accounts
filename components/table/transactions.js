import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {CommaFormatted} from '../../utility/index'

export const TransTable = ({data}) =>{

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
                    {data.map(({date, amount, desc, type, thirdP}, i) => (
                        <tr>
                            <td>{i+1}</td>
                            <td>{date}</td>
                            <td>{thirdP}</td>
                            <td>{CommaFormatted(parseFloat(amount).toFixed(2))} <FontAwesomeIcon icon={type=='debit'|| type == 'transfer'? 'arrow-up': 'arrow-down'} color={type=='debit'|| type == 'transfer'? '#f00': '#0f0'} /></td>
                            <td>{type=='debit'|| type == 'transfer'? 'Debit transaction': 'Credit transaction'} | {desc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}