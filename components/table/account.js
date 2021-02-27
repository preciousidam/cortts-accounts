import React, {useState, useEffect} from 'react';
import { Pagination, Modal } from 'antd';
import {mutate} from 'swr';

import ActionButton from '../button/actionButtons';
import {getViewData} from '../../lib/hooks';
import {openNotification} from '../../components/notification';
import { delData, editData} from '../../utility/fetcher';
import {StyledInput} from "../textinput/styledTextInput";

export default function AccountTable({linkId, newData}){
    
    const {data, isError, isLoading, mutate} = getViewData('accounts/others/');
    const [page, setPage] = useState(1)
   
    const [holdEdit, setHoldEdit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const handleOk = async () => {
        setLoading(true);
        const {data, status} = await editData(`accounts/others/${holdEdit?.id}/`,holdEdit)
        setLoading(false);
        if (status === 200 || status === 201){
            openNotification("Success", 'Record saved successfully', 'success')
            setShowModal(false);
            mutate('accounts/others/');
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
        const {status, data} = await delData(`accounts/others/${id}/`);
        if(status === 204) {
            openNotification('Item', "Deleted successfully", 'success');
            mutate('accounts/others/');
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
                            <th>Account Name</th>
                            <th>Account Number</th>
                            <th>Bank</th>
                            <th>Sort Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(({id, name,number,bank,sort_code},i) => (
                            <tr key={id}>
                                <td>{i+1}</td>
                                <td>{name}</td>
                                <td>{number}</td>
                                <td>{bank}</td>
                                <td>{sort_code}</td>
                                <td><ActionButton actions={{edit: _ => edit({id, name,number,bank,sort_code}), 
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
                    <StyledInput placeholder="Acct Name" id="name" type="text" name="name" value={holdEdit?.name} onChange={onChange} />
                    <StyledInput placeholder="Acct Number" id="number" type="text" name="number" value={holdEdit?.number} onChange={onChange} />
                    <StyledInput placeholder="Bank" id="bank" type="text" name="bank" value={holdEdit?.bank} onChange={onChange} />
                    <StyledInput placeholder="Sort Code" id="sc" type="text" name="sort_code" value={holdEdit?.sort_code} onChange={onChange} />
                </div>
            </Modal>
        </div>
    );
}