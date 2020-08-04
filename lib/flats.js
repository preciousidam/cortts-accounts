import {flats, landlords, tenants} from '../constants/data';

export const getAllFlats = _ => {
    return flats.map(({flat}) => {
        return {
            params: {
                flat: flat,
            }
        }
    });
} 

export const getFlatDetails = flat => {
    
    const flatList = flats.filter(x => x.flat == flat );
    console.log(flat)
    return {
        flat,
        ...flatList[0],
        landlord: landlords[0],
        tenant: tenants[0],
    };
}