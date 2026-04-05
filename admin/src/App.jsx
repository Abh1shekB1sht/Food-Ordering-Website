import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";

const App = () => {
    const url = "http://localhost:4000";
    return (
        <div>
            <ToastContainer />
            <Navbar />
            <hr />
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path="/add" url={url} element={<Add />} />
                    <Route path="/list" url={url} element={<List />} />
                    <Route path="/orders" url={url} element={<Orders />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
