import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import {useRouter} from 'next/router';

import MainLayout from "../layouts/mainLayout";
import Nav from "../components/innerNav/innerNav";
import Table from "../components/table/invoice";
import {budget} from '../constants/data';


export default function Invoice() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Typography color="textPrimary">Invoice</Typography>
                        </Breadcrumbs>);

    const router = useRouter();
    const action = () => router.push(router.pathname+"/new");
    
    return (
        <MainLayout title="Invoice">
            <div className="body">
                <Nav title="Invoice" breadcrumb={breadcrumb} />
                <div className="container-fluid land-list">
                    <Table data={budget} />
                </div>
            </div>
        </MainLayout>
    );
}
