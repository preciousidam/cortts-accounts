import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import {useRouter} from 'next/router';

import MainLayout from "../../layouts/mainLayout";
import Nav from "../../components/innerNav/innerNav";
import Table from "../../components/table";
import {budget} from '../../constants/data';



export default function Budget() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Typography color="textPrimary">Budget</Typography>
                        </Breadcrumbs>);

    const router = useRouter();
    const action = () => router.push(router.pathname+"/new")

    return (
        <MainLayout title="budget">
                <div className=" container-fluid body">
                    <Nav title="Budget" breadcrumb={breadcrumb} action={action} />
                    <Table data={budget} />
                </div>
        </MainLayout>
    );
}
