
import Link from 'next/link';
import { MinSideBar } from '../sidebar/sidebar';

export const SidebarLink = ({icon, title, link, active}) => {
    
    return (
        <li className={`link ${active}`}>
            <Link href={`/${link}`}><a>{icon}<p>{title}</p></a></Link>
        </li>
    );
}

export const MinSidebarLink = ({icon,link,active}) => {
    return (
        <li className={`min-link ${active ? 'min-active' : ''}`}>
            <Link href={`/${link}`}><a>{icon}</a></Link>
        </li>
    );
}