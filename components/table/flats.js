import React, {useState, useEffect} from 'react';
import { Pagination } from 'antd';
import {useRouter} from 'next/router';

import ActionButton from '../button/actionButtons';
import {getViewData} from '../../lib/hooks';
import Loader from '../loader';
import useAuth from '../../provider';
import {openNotification} from '../../components/notification';
import {setData, delData} from '../../utility/fetcher';
import CreateForm from '../../components/forms/flatForm';
import {hoc} from '../../utility/hoc';
import {NameFromId} from '../datatext';


export default function FlatsTable({linkId, newData, callback}){
    
    const {data, isError, isLoading, mutate} = getViewData(linkId);
    const [page, setPage] = useState(1)
    const offset = 8;
    const [holdEdit, setHoldEdit] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const {token} = useAuth();
    const router = useRouter();
    const Form = hoc(CreateForm, `${linkId}edit`);

    const onChange = pag => {
        setPage(pag)
    };
    const [upper,lower] = [(offset * page) - offset, page * offset];
    
    
    useEffect(()=>{
        if(!newData) return
        mutate(newData);
    }, [newData])


    const edit = rid => {
        setHoldEdit(data.find(({id}) => id === rid));
        setShowForm(true);
    }
    const del = async id => {
        const {msg, status, data} = await delData(`${linkId}delete`,id,token);
        if( status == 'success')
            mutate(data);
        openNotification(status,msg);
    }


    return (
        !isLoading ? !showForm ? (<div id="expense-table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Flat</th>
                            <th>Property</th>
                            <th>Status</th>
                            <th>Tenancy Period</th>
                            <th>Beds</th>
                            <th>Landlord</th>
                            <th>Tenant</th>
                            <th>Note</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(upper,lower).map(({id, name, prop, period, status,noOfBed, landlord, tenant, note },i) => (
                            <tr key={id}>
                                <td>{i+1}</td>
                                <td>{name}</td>
                                <td>{prop}</td>
                                <td><span className={status.toLowerCase()}>{status}</span></td>
                                <td>{period}</td>
                                <td>{noOfBed}</td>
                                <td><NameFromId id={landlord} link="landlords" /></td>
                                <td><NameFromId id={tenant} link="tenants" /></td>
                                <td>{note}</td>
                                <td><ActionButton 
                                        ind={id} 
                                        actions={{
                                            view: _ => router.push(`/apartments/${name}`),
                                            del: _ => del(id), 
                                            edit: _ => edit(id)}} 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data.length} onChange={onChange} />
            </div>
        </div>) : <Form 
                        data={holdEdit} 
                        close={_ => setShowForm(false)}  
                        mutate={newData => mutate([...data, newData])}
                    /> : isError ? <p>Something happened cannot load data right now</p> : <Loader />
    );
}