import React, {useState, useEffect} from 'react';
import { Modal, Popover } from 'antd';
import moment from 'moment';
import {mutate} from 'swr';


import {getViewData} from '../../lib/hooks';
import {openNotification} from '../../components/notification';
import { delData, editData} from '../../utility/fetcher';
import {StyledInput, SelectInput, DataSelectInput} from "../textinput/styledTextInput";
import { IconButton, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/agreement.scss';

export const Apartment = DataSelectInput('apartments/');

export const More = ({edit, view, del}) => (
    <div className="more-opt">
        <button onClick={edit}>Edit</button>
        <button onClick={view} className="view">View</button>
        <button onClick={del} className="del">Delete</button>
    </div>
)

export default function AgreementsList({}){
    
    const {data, isError, isLoading} = getViewData('agreements/');
   
    const [holdEdit, setHoldEdit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const handleOk = async () => {
        setLoading(true);
        let formData = new FormData();

        for(let item in holdEdit)
            formData.append(item, holdEdit[item]);

        const {data, status} = await editData(`agreements/${holdEdit.id}/`,formData)
        setLoading(false);
        if (status === 200 || status === 201){
            openNotification("Success", 'Record saved successfully', 'success')
            setShowModal(false);
            mutate(`agreements/`);
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item])
        return;
    }

    const onApartment = e => {
        setDetails(prev => ({...prev, apartment: e}))
    }

    const onChange = e => {
        
        let value = e.target.value;
        let name = e.target.name;
        let file = (e.target.type === 'file' && e.target.files.length > 0) ? e.target.files[0] : null

        setHoldEdit(prev => ({...prev, [name]: file||value}))
    }

    const handleCancel = () => {
        setShowModal(false);
    }
    

    const edit = data => {
        setShowModal(true);
        setHoldEdit(data);
    }
    const del = async id => {
        const {status, data} = await delData(`agreements/${holdEdit.id}/`);
        if(status === 204) {
            openNotification('Item', "Deleted successfully", 'success');
            mutate('agreements/');
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item]);
    }

    

    if (!isLoading && !data || data?.length <= 0){
        return <Empty />
    }
    
    return (
        <div id="agreement-list" className="row">
            {!isLoading && data?.map(({id, title, file, last_modified, apartment, doc_type}) => (
                <div className="col-md-3  file">
                    <Paper className="content">
                        <img src={`/images/${doc_type}.png`} />
                        <div className="foot">
                            <div className="title">
                                <p>{title}</p>
                                <span>Last modified {moment(last_modified).format('DD MMM, YY')}</span>
                            </div>
                            <Popover 
                                trigger="click"
                                content={
                                    <More 
                                        del={del}
                                        view={() => console.log(file)}
                                        edit={_ => edit({id, title, file, last_modified, apartment, doc_type})}
                                    />
                                }
                            >
                                <IconButton className="more">
                                    <FontAwesomeIcon icon="ellipsis-v" color="#c6c6c6" size="1x" />
                                </IconButton>
                            </Popover>
                        </div>
                    </Paper>
                </div>
            ))}
            <Modal
                title="Edit detail"
                visible={showModal}
                onOk={handleOk}
                confirmLoading={loading}
                onCancel={handleCancel}
            >
                <div>
                <StyledInput placeholder="Title" id="title" type="text" name="title" value={holdEdit?.title} onChange={onChange} />
                    <StyledInput placeholder="File" id="file" type="file" name="file"  onChange={onChange} />
                    <Apartment id="apartment" name="apartment" onChange={onApartment} value={holdEdit?.apartment} />
                    <SelectInput 
                        placeholder="File Type" 
                        options={[{text:'pdf', value:'pdf'}, {text:'word', value:'word'}]}
                        id="doc_type" 
                        type="text" 
                        name="doc_type" 
                        value={holdEdit?.doc_type} 
                        onChange={onChange}
                    />
                </div>
            </Modal>
        </div>
    );
}



export const Empty = ({}) => (
    <div id="empty">
        <img src="/images/empty.png" alt="empty" />
        <p>Nothing to see here, please check back later</p>
    </div>
)