import {useRouter} from 'next/router';
import {AccountBalance, AccountBalanceWalletOutlined, FormatBoldOutlined, Apartment, HotelOutlined, DescriptionOutlined, Person} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideBarLayout from '../../layouts/sidebarLayout';
import {SidebarLink, MinSidebarLink} from '../button/sidebarLinks';



const links = [
    {icon: <FontAwesomeIcon icon="money-check-alt" />, title: 'Transactions', link: 'transactions'},
    {icon: <FormatBoldOutlined />, title: 'Budget', link: 'budget'},
    {icon: <FontAwesomeIcon icon={['fab',"etsy"]} />, title: 'Expenses', link: 'expenses'},
    {icon: <DescriptionOutlined />, title: 'Invoices', link: 'invoices'},
    {icon: <AccountBalanceWalletOutlined />, title: 'Accounts', link: 'accounts'},
    {icon: <Apartment />, title: 'Apartments', link: 'apartments'},
    {icon: <Person />, title: 'Clients', link: 'clients'},
    {icon: <Person />, title: 'Vendors', link: 'vendors'},
    {icon: <Badge badgeContent={2} color="error"><FontAwesomeIcon icon="handshake" /></Badge>, 
        title: 'Agreements', link: 'agreements'},
]

export default function SideBar({min}){
    const router = useRouter();
    
    return(
        <SideBarLayout min={min}>
            <ul id="sidabar-content">
                
                <SidebarLink title="Dashboard" icon={<AccountBalance />} link="dashboard" active={router.pathname == "/" || router.pathname == "/dashboard" ? "active" : ""} />
                {
                    links.map(
                        ({title,icon,link}, id) => <SidebarLink key={id} title={title} icon={icon} link={link} active={router.pathname.split('/')[1] == `${link}` ? "active" : ""} />
                    )
                }
                
            </ul>
        </SideBarLayout>
    );
}

export function MinSideBar({min}){
    const router = useRouter();
    
    return(
        <SideBarLayout min={min}>
            <ul id="sidabar-content">
                
                <MinSidebarLink title="Dashboard" icon={<AccountBalance />} link="index" active={router.pathname == "/" || router.pathname == "/index" ? "active" : ""} />
                {
                    links.map(
                        ({title,icon,link}, id) => <MinSidebarLink key={id} title={title} icon={icon} link={link} active={router.pathname.split('/')[1] == `${link}` ? "active" : ""} />
                    )
                }
                
            </ul>
        </SideBarLayout>
    );
}