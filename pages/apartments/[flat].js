
import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {CloseOutlined, ApartmentOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


import MainLayout from "../../layouts/mainLayout";
import {StyledInput, SelectInput} from "../../components/textinput/styledTextInput";
import {getAllFlats, getFlatDetails} from '../../lib/flats';


export default function Flats({flatDetails}) {
    
    const {TabPane} = Tabs;
    const router = useRouter();

    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({style}) => (
                <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
            )}
        </Sticky>
    );

    return (
        <MainLayout title={`Flat ${flatDetails.flat}`}>
            { router.isFallback ?<div>Loading...</div>:(<div className="body">
                <div className="container-fluid flat-details-cont">
                    <Paper className="container info" >
                        <StickyContainer className="sticky">
                            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                                <TabPane tab="Basic" key="1">
                                    {basicDetail(flatDetails)}
                                </TabPane>
                                <TabPane tab="Information" key="2">
                                    Content of Tab Pane 2
                                </TabPane>
                            </Tabs>
                        </StickyContainer>
                    </Paper>
                    <Paper className="container aside">
                        <header>
                            <h5>Related Apartments</h5>
                        </header>
                    </Paper>
                </div>     
            </div>)}
        </MainLayout>
    );
}

export async function getStaticPaths(){
    const paths = getAllFlats();
    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const flatDetails = getFlatDetails(params.flat);

    return {
        props: {flatDetails}
    }
}


export const basicDetail = (detail) => {
    return (
        <div id="basic">
            <h4>Flat {detail.flat} <span className={detail.status.toLowerCase()}>{detail.status}</span></h4>
            <div className="row room"> 
                <div className="col-3">
                    <p><FontAwesomeIcon icon="bed" size='lg' /> Bedroom</p>
                    <span>{detail.beds}</span>
                </div>
                <div className="col-3">
                    <p><FontAwesomeIcon icon="bath" size='lg' /> Bathroom</p>
                    <span>{detail.baths}</span>
                </div>
                <div className="col-3">
                    <p><FontAwesomeIcon icon="toilet" size='lg' /> Toilet</p>
                    <span>{detail.toilet}</span>
                </div>
                <div className="col-3">
                    <p><FontAwesomeIcon icon="car-alt" size='lg' /> Car Park</p>
                    <span>{detail.park}</span>
                </div>
            </div>
            <hr />
            <div className=" row lower">
                <div className="col-4">
                    <span><ApartmentOutlined /> Property</span>
                    <p>{detail.property}</p>
                </div>
                <div className="col-4">
                    <span><FontAwesomeIcon icon="map-marked-alt" /> Address</span>
                    <p>{detail.address}</p>
                </div>
                <div className="col-4">
                    <span></span>
                    <p></p>
                </div>
            </div>
        </div>
    );
}