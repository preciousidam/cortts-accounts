import useSWR from 'swr';

import {backend} from '../constants/url';
import {getData} from '../utility/fetcher';


export function getViewData (id) {

    const {data, error, mutate} = useSWR(`${backend}/api/${id}`, getData);
    
    return {
      data,
      mutate,
      isLoading: !error && !data,
      isError: error
    }
}

