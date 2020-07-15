import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';

import MainLayout from "../../layouts/mainLayout";
import Nav from "../../components/innerNav/innerNav";




export default function New() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Link href="/budget"><a>Budget</a></Link>
                            <Typography color="textPrimary">New</Typography>
                        </Breadcrumbs>);
    return (
        <MainLayout title="budget" actionFooter={true}>
            <div className="body">
                <div className="container">
                    
                </div>
            </div>
        </MainLayout>
    );
}