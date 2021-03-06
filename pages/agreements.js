import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {mutate} from 'swr';
import { Breadcrumb } from 'antd';
import CustomScroll from 'react-custom-scroll';


import MainLayout from "../layouts/mainLayout";
import {StyledInput, SelectInput, DataSelectInput} from "../components/textinput/styledTextInput";
import {ProtectRoute} from '../utility/route';
import { setData } from '../utility/fetcher';
import { openNotification } from '../components/notification';
import AgreementsList from '../components/table/agreement';

const renderBreadcrumb = _ => (<Breadcrumb>
    <Breadcrumb.Item><Link href="/"><a>Dashboard</a></Link></Breadcrumb.Item>
    <Breadcrumb.Item>Agreements</Breadcrumb.Item>
</Breadcrumb>);

export const Apartment = DataSelectInput('apartments/');

export function Agreements() {

    const useStyles = makeStyles({
        pdf: {
            background: 'linear-gradient(45deg, #85c226 30%, #25D366 90%)',
            border: 1,
            borderRadius: 5,
            borderColor: '#85c226',
            borderStyle: 'solid',
            color: '#ffffff',
            padding: '5px 30px',
          },
    });

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState({doc_type: 'pdf'});
    const onApartment = e => {
        setDetails(prev => ({...prev, apartment: e}))
    }

    const onChange = e => {
        let value = e.target.value;
        let name = e.target.name;
        let file = (e.target.type === 'file' && e.target.files.length > 0) ? e.target.files[0] : null

        setDetails(prev => ({...prev, [name]: file||value}));
    }

    const add = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        for(let item in details)
            formData.append(item, details[item]);

        const {data, status} = await setData('agreements/', formData);
        if (status === 200 || status === 201){
            openNotification("Success", 'Record saved successfully', 'success')
            mutate('agreements/');
            setDetails({});
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item])
        return;
    }

    return (
        <MainLayout title="Agreements">
            <div className="body">
                <div id='top'>
                    {renderBreadcrumb()}
                    
                    <Button className="elevated" onClick={_ => setOpen(true)} className={classes.pdf} >
                        Add New 
                        <FontAwesomeIcon icon="plus" color="#ffffff" style={{margin: 5}} />
                    </Button>
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 60px)">
                    <div className="container" id="agree-cont">
                        <AgreementsList />
                    </div>
                </CustomScroll>
                {open && <div className="new-cont-overlay">
                    <div className="new-form">
                        <header>
                            <h5>Add Accounts</h5>
                            <IconButton className="close" onClick={_ => setOpen(false)}><CloseOutlined /></IconButton>
                        </header>
                        <div>
                            <StyledInput placeholder="Title" id="title" type="text" name="title" value={details?.title} onChange={onChange} />
                            <StyledInput placeholder="File" id="file" type="file" name="file"  onChange={onChange} />
                            <Apartment id="apartment" name="apartment" onChange={onApartment} value={details?.apartment} />
                            <SelectInput 
                                placeholder="File Type" 
                                options={[{text:'pdf', value:'pdf'}, {text:'word', value:'word'}]}
                                id="doc_type" 
                                type="text" 
                                name="doc_type" 
                                value={details?.doc_type} 
                                onChange={onChange}
                            />
                            <button className="btn btn-success add" onClick={add}>Save Agreement</button>
                        </div>
                    </div>
                </div>}
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Agreements);