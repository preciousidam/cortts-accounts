import React, {useEffect, useState} from 'react';

import {getViewData} from '../../lib/hooks';

export const  NameFromId = ({id, link}) => {
    const {data, isLoading} = getViewData(`${link}/${id}`);

    return !isLoading && data ? <span>{data.name || data.title}</span> : null
}