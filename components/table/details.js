import React, {useState, useEffect} from 'react';
import { Pagination, Modal } from 'antd';
import {mutate} from 'swr';

import ActionButton from '../button/actionButtons';
import {getViewData} from '../../lib/hooks';
import {openNotification} from '../../components/notification';
import { delData, editData} from '../../utility/fetcher';
import {StyledInput} from "../textinput/styledTextInput";

export default function DetailsTable({linkId, newData}){
    
    const {data, isError, isLoading, mutate} = getViewData('contacts/clients/');
    const [page, setPage] = useState(1)
   
    const [holdEdit, setHoldEdit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const handleOk = async () => {
        setLoading(true);
        const {data, status} = await editData(`contacts/clients/${holdEdit?.id}/`,holdEdit)
        setLoading(false);
        if (status === 200 || status === 201){
            openNotification("Success", 'Record saved successfully', 'success')
            setShowModal(false);
            mutate('contacts/clients/');
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item])
        return;
    }

    const onChange = e => {
        
        let value = e.target.value;
        let name = e.target.name;
        
        setHoldEdit(prev => ({...prev, [name]: value}))
    }

    const handleCancel = () => {
        setShowModal(false);
    }
    
    useEffect(()=>{
        if(!newData) return
        mutate(newData);
    }, [newData])

    const edit = data => {
        setShowModal(true);
        setHoldEdit(data);
    }
    const del = async id => {
        const {status, data} = await delData(`contacts/clients/${id}/`);
        if(status === 204) {
            openNotification('Item', "Deleted successfully", 'success');
            mutate('contacts/clients/');
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item]);
    }
    
    return (
        <div id="expense-table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Contact Person Name</th>
                            <th>Contact Person Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(({id, name,email,address,phone,contact_name,contact_phone},i) => (
                            <tr key={id}>
                                <td>{i+1}</td>
                                <td>{name}</td>
                                <td>{address}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{contact_name}</td>
                                <td>{contact_phone}</td>
                                <td><ActionButton actions={{edit: _ => edit({id, name,email,address,phone,contact_name,contact_phone}), 
                                                            del: _ => del(id) }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data?.length} />
            </div>
            <Modal
                title="Edit detail"
                visible={showModal}
                onOk={handleOk}
                confirmLoading={loading}
                onCancel={handleCancel}
            >
                <div>
                    <StyledInput placeholder="Name" id="name" type="text" name="name" value={holdEdit?.name} onChange={onChange} />
                    <StyledInput placeholder="Address" id="address" type="text" name="address" value={holdEdit?.address} onChange={onChange} />
                    <StyledInput placeholder="Email" id="email" type="email" name="email" value={holdEdit?.email} onChange={onChange} />
                    <StyledInput placeholder="Phone" id="phone" type="tel" name="phone" value={holdEdit?.phone} onChange={onChange} />
                    <StyledInput placeholder="Contact person" id="cpn" type="text" name="contact_name" value={holdEdit?.contact_name} onChange={onChange} />
                    <StyledInput placeholder="Contact phone number" id="cpp" type="text" name="contact_phone" value={holdEdit?.contact_phone} onChange={onChange} />
                </div>
            </Modal>
        </div>
    );
}

export function VendorDetailsTable({linkId, newData}){
    
    const {data, isError, isLoading, mutate} = getViewData('contacts/vendors/');
    const [page, setPage] = useState(1)
   
    const [holdEdit, setHoldEdit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const handleOk = async () => {
        setLoading(true);
        const {data, status} = await editData(`contacts/vendors/${holdEdit?.id}/`,holdEdit)
        setLoading(false);
        if (status === 200 || status === 201){
            openNotification("Success", 'Record saved successfully', 'success')
            setShowModal(false);
            mutate('contacts/vendors/');
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item])
        return;
    }

    const onChange = e => {
        
        let value = e.target.value;
        let name = e.target.name;
        
        setHoldEdit(prev => ({...prev, [name]: value}))
    }

    const handleCancel = () => {
        setShowModal(false);
    }
    
    useEffect(()=>{
        if(!newData) return
        mutate(newData);
    }, [newData])

    

    const edit = data => {
        setShowModal(true);
        setHoldEdit(data);
    }
    const del = async id => {
        const {status, data} = await delData(`contacts/vendors/${id}/`);
        if(status === 204) {
            openNotification('Item', "Deleted successfully", 'success');
            mutate('contacts/vendors/');
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item]);
    }
    
    return (
        <div id="expense-table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(({id, name,email,address,phone,contact_name,contact_phone},i) => (
                            <tr key={id}>
                                <td>{i+1}</td>
                                <td>{name}</td>
                                <td>{address}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td><ActionButton actions={{edit: _ => edit({id, name,email,address,phone}), 
                                                            del: _ => del(id) }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data?.length} />
            </div>
            <Modal
                title="Edit detail"
                visible={showModal}
                onOk={handleOk}
                confirmLoading={loading}
                onCancel={handleCancel}
            >
                <div>
                    <StyledInput placeholder="Name" id="name" type="text" name="name" value={holdEdit?.name} onChange={onChange} />
                    <StyledInput placeholder="Address" id="address" type="text" name="address" value={holdEdit?.address} onChange={onChange} />
                    <StyledInput placeholder="Email" id="email" type="email" name="email" value={holdEdit?.email} onChange={onChange} />
                    <StyledInput placeholder="Phone" id="phone" type="tel" name="phone" value={holdEdit?.phone} onChange={onChange} />
                </div>
            </Modal>
        </div>
    );
}