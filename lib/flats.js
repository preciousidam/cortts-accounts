import {flats} from '../constants/data';

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

    return {
        flat,
        ...flatList[0],
    };
}