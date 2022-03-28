import Login from "./Pages/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from "./Pages/User/UserForm";
import NavigationBar from "./Component/NavigationBar";

const App = () => {
    return (
        <div>
            <NavigationBar />
            {/* <Sidebar /> */}
            <UserForm />
            {/* <Header />
            <DetailedHeader />
            <Tables /> */}
        </div>
    )

};

export default App;