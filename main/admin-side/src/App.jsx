import Login from "./Pages/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserTable from "./Pages/User/UserTable";
import UserForm from "./Pages/User/UserForm";
import UserDetail from "./Pages/User/UserDetail";
import UserEdit from "./Pages/User/UserEdit";



import NavigationBar from "./Component/NavigationBar";
import ProductTable from "./Pages/Product/ProductTable";
import ProductForm from "./Pages/Product/ProductForm";

const App = () => {
    return (
        <div>
            <NavigationBar />
            {/* <Sidebar /> */}
            {/* <UserEdit /> */}
            <ProductForm />
            {/* <Header />
            <DetailedHeader />
            <Tables /> */}
        </div>
    )

};

export default App;