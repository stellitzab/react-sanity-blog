import React from "react";
import Footer from "../Footer";
import '../../styles/style.css';
import Header from "../Header";

const DefaultLayout = ({children}) => {
    return (
        <div className="default-layout">
            <Header />
            <div>
                {children}
            </div>
            {<Footer />}
        </div>
    )
}

export default DefaultLayout