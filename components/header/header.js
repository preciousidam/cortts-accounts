import React, {useState, useLayoutEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Notifications from '@material-ui/icons/Notifications';
import Link from 'next/link';
import { useRouter } from "next/router";

import {ProfileDropdown} from '../dropdown/dropdown';

export default function header({toogle}){

    return(
        <header id="navbar">
            <nav id="navbar-content">
                <ul id="navbar-content-left">
                    <li className="nav-link"><Link href="/" onClick={toogle}><a><FontAwesomeIcon onClick={toogle} icon="bars" color="#000" size="lg" /></a></Link></li>
                    <li className="nav-link">
                          
                        <input type="search"id="search" placeholder="Search Here" />
                        
                    </li>  
                </ul>
                <ul id="navbar-content-right">
                    <li className="nav-link">
                        <Link href="/#">
                            <a><Badge badgeContent={4} color="secondary">
                                <MailIcon style={{color: '#000000'}} />
                            </Badge></a>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link href="/#">
                            <a><Badge badgeContent={2} color="primary">
                                <Notifications style={{color: '#000000'}} />
                            </Badge></a>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <ProfileDropdown name="Ebubechukwu" links={['Settings','Logout']} />                           
                    </li>
                </ul>
            </nav>
        </header>
    );
}