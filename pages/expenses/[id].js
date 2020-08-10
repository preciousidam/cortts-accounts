
export function Id({AcctDetails}){
    return (
        <div>
            <p>New</p>
        </div>
    );
}

export async function getStaticPaths(){
    const paths = getAllAcct();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const AcctDetails = getAcctDetails(params.id);
    
    return {
        props: {AcctDetails}
    }
}


const DebitForm = ({acct}) =>{
    const options = accounts.map(({bank, number, name}) => ({value: number, text: `${bank}(${name} - ${number})`}))
    return (
        <div>
            <StyledInput label="From" type="text" value={`${acct.bank}(${acct.name} - ${acct.no})`} disabled={true} />
            <SelectInput label="To" options={options} defaultChoice="select account"/>
            <StyledInput type="number" placeholder="Amount" />
            <StyledInput type="text" placeholder="Description" />
        </div>
    );
}

const CreditForm = ({acct}) =>{
    const options = accounts.map(({bank, number, name}) => ({value: number, text: `${bank}(${name} - ${number})`}))
    return (
        <div>
            <SelectInput label="From" options={options} defaultChoice="select account"/>
            <StyledInput label="To" type="text" value={`${acct.bank}(${acct.name} - ${acct.no})`} disabled={true} />
            <StyledInput type="number" placeholder="Amount" />
            <StyledInput type="text" placeholder="Description" />
        </div>
    );
}