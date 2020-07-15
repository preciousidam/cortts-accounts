import MainLayout from "../layouts/mainLayout";
import Nav from "../components/innerNav/innerNav";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';


export default function Landlords() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Typography color="textPrimary">Landlords</Typography>
                        </Breadcrumbs>);
    return (
        <MainLayout title="Landlords">
            <div className="body">
                <Nav title="Landlords" breadcrumb={breadcrumb} />
                
            </div>
        </MainLayout>
    );
}
