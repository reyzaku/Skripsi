import Login from "./Pages/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Component/Header";
import Sidebar from "./Component/SideBar";
import DetailedHeader from "./Component/DetailedHeader";
import Tables from "./Component/Tables";

const App = () => {
    return(
        <div>
            <Sidebar />
            <Header />
            <DetailedHeader />
            <Tables />    
        </div>
    ) 
        
};

export default App;