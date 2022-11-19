import Categories from "component/category/Categories";
import Header from "component/header/Header";
import Slider from "component/slider/Slider";
import { Footer } from "../component/footer/Footer";


export function FullLayout({children}) {

    return (<>
        <Header />
        <Slider/>
        <Categories/>
        {children}
        <Footer/>
    </>)
}