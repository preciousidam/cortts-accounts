import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomScroll from 'react-custom-scroll';

import '../styles/styles.scss';

export default function SideBar({children, min=false}){
    const className = min ? 'col-lg-1' : 'col-lg-2';
    return(
        <aside className={`sidebar ${className} sidebar-area position-sticky`} id={min ? 'min': ''}>
            <div id="brand">
                <img src="/images/logo.png" />
                {!min && <h2>CORTTS</h2>}
            </div>
            <div>
                <CustomScroll heightRelativeToParent="calc(100% - 67px)">
                    {children}
                </CustomScroll>
            </div>
        </aside>
    );
}