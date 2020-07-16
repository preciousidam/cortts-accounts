
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import MainLayout from "../../layouts/mainLayout";
import Nav from "../../components/innerNav/innerNav";
import {getAllFlats, getFlatDetails} from '../../lib/flats';


export default function Flats({flatDetails}) {
    
    return (
        <MainLayout title={`Flat ${flatDetails.flat}`}>
            <div className="body">
                
            </div>
        </MainLayout>
    );
}

export async function getStaticPaths(){
    const paths = getAllFlats();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const flatDetails = getFlatDetails(params.flat);

    return {
        props: {flatDetails}
    }
}