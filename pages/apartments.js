import MainLayout from "../layouts/mainLayout";
import Nav from "../components/innerNav/innerNav";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';


export default function Apartments() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Typography color="textPrimary">Apartments</Typography>
                        </Breadcrumbs>);
    return (
        <MainLayout title="Apartments">
            <div className="body">
                <Nav title="Apartments" breadcrumb={breadcrumb} />
                
            </div>
        </MainLayout>
    );
}
