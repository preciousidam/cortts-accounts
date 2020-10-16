import React, {useState, useEffect} from 'react';
import { Pagination, Modal } from 'antd';

import ActionButton from '../button/actionButtons';
import {getViewData} from '../../lib/hooks';
import Loader from '../loader';
import useAuth from '../../provider';
import {openNotification} from '../../components/notification';
import {setData, delData} from '../../utility/fetcher';
import {StyledInput} from "../textinput/styledTextInput";

export default function DetailsTable({linkId, newData}){
    
    const {data, isError, isLoading, mutate} = getViewData(linkId);
    const [page, setPage] = useState(1)
    const offset = 8;
    const [holdEdit, setHoldEdit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const {token} = useAuth();

    const handleOk = async () => {
        setLoading(true);
        const {data: dt, status, msg} = await setData(`${linkId}edit`,holdEdit, token)
        openNotification(status, msg)
        if (status === 'success'){
            setShowModal(false);
            mutate([...data, dt]);
        }
        setLoading(false);
    }

    const onTextChange = (id,value) => {
        let hold = holdEdit;
        hold[id] = value;
        setHoldEdit({...hold});
    }

    const handleCancel = () => {
        setShowModal(false);
    }
    
    useEffect(()=>{
        if(!newData) return
        mutate(newData);
    }, [newData])

    const onChange = pag => {
        setPage(pag)
    };

    const edit = data => {
        setShowModal(true);
        setHoldEdit(data);
    }
    const del = async id => {
        const {msg, status, data} = await delData(`${linkId}delete`,id,token);
        if( status == 'success')
            mutate(data);
        openNotification(status,msg);
    }

    const [upper,lower] = [(offset * page) - offset, page * offset];
    return (
        !isLoading ? <div id="expense-table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(upper,lower).map(({id, name,email,address,contactPerson,phone},i) => (
                            <tr key={id}>
                                <td>{i+1}</td>
                                <td>{name}</td>
                                <td>{address}</td>
                                <td>{email}</td>
                                <td>{contactPerson}</td>
                                <td>{phone}</td>
                                <td><ActionButton actions={{edit: _ => edit({id, name,email,address,contactPerson,phone}), 
                                                            del: _ => del(id) }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data.length} onChange={onChange} />
            </div>
            <Modal
                title="Edit detail"
                visible={showModal}
                onOk={handleOk}
                confirmLoading={loading}
                onCancel={handleCancel}
            >
                <div>
                    <StyledInput placeholder="Name" id="name" type="text" value={holdEdit.name} onChange={val => onTextChange('name', val.target.value)} />
                    <StyledInput placeholder="Address" id="address" type="text" value={holdEdit.address} onChange={val => onTextChange('address', val.target.value)} />
                    <StyledInput placeholder="Email" id="email" type="email" value={holdEdit.email} onChange={val => onTextChange('email', val.target.value)} />
                    <StyledInput placeholder="Contact person" id="cp" type="text" value={holdEdit.contactPerson} onChange={val => onTextChange('contactPerson', val.target.value)} />
                    <StyledInput placeholder="Phone" id="phone" type="tel" value={holdEdit.phone} onChange={val => onTextChange('phone', val.target.value)} />
                </div>
            </Modal>
        </div> : isError ? <p>Something happened cannot load data right now</p> : <Loader />
    );
}