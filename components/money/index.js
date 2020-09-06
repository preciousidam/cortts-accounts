
export default function Money({amount, className}){
    return <span className={`money ${className}`}>&#8358; {amount}</span>
}