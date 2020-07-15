import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import MainLayout from "../../layouts/mainLayout";
import Nav from "../../components/innerNav/innerNav";
import Table from "../../components/table";

const data = [
    {date: '12 Nov, 2019', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '13 Dec, 2019', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '15 Jan, 2020', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '22 Feb, 2020', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '12 Mar, 2020', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '12 May, 2020', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '12 Jun, 2020', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '12 Apr, 2020', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '12 Jul, 2020', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '12 Oct, 2019', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '12 Sep, 2019', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
    {date: '12 Aug, 2019', items: [{desc: 'Fuel for the Marketers', unit: 5000, qty: 4},{desc: 'Fuel for the MD', unit: 8000, qty: 1},{desc: 'Toll Gate Payment', unit: 6000, qty: 4,}]},
];

export default function Budget() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Typography color="textPrimary">Budget</Typography>
                        </Breadcrumbs>);
    return (
        <MainLayout title="budget">
            <div className="body">
                <Nav title="Budget" breadcrumb={breadcrumb} href="/new" />
                <Table data={data} />
            </div>
        </MainLayout>
    );
}
