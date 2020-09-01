import React, {useState} from 'react';

import MainLayout from "../../../layouts/mainLayout";
import {ProtectRoute} from '../../../utility/route';


export function Id(){
    return (
        <MainLayout title="Expenses Account">
            <div className="body">
                
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Id);