import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import {CategoryPage, HomePage, Login, ProductsPage, ProfilePage, RegisterPage, SubCategoryPage} from "./pages";
import {Footer, Header} from "./layout";
import { useSelector } from "react-redux";
import NotFound from "./pages/notFound-page/NotFound-page";

function App() {

    const mode = useSelector((state) => state.mode.mode);

    return (
        <>
            <BrowserRouter>
                <div className={`${mode === 'dark' ? ('dark') : ('')}`}>
                    <Header/>
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route path={"/product/:productId"} element={<ProductsPage />} />
                        <Route path={"/category/:categoryId"} element={<CategoryPage />} />
                        <Route path={"/subcategory/:subcategoryId"} element={<SubCategoryPage />} />
                        <Route path={"/register"} element={<RegisterPage />} />
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/profile"} element={<ProfilePage />} />
                        <Route path={"*"} element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
