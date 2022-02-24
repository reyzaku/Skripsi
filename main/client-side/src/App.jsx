import Cart from "./pages/Cart";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList"
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import CheckoutOne from "./pages/CheckoutOne"
import CheckoutTwo from "./pages/CheckoutTwo";
import CheckoutThree from "./pages/CheckoutThree";
import MainRouter from "./MainRouter";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return <UserProvider>
    <MainRouter />
  </UserProvider>;
};

export default App;