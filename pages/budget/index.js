import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import {useRouter} from 'next/router';

import MainLayout from "../../layouts/mainLayout";
import Nav from "../../components/innerNav/innerNav";
import Table from "../../components/table/budget";
import {budget} from '../../constants/data';
import {ProtectRoute} from '../../utility/route';



export function Budget() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Typography color="textPrimary">Budget</Typography>
                        </Breadcrumbs>);

    const router = useRouter();
    const action = () => router.push(router.pathname+"/new");

    return (
        <MainLayout title="budget">
                <div className=" container-fluid body">
                    <Nav title="Budget" breadcrumb={breadcrumb} action={action} />
                    <div className="container-fluid land-list">
                        <Table data={budget} />
                    </div>
                </div>
        </MainLayout>
    );
}

export default ProtectRoute(Budget);