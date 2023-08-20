import React from 'react';
import TestRenderer from 'react-test-renderer';
import MainComponent from '../components/MainComponent';

// check if the MainComponent renders correctly
test('MainComponent renders correctly', () => {
    // create a test renderer for the MainComponent
    const testRenderer = TestRenderer.create(<MainComponent />);
    const test = testRenderer.root;

    // verify that the rendered output matches the expected output
    expect(test.findByType(MainComponent)).toBeDefined();
});
