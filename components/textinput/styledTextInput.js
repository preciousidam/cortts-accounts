import { PlusOutlined } from '@ant-design/icons';
import { IconButton } from '@material-ui/core';
import { message, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { getViewData } from '../../lib/hooks';
import { setData } from '../../utility/fetcher';


export function StyledInput({type, label, placeholder, id, ...rest}){
    return (
        <div className="form-group styled">
            {label && <label className="label" htmlFor={id}>{label}</label>}
            <input type={type} className="form-control" id={id} placeholder={placeholder} {...rest} />
        </div>
    );
}

export function SelectInput({value, containerStyle, options, label, id, onChange, ...rest}){
    return (
        <div className="form-group styled" style={containerStyle}>
            {label && <label className="label" htmlFor={id}>{label}</label>}
            <select className="custom-select" id={id} defaultValue={value} onChange={onChange} {...rest} >
                {options.map(({text,value}, i) => <option key={i} value={value}>{text}</option>)}
            </select>
        </div>
    );
}


export const DataSelectInput = (datasource) => {
    return ({ containerStyle, options, label, id, onChange, value, ...rest}) => {
        const {data, isLoading} = getViewData(datasource);
        useEffect(() => {
            if(data &&  !value) onChange(data[0]?.id);
        }, [data])
    
        return (!isLoading && 
            <div className="form-group styled" style={containerStyle}>
                {label && <label className="label" htmlFor={id}>{label}</label>}
                <select className="custom-select" id={id} onChange={e => onChange(e.target.value)} defaultValue={value} {...rest}>
                    {data?.map(({id, name, title, flat}, i) => <option key={i} value={id}>{name || title || flat}</option>)}
                </select>
            </div>);
    }
}


export const AddDataSelectInput = (datasource) => {
    return ({ containerStyle, options, label, id, onChange, value, Form, button, ...rest}) => {
        const {data, isLoading} = getViewData(datasource);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            if(data &&  !value) onChange(data[0]?.id);
        }, [data])

        const add = async (body) => {
            setLoading(true);
            const {data, status} = await setData(datasource,body)
            setLoading(false);
            if (status === 200 || status === 201){
                message.success('Data added');
                mutate(datasource);
                return;
            }
            for (let item in data)
                message.error(data[item]);
            return;
        }
        
        const renderForm = _ => (
            <Form add={add} loading={loading} />
        );

        return (!isLoading &&
            <div className={rest?.button ? 'dynamicWithButton': "dynamic"}>
                <div className="form-group styled" style={containerStyle}>
                    {label && <label className="label" htmlFor={id}>{label}</label>}
                    <select className="custom-select" id={id} onChange={e => onChange(e.target.value)} defaultValue={value} {...rest}>
                        {data?.map(({id, name, title}, i) => <option key={i} value={id}>{name || title}</option>)}
                    </select>
                </div>
                <Popover 
                    trigger='click'
                    content={renderForm}
                    placement="bottomLeft"
                >
                    {button ? <IconButton><PlusOutlined /></IconButton> : <span>click to add new</span>}
                </Popover>
            </div>);
    }
}