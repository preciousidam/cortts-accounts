import React, {useState, useEffect} from 'react';
import { Pagination } from 'antd';
import {useRouter} from 'next/router';
import moment from 'moment';

import ActionButton from '../button/actionButtons';
import {getViewData} from '../../lib/hooks';
import useAuth from '../../provider';
import {openNotification} from '../../components/notification';
import {delData} from '../../utility/fetcher';



export default function FlatsTable({linkId, newData, showEdit}){
    
    const {data, isError, isLoading, mutate} = getViewData('apartments/');
    const [page, setPage] = useState(1)
   
    const {token} = useAuth();
    const router = useRouter();

    const onChange = pag => {
        setPage(pag)
    };
    
    
    useEffect(()=>{
        if(!newData) return
        mutate(newData);
    }, [newData])

    const del = async id => {
        const {status, data} = await delData(`apartments/${id}/`);
        if(status === 204) {
            openNotification('Item', "Deleted successfully", 'success');
            mutate('apartments/');
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item]);
    }


    return (
        !isLoading && <div id="expense-table">
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
                        {data?.map(({id, flat, building, current_tenancy_period, is_occupied, 
                                        no_of_bed, get_landlord, get_tenant, other_info },i) => (
                            <tr key={id}>
                                <td>{i+1}</td>
                                <td>{flat}</td>
                                <td>{building}</td>
                                <td><span className={is_occupied? 'Occupied'.toLowerCase() : 'Vacant'.toLowerCase()}>
                                    {is_occupied? 'Occupied' : 'Vacant'}</span>
                                </td>
                                <td>
                                    {moment(current_tenancy_period?.start).format("MMM Do YY")} to {moment(current_tenancy_period?.end).format("MMM Do YY")}
                                </td>
                                <td>{no_of_bed}</td>
                                <td>{get_landlord}</td>
                                <td>{get_tenant}</td>
                                <td>{other_info}</td>
                                <td><ActionButton 
                                        ind={id} 
                                        actions={{
                                            view: _ => router.push(`/apartments/${id}`),
                                            del: _ => del(id), 
                                            edit: _ => showEdit(id)}} 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data?.length} onChange={onChange} />
            </div>
        </div>
    );
}