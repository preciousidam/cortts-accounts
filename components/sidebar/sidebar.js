import {useRouter} from 'next/router';
import {AccountBalance, Grade, FormatBoldOutlined, Apartment, HotelOutlined, DescriptionOutlined, Person} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideBarLayout from '../../layouts/sidebarLayout';
import {SidebarLink} from '../button/sidebarLinks';



const links = [
    {icon: <FormatBoldOutlined />, title: 'Budget', link: 'budget'},
    {icon: <DescriptionOutlined />, title: 'Invoices', link: 'invoices'},
    {icon: <Apartment />, title: 'Apartments', link: 'apartments'},
    {icon: <Person />, title: 'landlords', link: 'landlords'},
    {icon: <HotelOutlined />, title: 'Tenants', link: 'tenants'},
    {icon: <Badge badgeContent={2} color="error"><FontAwesomeIcon icon="handshake" /></Badge>, 
        title: 'Agreements', link: 'agreements'},
]

export default function SideBar(props){
    const router = useRouter();
    
    return(
        <SideBarLayout toogle={props.toogle}>
            <ul id="sidabar-content">
                
                <SidebarLink title="Dashboard" icon={<AccountBalance />} link="index" active={router.pathname == "/" || router.pathname == "/index" ? "active" : ""} />
                {
                    links.map(
                        ({title,icon,link}, id) => <SidebarLink key={id} title={title} icon={icon} link={link} active={router.pathname.split('/')[1] == `${link}` ? "active" : ""} />
                    )
                }
                
            </ul>
        </SideBarLayout>
    );
}