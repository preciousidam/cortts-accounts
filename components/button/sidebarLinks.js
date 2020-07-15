
import Link from 'next/link';

export const SidebarLink = ({icon, title, link, active}) => {
    
    return (
        <li className={`link ${active}`}>
            <Link href={`/${link}`}><a>{icon}<p>{title}</p></a></Link>
        </li>
    );
}