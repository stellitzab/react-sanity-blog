import React from "react";
import Footer from "../Footer";
import '../../styles/style.css';
import Header from "../Header";
import NavBar from "../NavBar";

const DefaultLayout = ({children}) => {
    return (
        <div className="default-layout">
            <Header />
            <div className="main-content">
                {children}
            </div>
            {<Footer />}
        </div>
    )
}
export default DefaultLayout