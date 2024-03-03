import React from 'react'
import welcomeImage from "../assets/welcome.png";
import { Navbar } from './index'



const Home = () => {

    const sectionStyle = {
        background: `url(${welcomeImage}) no-repeat center center fixed`,
        backgroundSize: "cover",
        height: "100vh", // Set the height to cover the full viewport
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // color: "#ffffff", // Set text color to white or any contrast color
    };

    return (
        <section style={sectionStyle}>
            <Navbar />

        </section>
    )
}

export default Home