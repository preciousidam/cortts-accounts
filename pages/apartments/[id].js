import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {ApartmentOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


import MainLayout from "../../layouts/mainLayout";
import {getAllFlats, getFlatDetails} from '../../lib/flats';
import {ProtectRoute} from '../../utility/route';
import { getViewData } from '../../lib/hooks';
import Loader from '../../components/loader';


export function Flats(props) {
    
    const {TabPane} = Tabs;
    const router = useRouter();
    const {id} = router.query;
    const [edit, setEdit] = useState(false);
    const {data, isLoading, isError, mutate} = getViewData(`apartments/${id}/`);
    

    useEffect(() => {
        console.log(data)
    },[data]);

    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({style}) => (
                <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
            )}
        </Sticky>
    );

    const showForm = () => setEdit(!edit);
    
    if (router.isFallback) (<div>Loading...</div>)

    return (
        <MainLayout title={`Flat ${data?.name}`}>
            <div className="body">
                <div className="container-fluid flat-details-cont">
                {!isLoading ? <Paper className="container flat" >
                        <StickyContainer className="sticky">
                            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                                <TabPane tab="Basic" key="1">
                                    {basicDetail(data)}
                                </TabPane>
                                <TabPane tab="Information" key="2">
                                    {/*info(landlord, tenant)*/}
                                </TabPane>
                            </Tabs>
                        </StickyContainer>
                    </Paper> : isError? <p>Something happened can not load data</p>: <Loader />}
                    {aside(data, showForm)}
                </div>     
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Flats);


export const basicDetail = (detail) => (
    <div id="basic">
        <h4>Flat {detail?.flat} 
            <span 
                className={detail?.is_occupied? 'Occupied'.toLowerCase() : 'Vacant'.toLowerCase()}>
                {detail?.is_occupied? 'Occupied': "Vacant"}
            </span>
        </h4>
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
            {/*<div className="col-4">
                <span><FontAwesomeIcon icon="calendar-alt" size='lg' /> Tenancy Period</span>
                <p>{detail?.period}</p>
            </div>*/}
            
        </div>
        <div className="note">
            <h5>Additional Note</h5>
            <p>{detail?.other_info}</p>
        </div>
    </div>
);


export const info = (landlord, tenant) => (
    <div id="info">
        <div id="landlord-info">
            <h5>Landload Information</h5>
            <div className="row">
                <div className="col-4">
                    <span>Name</span>
                    <p>{landlord?.name}</p>
                </div>
                <div className="col-4">
                    <span>Email</span>
                    <p>{landlord?.email}</p>
                </div>
                <div className="col-4">
                    <span>Phone</span>
                    <p>{landlord?.phone}</p>
                </div>
                <div className="col-4">
                    <span>Contact</span>
                    <p>{landlord?.contactPerson}</p>
                </div>
                <div className="col-4">
                    <span>Address</span>
                    <p>{landlord?.address}</p>
                </div>
            </div>
        </div>
        <hr />
        <div id="tenant-info">
            <h5>Tenant Information</h5>
            <div className="row">
                <div className="col-4">
                    <span>Name</span>
                    <p>{tenant?.name}</p>
                </div>
                <div className="col-4">
                    <span>Email</span>
                    <p>{tenant?.email}</p>
                </div>
                <div className="col-4">
                    <span>Phone</span>
                    <p>{tenant?.phone}</p>
                </div>
                <div className="col-4">
                    <span>Contact</span>
                    <p>{tenant?.contactPerson}</p>
                </div>
                <div className="col-4">
                    <span>Address</span>
                    <p>{tenant?.address}</p>
                </div>
            </div>
        </div>
    </div>
);

export const aside = (flatDetails, edit) => (
    <div className="container aside ">

        <Paper id="edit" className="aside-sectn">
            <p>Edit flat details</p>
            <button onClick={e => edit()} className="btn btn-success">Edit Details</button>
        </Paper>
        <Paper id="related" className="aside-sectn">
            <p>Related Flats</p>
            <hr />
            <div id="rel-flats">
                <div className="side-link">
                    <p className="no">AM6</p>
                    <Link href="AM6">
                        <a>
                            <p>{flatDetails?.beds} Bedroom</p>
                            <span>Olympic Tower</span>
                        </a>
                    </Link>
                </div>
                    
                <div className="side-link">
                    <p className="no">AM6</p>
                    <Link href="AM6">
                        <a>
                            <p>{flatDetails?.beds} Bedroom</p>
                            <span>Olympic Tower</span>
                        </a>
                    </Link>
                </div>
                <div className="side-link">
                    <p className="no">AM6</p>
                    <Link href="AM6">
                        <a>
                            <p>{flatDetails?.beds} Bedroom</p>
                            <span>Olympic Tower</span>
                        </a>
                    </Link>
                </div>
                <div className="side-link">
                    <p className="no">AM6</p>
                    <Link href="AM6">
                        <a>
                            <p>{flatDetails?.beds} Bedroom</p>
                            <span>Olympic Tower</span>
                        </a>
                    </Link>
                </div>
            </div>
        </Paper>
    </div>
);

