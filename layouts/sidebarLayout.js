import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/styles.scss';

export default function SideBar({children, toogle}){
    return(
        <aside className={`sidebar col-lg-2 sidebar-area position-sticky ${toogle}`} id="slider">
            <div id="brand">
                <img src="/images/logo.png" />
                <h2>CORTTS</h2>
            </div>
            <div>
                {children}
            </div>
        </aside>
    );
}