import React from "react";
import { createRoot } from "react-dom/client";
import EventsPage from "../components/EventsPage";

test("EventsPage renders without crashing", () => {
    // create a div container for EventsPage
    const div = document.createElement("div");

    // create test functions for onLogOut and create a fake userToken
    const onLogOut = jest.fn();
    const userToken = 'fakeTokenForTesting';

    // test if the component renders with the props created
    createRoot(div).render(
        <EventsPage
            onLogOut={onLogOut}
            userToken={userToken}
        />
    );
});

