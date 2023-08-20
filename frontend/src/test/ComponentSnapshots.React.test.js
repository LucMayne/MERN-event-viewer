import React from 'react';
import TestRenderer from 'react-test-renderer';
import MainComponent from '../components/MainComponent';
import LogIn from "../components/LoginComponent";
import EventsPage from "../components/EventsPage";
import UserEventsPage from "../components/UserEventsPage";

// create a mock fetch to prevent errors
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ events: [] }),
  })
);

// create a snapshot test for each component

test('MainComponent renders correctly', () => {
    // create a test renderer for the MainComponent
    const testRenderer = TestRenderer.create(<MainComponent />);

    // create a snapshot of the rendered output
    expect(testRenderer.toJSON()).toMatchSnapshot();
});

test('LogIn renders correctly', () => {
    // create a test renderer for the MainComponent
    const testRenderer = TestRenderer.create(<LogIn />);

    // create a snapshot of the rendered output
    expect(testRenderer.toJSON()).toMatchSnapshot();
});

test('EventsPage renders correctly', () => {
    // create a test renderer for the MainComponent
    const testRenderer = TestRenderer.create(<EventsPage />);

    // create a snapshot of the rendered output
    expect(testRenderer.toJSON()).toMatchSnapshot();
});

test('UserEventsPage renders correctly', () => {
    // create a test renderer for the MainComponent
    const testRenderer = TestRenderer.create(<UserEventsPage />);

    // create a snapshot of the rendered output
    expect(testRenderer.toJSON()).toMatchSnapshot();
});
