import { Route, Routes } from "react-router-dom";
// import { Register } from "feature/register/Register";
import * as React from "react";
import loadable from "@loadable/component";
import { Login } from "feature/Login/Login";
// import { HomePage } from "feature/homepage/HomePage";

// const HomePage = loadable(() => import('feature/homepage/HomePage'));
const HomePage = loadable(() => import('feature/homepage/HomePage'), {
    resolveComponent: (components) => components.HomePage,
});
const Register = loadable(() => import('feature/register/Register'), {
    resolveComponent: (components) => components.Register,
});

export function RouterApp() {
    return (
        <Routes>
            <Route
                index
                element={<HomePage />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}