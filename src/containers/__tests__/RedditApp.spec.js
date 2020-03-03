import React from "react";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import RedditApp from "../RedditApp";
import {shallow} from "enzyme";

const setup = (initialState = {}, strategy = shallow) => {
    const store = configureStore([thunk])(initialState);
    const wrapper = strategy(<RedditApp store={store}/>);
    return {
        store,
        wrapper
    }
};


describe('Reddit App', () => {

    afterEach(() => {
        fetch.resetMocks();
    });

    test('should render without crashing', () => {
        fetch.once(JSON.stringify({
            data: {
                children: [
                    {data: {title: 'subreddit 1'}},
                    {data: {title: 'subreddit 2'}}
                ]
            }
        }));
        const {wrapper} = setup({selectedSubreddit: 'frontend', postsBySubreddit: {}});
        expect(wrapper).toMatchSnapshot();
    });
});
