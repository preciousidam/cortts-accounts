import React, {useState, useEffect} from 'react';
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {Checkbox, Button } from 'antd';



import {openNotification} from '../../components/notification';
import {setData, editData} from '../../utility/fetcher';
import {StyledInput, SelectInput, AddDataSelectInput} from '../textinput/styledTextInput';
import { mutate } from 'swr';
import { getViewData } from '../../lib/hooks';


const areas = [{text: "Ikoyi", value: 'Ikoyi'},{text: "Victoria Island", value: 'Victoria Island'},{text: "Oniru", value: 'Oniru'},{text: "Lekki", value: 'Lekki'},]

export const Form = ({add, loading}) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [contact_name, setContactName] = useState('');
    const [contact_phone, setContactPhone] = useState('');
    const [phone, setPhone] = useState('');

    const onClick = _ => {
        add({name,email, address,phone, contact_name, contact_phone});
        setAddress('');
        setContactPhone('');
        setContactName('');
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
            <StyledInput placeholder="Phone" id="phone" type="tel" value={phone} onChange={val => setPhone(val.target.value)} />
            <StyledInput placeholder="Contact person" id="cn" type="text" value={contact_name} onChange={val => setContactName(val.target.value)} />
            <StyledInput placeholder="Contact person" id="cpp" type="tel" value={contact_phone} onChange={val => setContactPhone(val.target.value)} />
            <Button type='primary' onClick={onClick} loading={loading} >Save</Button>
        </div>
    </div>);
}

export const Client = AddDataSelectInput('contacts/clients/');

export default function CreateForm({close, id}){

    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const {data, isLoading} = getViewData(`apartments/${id}/`);
    
    useEffect(() => {
        if (!isLoading && data){
            setDetails({...data})
        }
    }, [data, isLoading])
   

    const onChange = e => {
        
        let value = e.target.value;
        let name = e.target.name;
        
        setDetails(prev => ({...prev, [name]: value}))
    }

    const handleOk = async () => {
        setLoading(true);
        const funct = id? editData : setData;
        const link = id ? `apartments/${id}/` : `apartments/`
        const {data, status} = await funct(link, details)
        setLoading(false);
        if (status === 200 || status === 201){
            openNotification("Success", 'Record saved successfully', 'success');
            mutate(link);
            close();
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item])
        return;
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
                    <StyledInput value={details.flat} name="flat" onChange={onChange} type="text" placeholder="AM6" label="Flat" id="flat" />
                </div>
                <div className="col-6">
                    <StyledInput value={details.building} name="building" onChange={onChange} id="property" label="Property" />
                </div>
                <div className="col-3">
                    <StyledInput value={details.no_of_bed} name="no_of_bed" onChange={onChange} type="number" label="Bedroom" id="bed" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput value={details.no_of_bath} name="no_of_bath" onChange={onChange} type="number" label="Baths" id="baths" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput value={details.no_of_toilet} name="no_of_toilet" onChange={onChange} type="number" label="Toilet" id="toilet" min={1} max={10} />
                </div>
                <div className="col-3">
                    <StyledInput value={details.no_of_park} name="no_of_park" onChange={onChange} type="number" label="Car Park" id="park" min={1} max={10} />
                </div>
                <div className="col-9">
                    <StyledInput value={details.address} name="address" onChange={onChange} type="text" placeholder="Block 101, Plot 7, Furo Ezimora" label="Address" id="address" />
                </div>
                <div className="col-3">
                    <SelectInput value={details.area} name="area" onChange={onChange} options={areas} id="area" defaultChoice="Select area" label="Area" />
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <StyledInput value={details.rent} name="rent" onChange={onChange} type="number" label="Rent" id="rent" min={10000} max={10000000} step={10000} />
                </div>
                <div className="col-3">
                    <StyledInput value={details.service_charge} name="service_charge" onChange={onChange} type="number" label="Service Charge" id="sc" min={10000} max={10000000} step={10000} />
                </div>
                <div className="col-6">
               
                    <Client 
                        onChange={val => setDetails(prev => ({...prev, landlord: val}))}
                        value={details.landlord}
                        containerStyle={{width: '100%'}}
                        Form={Form}
                        button={false}
                        label="Landlord"
                    />
               
                </div>
                <div className="col-12">
                    <Checkbox checked={details.is_furnished} 
                        onChange={val => setDetails(prev => ({...prev, is_furnished: val.target.checked}))}>
                            Furnished?
                    </Checkbox>
                    <Checkbox onChange={val => setDetails(prev => ({...prev, is_occupied: val.target.checked}))} 
                        checked={details.is_occupied}>
                            Occupied?
                    </Checkbox>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <label htmlFor="note">Additiona Note?</label>
                    <textarea value={details?.other_info} className="form-control" id="note" rows="3" name="other_info" onChange={onChange} />
                </div>
            </div>
            <div>
                <Button type='primary' onClick={handleOk} loading={loading}style={{marginRight: 20}} >Save</Button>
                <Button onClick={close} >Cancel</Button>
            </div>
        </div>
    );
}

