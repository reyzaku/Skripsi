import Login from "./Pages/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserTable from "./Pages/User/UserTable";
import UserForm from "./Pages/User/UserForm";
import UserDetail from "./Pages/User/UserDetail";
import UserEdit from "./Pages/User/UserEdit";



import NavigationBar from "./Component/NavigationBar";

const App = () => {
    return (
        <div>
            <NavigationBar />
            {/* <Sidebar /> */}
            <UserEdit />
            {/* <Header />
            <DetailedHeader />
            <Tables /> */}
        </div>
    )

};

export default App;