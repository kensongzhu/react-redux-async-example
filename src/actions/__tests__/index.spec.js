import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import {fetchPosts, RECEIVE_POSTS, REQUEST_POSTS} from "../index"

const middleware = [thunk];
const mockStore = configureStore(middleware);
const mockDate = 1482363367071;
Date.now = jest.fn(() => mockDate);

describe("actions", () => {
    afterEach(() => {
        fetch.resetMocks();
    });

    test("should fetch posts", () => {
        fetch.once(JSON.stringify({
            data: {
                children: [
                    {data: {title: 'subreddit 1'}},
                    {data: {title: 'subreddit 2'}}
                ]
            }
        }));

        const store = mockStore({});
        const subreddit = 'frontend';
        const expectedAction = [
            {
                type: REQUEST_POSTS,
                subreddit: subreddit
            }, {
                type: RECEIVE_POSTS,
                subreddit: subreddit,
                posts: [
                    {title: "subreddit 1"},
                    {title: 'subreddit 2'}
                ],
                receiveAt: mockDate,
            }
        ];

        return store.dispatch(fetchPosts('frontend')).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toContain(subreddit);
        });
    });

    test("should fetch posts if needed", ()=>{

    });

});