import DashBoardLayout from "../components/DashboardLayout";
import { type NextPageWithLayout } from "../_app";

const Consultancy: NextPageWithLayout = () => {
    return (<>Consultancy</>)
}

Consultancy.getLayout = function getLayout(page: React.ReactElement) {
    return <DashBoardLayout childern={page} />
}

export default Consultancy;