import React from "react";
import {Routes, Route } from "react-router-dom";
import Home from "../views/home";
import Restaurants from "../views/restaurants";
import Authentications from "../views/auth";
import ResProfile from "../views/resprofile";
import Profile from "../views/profile";

function AppRoute() {
    return ( 
        <div>
            <Routes>
                <Route path="" element={<Home />}/>
                <Route path="/home" element={<Home />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/auth" element={<Authentications />} />
                <Route path="/resprofile" element={<ResProfile/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </div>
     );
}

export default AppRoute;