import React, {useState,useEffect} from 'react';
import {Popover, message} from 'antd';
import IconButton from '@material-ui/core/IconButton';
import {PlusOutlined} from '@ant-design/icons';

import {SelectInput} from '../components/textinput/styledTextInput';
import {getViewData} from '../lib/hooks';
import {setData} from './fetcher';
import useAuth from '../provider';


export function hoc(Component, linkId) {
    return (props) => {
        return (<Component {...arguments} {...props} linkId={linkId} />);
    }
}

export function withDynamicData(Form, linkId) {

    return ({button, ...rest}) => {
        const {data, mutate, isError, isLoading } = getViewData(linkId)
        const [options, setOptions] = useState([]);
        const [loading, setLoading] = useState(false);
        const {token} = useAuth();

        useEffect(() => {
            if (!data && isLoading) return
            const opt = data.map(({id, name, title}) => ({text: name || title, value: id}));
            setOptions(opt);
        }, [data]);

        const add = async body => {
            setLoading(true);
            const {status, msg, data: dt} = await setData(`${linkId}create`, body,token);
            setLoading(false);
            if(status == 'success'){
                mutate([...data, dt]);
                message.success(msg)
            }
            else message.error(msg)
        }

        const renderForm = _ => (
            <Form add={add} loading={loading} />
        );

        return (
            !isLoading && <div className={button ? 'dynamicWithButton': "dynamic"} >
                <SelectInput  
                    options={options} 
                    {...rest}
                />
                <Popover 
                    trigger='click'
                    content={renderForm}
                    placement="bottomLeft"
                >
                    {button ? <IconButton><PlusOutlined /></IconButton> : <span>click to add new</span>}
                </Popover>
            </div>
        );
    }
}


export function withSwr(Component, linkId) {

    return (props) => {
        const {data, isLoading } = getViewData(linkId)
        const [options, setOptions] = useState([]);

        useEffect(() => {
            if (!data && isLoading) return
            const opt = data.map(({id, name, title}) => ({text: name || title, value: id}));
            setOptions(opt);
        }, [data]);

        return (
            <Component {...props} options={options} />
        );
    }
}
