import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Add} from '@material-ui/icons';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {bankaccounts} from '../../constants/data';
import {CommaFormatted} from '../../utility';



const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #85c226 30%, #25D366 90%)',
      border: 0,
      borderRadius: 20,
      boxShadow: '0 3 5 2 rgba(#85c226, .3)',
      color: 'white',
      padding: '10px 30px',
      margin: '0 10px',
    },
    pdf: {
        background: '#ffffff',
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(#85c226, .3)',
        color: '#000000',
        padding: '10px 30px',
        margin: '0 10px',
      },
});


export function Transactions(){

    const [active, setActive] = useState(0);
    const classes = useStyles();
    const {TabPane} = Tabs;

    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({style}) => (
                <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
            )}
        </Sticky>
    );

    return (
        <MainLayout title="Accounts">
            <div className="body">
                <div id="acct-list">
                    {bankaccounts.map(({balance, bank,name}, index) => 
                    (<Paper 
                        className={`acct-bal ${index == active? 'active':''}`}
                        onClick={e => setActive(index)}
                    >   
                        <span>{bank}</span>
                        <h4>&#8358; {CommaFormatted(balance)}</h4>
                        <p>{name}</p>
                    </Paper>)
                    )}
                </div>
                <div id="trans">
                    <div id="sect-head">
                        <h4 id="h4">Transaction History</h4>
                        <div id="action-cont">
                            <Button className={classes.pdf}> Save as PDF <FontAwesomeIcon icon="file-pdf" /></Button>
                            <Button className={classes.root}  >New <Add /></Button>
                        </div>
                    </div>
                    
                    <Paper id="trans-inner">
                        <StickyContainer id="sticky">
                            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                                <TabPane tab="All" key="1">
                                    
                                </TabPane>
                                <TabPane tab="Credit" key="2">
                                    
                                </TabPane>
                                <TabPane tab="Dedit" key="3">
                                    
                                </TabPane>
                            </Tabs>
                        </StickyContainer>
                    </Paper>
                </div>
                

            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Transactions);