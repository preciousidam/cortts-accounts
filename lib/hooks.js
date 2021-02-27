import useSWR from 'swr';

import {backend} from '../constants/url';
import {getData} from '../utility/fetcher';

import getLoginClient from '../axios/loggedInClient';


export function getViewData (id) {
  
    const {data, error, mutate} = useSWR(id, getData);
    
    return {
      data: data?.data,
      status: data?.status,
      mutate,
      isLoading: !error && !data,
      isError: error
    }
}

