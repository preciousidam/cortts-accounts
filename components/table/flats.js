import React, {useState} from 'react';
import { Pagination } from 'antd';
import ActionButton from '../button/actionButtons';

export default function FlatsTable({data,actions}){
    
    const [page, setPage] = useState(1)
    const offset = 8;

    const onChange = pag => {
        setPage(pag)
    };
    const [upper,lower] = [(offset * page) - offset, page * offset];
    return (
        <div className="detail-table-cont">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Flat</th>
                        <th>Property</th>
                        <th>Status</th>
                        <th>No. of Beds</th>
                        <th>Landlord</th>
                        <th>Tenant</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(upper,lower).map(({flat,property,status,beds, landlord, tenant },i) => (
                        <tr>
                            <td>{i+1}</td>
                            <td>{flat}</td>
                            <td>{property}</td>
                            <td><span className={status.toLowerCase()}>{status}</span></td>
                            <td>{beds}</td>
                            <td>{landlord}</td>
                            <td>{tenant}</td>
                            <td><ActionButton ind={flat} actions={actions} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data.length} onChange={onChange} />
            </div>
        </div>
    );
}