import MainRouter from "./MainRouter";
import { UserProvider } from "./context/UserContext";
const App = () => {
    return <UserProvider>
        <MainRouter />
    </UserProvider>;
};

export default App;