import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {ApartmentOutlined} from '@material-ui/icons';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import { getViewData } from '../../lib/hooks';
import Loader from '../../components/loader';
import Modal from 'antd/lib/modal/Modal';
import { Form, Client } from '../../components/forms/flatForm';
import { StyledInput } from '../../components/textinput/styledTextInput';
import { setData } from '../../utility/fetcher';
import { openNotification } from '../../components/notification';
import CreateForm from '../../components/forms/flatForm';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

const styles = ['#ffbf00','#25D366','#00dcf5','#c6c6c6']

export function Flats(props) {
    
    const {TabPane} = Tabs;
    const router = useRouter();
    const {id} = router.query;
    const [edit, setEdit] = useState(false);
    const {data, isLoading, isError, mutate} = getViewData(`apartments/${id}/`);
    

    useEffect(() => {
        console.log(edit)
    }, [edit]);

    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({style}) => (
                <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
            )}
        </Sticky>
    );

    const showForm = () => setEdit(true);
    
    if (router.isFallback) (<div>Loading...</div>)

    return (
        <MainLayout title={`Flat ${data?.name}`}>
            <div className="body">
                {edit == false ? <div className="container-fluid flat-details-cont">
                    <Paper className="container flat" >
                        <StickyContainer className="sticky">
                            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                                <TabPane tab="Basic" key="1">
                                    {basicDetail(data)}
                                </TabPane>
                                <TabPane tab="Information" key="2">
                                    <ClientInfo landlord={data?.landlord} tenant={data?.tenant} />
                                </TabPane>
                                <TabPane tab="Tenancy Period" key="3">
                                    <TenancyPeriod 
                                        list={data?.all_tenancy_period}
                                        current={data?.current_tenancy_period}
                                        mutate={_ => mutate(`apartments/${id}/`)}
                                        id={id}
                                        amount={data?.rent}
                                    />
                                </TabPane>
                            </Tabs>
                        </StickyContainer>
                    </Paper>
                    <Aside similar={data?.similar} edit={showForm} />
                </div>: <CreateForm id={id} close={_ => setEdit(false)} />}
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Flats);


export const basicDetail = (detail) => (
    <div id="basic">
        <h5>Flat {detail?.flat} 
            <span 
                className={detail?.is_occupied? 'Occupied'.toLowerCase() : 'Vacant'.toLowerCase()}>
                {detail?.is_occupied? 'Occupied': "Vacant"}
            </span>
        </h5>
        <div className="row room"> 
            <div className="col-3">
                <p><FontAwesomeIcon icon="bed" size='lg' /> Bedroom</p>
                <span>{detail?.no_of_bed}</span>
            </div>
            <div className="col-3">
                <p><FontAwesomeIcon icon="bath" size='lg' /> Bathroom</p>
                <span>{detail?.no_of_bath}</span>
            </div>
            <div className="col-3">
                <p><FontAwesomeIcon icon="toilet" size='lg' /> Toilet</p>
                <span>{detail?.no_of_toilet}</span>
            </div>
            <div className="col-3">
                <p><FontAwesomeIcon icon="car-alt" size='lg' /> Car Park</p>
                <span>{detail?.no_of_park}</span>
            </div>
        </div>
        <hr />
        <div className=" row lower">
            <div className="col-4">
                <span><ApartmentOutlined /> Property</span>
                <p>{detail?.building}</p>
            </div>
            <div className="col-4">
                <span><FontAwesomeIcon icon="map-marked-alt" /> Address</span>
                <p>{detail?.address}</p>
            </div>
            <div className="col-4">
                <span><FontAwesomeIcon icon="couch" /> Furnished</span>
                <p>{detail?.is_furnished? 'Yes': 'No'}</p>
            </div>
            <div className="col-4">
                <span><FontAwesomeIcon icon="money-bill-wave-alt" /> Rent</span>
                <p>&#8358; {detail?.rent}</p>
            </div>
            <div className="col-4">
                <span><FontAwesomeIcon icon="coins" /> Service Charge</span>
                <p>&#8358; {detail?.service_charge}</p>
            </div>
            {<div className="col-4">
                <span><FontAwesomeIcon icon="calendar-alt" size='lg' /> Tenancy Period</span>
                <p>{moment(detail?.current_tenancy_period?.start).format("MMM Do, YYYY")} to {moment(detail?.current_tenancy_period?.end).format("MMM Do, YYYY")}</p>
            </div>}
            
        </div>
        <div className="note">
            <h5>Additional Note</h5>
            <p>{detail?.other_info}</p>
        </div>
    </div>
);


export const ClientInfo = ({landlord, tenant}) => {
    const {data: L, isLoading} = getViewData(`contacts/clients/${landlord}/`);
    const {data: T, isLoading: isTLoading} = getViewData(`contacts/clients/${tenant}/`);
    return (
        <div id="info">
            {!isLoading && L && <div id="landlord-info">
                <h5>Landlord Information</h5>
                <div className="row">
                    <div className="col-4">
                        <span>Name</span>
                        <p>{L?.name}</p>
                    </div>
                    <div className="col-4">
                        <span>Email</span>
                        <p>{L?.email}</p>
                    </div>
                    <div className="col-4">
                        <span>Phone</span>
                        <p>{L?.phone}</p>
                    </div>
                    <div className="col-4">
                        <span>Contact Person</span>
                        <p>{L?.contact_name}</p>
                    </div>
                    <div className="col-4">
                        <span>Contact Person Number</span>
                        <p>{L?.contact_phone}</p>
                    </div>
                    <div className="col-4">
                        <span>Address</span>
                        <p>{L?.address}</p>
                    </div>
                </div>
            </div>}
            <hr />
            {!isTLoading && T && <div id="tenant-info">
                <h5>Tenant Information</h5>
                <div className="row">
                    <div className="col-4">
                        <span>Name</span>
                        <p>{T?.name}</p>
                    </div>
                    <div className="col-4">
                        <span>Email</span>
                        <p>{T?.email}</p>
                    </div>
                    <div className="col-4">
                        <span>Phone</span>
                        <p>{T?.phone}</p>
                    </div>
                    <div className="col-4">
                        <span>Contact</span>
                        <p>{T?.contactPerson}</p>
                    </div>
                    <div className="col-4">
                        <span>Address</span>
                        <p>{T?.address}</p>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export const Aside = ({similar, edit}) => (
    <div className="container aside ">

        <Paper id="edit" className="aside-sectn">
            <p>Edit flat details</p>
            <button onClick={edit} className="btn btn-success">Edit Details</button>
        </Paper>
        <Paper id="related" className="aside-sectn">
            <p>Related Flats</p>
            <hr />
            <div id="rel-flats">
                {
                    similar?.map(({flat,id, building, no_of_bed}, i) => (
                        <div className="side-link">
                            <p className="no" style={{background: styles[i]}}>{flat}</p>
                            <Link href={`${id}`}>
                                <a>
                                    <p>{no_of_bed} Bedroom</p>
                                    <span>{building}</span>
                                </a>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </Paper>
    </div>
);

export const TenancyPeriod = ({list, current, mutate, id, amount}) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const handleOk = async () => {
        setLoading(true);
        const {data, status} = await setData(`tenancy/`,{...details, apartment: id, amount})
        setLoading(false);
        if (status === 200 || status === 201){
            openNotification("Success", 'Record saved successfully', 'success')
            setShowModal(false);
            mutate(`apartments/${id}/`);
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item])
        return;
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const [details, setDetails] = useState({});
    const onChange = e => {
        
        let value = e.target.value;
        let name = e.target.name;
        
        setDetails(prev => ({...prev, [name]: value}))
    }

    return (
        <div id="info-period">
            <div className="row">
                <div className="col-4">
                    <h6>Current Tenant</h6>
                    <h6 id="tName">{current?.tenant_name}</h6>
                    {current ? <p className="tPeriod">
                        <span>{moment(current?.current_tenancy_period?.start).format("MMM Do, YYYY")}</span> to <span>{moment(current?.current_tenancy_period?.end).format("MMM Do, YYYY")}</span>
                    </p>: <div style={{paddingBottom: 15}}>
                            <p>Nothing to see here, please click below to add data</p>
                            <button onClick={e => setShowModal(true)} className="btn btn-success">Add Tenant</button>
                        </div>
                    }
                </div>
                <div className="col-8">
                    {list?.length > 0 && <h6>History</h6>}
                    {
                        list?.map(({tenant_name, start, end}) => (
                            <div className="period">
                                <p className="name">{tenant_name}</p>
                                <p className="tPeriod">
                                    <span>{moment(start).format("MMM Do, YYYY")}</span> to <span>{moment(end).format("MMM Do, YYYY")}</span>
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Modal
                title="New Tenancy Period"
                visible={showModal}
                onOk={handleOk}
                confirmLoading={loading}
                onCancel={handleCancel}
            >
                <div>
                    <Client
                        onChange={val => setDetails(prev => ({...prev, tenant: val}))}
                        value={details.tenant}
                        containerStyle={{width: '100%'}}
                        Form={Form}
                        button={false}
                        label="Tenant"
                    />
                    <StyledInput 
                        placeholder="2021-12-01"
                        label="Start Date"
                        onChange={onChange}
                        value={details?.start}
                        name="start"
                    />
                    <StyledInput 
                        placeholder="2021-12-01"
                        label="End Date"
                        onChange={onChange}
                        value={details?.end}
                        name="end"
                    />
                </div>   
            </Modal>
        </div>
    )
}