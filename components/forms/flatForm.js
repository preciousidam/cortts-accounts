import React, {useState, useEffect} from 'react';
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {Checkbox, Button } from 'antd';


import useAuth from '../../provider';
import {openNotification} from '../../components/notification';
import {setData, delData} from '../../utility/fetcher';
import {StyledInput, SelectInput} from '../textinput/styledTextInput';
import {withDynamicData} from '../../utility/hoc';

const options = [{text: "Olympic Tower", value: 'olympic'},{text: "Crestview Tower", value: 'crestview'},{text: "Visage Apartments", value: 'visage'},]
const areas = [{text: "Ikoyi", value: 'ikoyi'},{text: "Victoria Island", value: 'vi'},{text: "Ajah", value: 'Ajah'},{text: "Lekki", value: 'lekki'},]

const Form = ({add, loading}) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [phone, setPhone] = useState('');

    const onClick = _ => {
        add({name,email, address,phone, contactPerson});
        setAddress('');
        setContactPerson('');
        setEmail('');
        setPhone('');
        setName('');
    }

    return (<div className="row">
        <div className="col-sm-6">
            <StyledInput placeholder="Name" id="name" type="text" value={name} onChange={val => setName(val.target.value)} />
            <StyledInput placeholder="Address" id="address" type="text" value={address} onChange={val => setAddress(val.target.value)} />
            <StyledInput placeholder="Email" id="email" type="email" value={email} onChange={val => setEmail(val.target.value)} />
        </div>
        <div className="col-sm-6">
            <StyledInput placeholder="Contact person" id="cp" type="text" value={contactPerson} onChange={val => setContactPerson(val.target.value)} />
            <StyledInput placeholder="Phone" id="phone" type="tel" value={phone} onChange={val => setPhone(val.target.value)} />
            <Button type='primary' onClick={onClick} loading={loading} >Save</Button>
        </div>
    </div>);
}

const Landlord = withDynamicData( Form , 'landlords/');
const Tenant = withDynamicData( Form , 'tenants/');

export default function CreateForm({linkId, data, close, mutate: pMutate}){

    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const {token} = useAuth();

    useEffect(() => {
        if(!data) return
        setDetails({...data, status: data.status === 'Occupied' || false});
    }, [data])

    const onTextChange = (id,value) => {
        let hold = details;
        hold[id] = value;
        setDetails({...hold});
    }

    const handleOk = async () => {
        setLoading(true);
        const {status, msg, data} = await setData(linkId,details, token)
        openNotification(status, msg)
        if (status === 'success'){
            pMutate(data);
            close();
        }
        setLoading(false);
    }


    return (
        <div id="create-form" className="container">
            <header 
                style={{
                    margin: 10, 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#c6c6c6',
                }}>
                <h4>Apartment Details</h4>
                <IconButton onClick={close}><CloseOutlined /></IconButton>
            </header>
            <div id="form" className="row">
                <div className="col-6">
                    <StyledInput value={details.name} onChange={val => onTextChange('name', val.target.value)} type="text" placeholder="AM6" label="Flat" id="flat" />
                </div>
                <div className="col-6">
                    <SelectInput value={details.prop} onChange={val => onTextChange('prop', val.target.value)} options={options} id="property" defaultChoice="Select property" label="Property" />
                </div>
                <div className="col-3">
                    <StyledInput value={details.noOfBed} onChange={val => onTextChange('noOfBed', val.target.value)} type="number" label="Bedroom" id="bed" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput value={details.noOfBath} onChange={val => onTextChange('noOfBath', val.target.value)} type="number" label="Baths" id="baths" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput value={details.noOfToilet} onChange={val => onTextChange('noOfToilet', val.target.value)} type="number" label="Toilet" id="toilet" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput value={details.noOfPark} onChange={val => onTextChange('noOfPark', val.target.value)} type="number" label="Car Park" id="park" min={1} max={10} />
                </div>
                <div className="col-9">
                    <StyledInput value={details.address} onChange={val => onTextChange('address', val.target.value)} type="text" placeholder="Block 101, Plot 7, Furo Ezimora" label="Address" id="address" />
                </div>
                <div className="col-3">
                    <SelectInput value={details.area} onChange={val => onTextChange('area', val.target.value)} options={areas} id="area" defaultChoice="Select area" label="Area" />
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <StyledInput value={details.rent} onChange={val => onTextChange('rent', val.target.value)} type="number" label="Rent" id="rent" min={10000} max={10000000} step={10000} />
                </div>
                <div className="col-3">
                    <StyledInput value={details.serv_charge} onChange={val => onTextChange('serv_charge', val.target.value)} type="number" label="Service Charge" id="sc" min={10000} max={10000000} step={10000} />
                </div>
                <div className="col-6">
                    <StyledInput value={details.period} 
                        placeholder="01/01/2020 - 31/12/2020" 
                        type="text" label="Tenancy Period" id="period"
                        onChange={val => onTextChange('period', val.target.value)}
                    />
                </div>
                <div className="col-12">
                    <Checkbox checked={details.furnished} 
                        onChange={val => onTextChange('furnished', val.target.checked)}>
                            Furnished?
                    </Checkbox>
                    <Checkbox onChange={val => onTextChange('status', val.target.checked)} 
                        checked={details.status}>
                            Occupied?
                    </Checkbox>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <Landlord 
                        defaultChoice="Select landlord"
                        onChange={val => onTextChange('landlord', val.target.value)}
                        value={details.landlord}
                        containerStyle={{width: '100%'}}
                    />
                </div>
                <div className="col-6">
                    <Tenant 
                        defaultChoice="Select tenant"
                        onChange={val => onTextChange('tenant', val.target.value)}
                        value={details.tenant}
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="note">Additiona Note?</label>
                    <textarea className="form-control" id="note" rows="3" onChange={val => onTextChange('note', val.target.value)}>{details.note}</textarea>
                </div>
            </div>
            <div>
                <Button type='primary' onClick={handleOk} loading={loading}style={{marginRight: 20}} >Save</Button>
                <Button onClick={close} >Cancel</Button>
            </div>
        </div>
    );
}