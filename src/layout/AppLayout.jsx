import { Footer } from "component/footer/Footer";
import Header from "component/header/Header";


export function AppLayout({children}) {
    return (<>
    <Header/>
    {children}
    <Footer/>
    </>)
}