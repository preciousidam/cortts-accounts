import useSWR from 'swr';

import {backend} from '../constants/url';
import {getAccts, getTrans} from '../utility/fetcher';


export function useAccounts () {

    const {data, error, mutate} = useSWR(`${backend}/api/accounts/`, getAccts);
    
    return {
      accts: data,
      mutate,
      isLoading: !error && !data,
      isError: error
    }
}


export function useSingleAccount (id) {

  const {data, error, mutate} = useSWR(`${backend}/api/accounts/${id}`, getAccts);
  
  return {
    accts: data,
    mutate,
    isLoading: !error && !data,
    isError: error
  }
}
