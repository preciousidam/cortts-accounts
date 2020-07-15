import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import MainLayout from "../../layouts/mainLayout";
import Nav from "../../components/innerNav/innerNav";
import Table from "../../components/table";
import {budget} from '../../constants/data';



export default function Budget() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Typography color="textPrimary">Budget</Typography>
                        </Breadcrumbs>);
    return (
        <MainLayout title="budget">
            <div className="body">
                <Nav title="Budget" breadcrumb={breadcrumb} href="/new" />
                <Table data={budget} />
            </div>
        </MainLayout>
    );
}
