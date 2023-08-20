import React from "react";
import { createRoot } from "react-dom/client";
import LogIn from "../components/LoginComponent";

test("Login component renders without crashing", () => {
    // create a div container for Login page
    const div = document.createElement("div");

    // create test function for handleLogIn
    const handleLogIn = jest.fn();

    // test if the component renders with the props created
    createRoot(div).render(
        <LogIn
            handleLogIn={handleLogIn}
        />
    );
});