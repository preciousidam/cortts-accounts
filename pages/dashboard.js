import MainLayout from "../layouts/mainLayout";
import {ProtectRoute} from '../utility/route';

export function Home() {
    return (
        <MainLayout title="Dashboard">
            <div>
                <h1>Dashboard</h1>
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Home);