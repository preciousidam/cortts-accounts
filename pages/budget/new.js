import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import MainLayout from "../../layouts/mainLayout";
import Nav from "../../components/innerNav/innerNav";




export default function New() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Link href="/budget"><a>Budget</a></Link>
                            <Typography color="textPrimary">New</Typography>
                        </Breadcrumbs>);
    return (
        <MainLayout title="budget">
            <div className="body">
                <Nav title="Budget" breadcrumb={breadcrumb} />
                
            </div>
        </MainLayout>
    );
}