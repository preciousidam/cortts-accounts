import {CommaFormatted} from '../../utility/index';

export default function Money({amount, className}){
    return <span className={`money ${className}`}>{amount}</span>
}