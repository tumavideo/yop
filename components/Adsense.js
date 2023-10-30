import React from 'react';
import assets from "@/assets";

const Adsense = (props) => {

    if(props.type === "sidebar") {
        return (
            <a href="https://crowdsourcecreators.com" target="_blank">
                <img className="w-full" src={assets.sidebar.src} alt="logo"/>
            </a>
        );
    }

    if (props.type === "leaderboard-1") {
        return (
            <a href="https://crowdsourcecreators.com" target="_blank">
                <img className="w-full" src={assets.leaderboard.src} alt="logo"/>
            </a>
        );
    }

    return (
        <a href="https://crowdsourcecreators.com" target="_blank">
            <img className="w-full" src={assets.adsense.src} alt="logo"/>
        </a>
    );
};

export default Adsense;
