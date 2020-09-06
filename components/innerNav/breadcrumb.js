import {Breadcrumb} from 'antd';

const renderBreadcrumb = page => (<Breadcrumb>
    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
    <Breadcrumb.Item><Link href="/expenses"><a>Expenses</a></Link></Breadcrumb.Item>
    <Breadcrumb.Item>{page}</Breadcrumb.Item>
</Breadcrumb>)