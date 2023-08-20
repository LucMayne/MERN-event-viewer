import React from "react";
import { createRoot } from "react-dom/client";
import UserEventsPage from "../components/UserEventsPage";

test("UserEventsPage renders without crashing", () => {
    // create a div container for UserEventsPage
    const div = document.createElement("div");

    // create test function for onLogOut and create a fake userToken
    const onLogOut = jest.fn();
    const userToken = 'fakeTokenForTesting';

    // test if the component renders with the props created
    createRoot(div).render(
        <UserEventsPage
            onLogOut={onLogOut}
            userToken={userToken}
        />
    );
});
