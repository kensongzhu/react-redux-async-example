import reducer from "../postsBySubreddit";
import {invalidateSubreddit, receivePosts, requestPosts} from "../../actions";

// mock date in ms
const mockDate = 1482363367071;
Date.now = jest.fn(() => mockDate);

describe('postsBySubreddit reducer', () => {

    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    });

    test('should handle invalidate subreddit', () => {
        expect(reducer(undefined, invalidateSubreddit('frontend'))).toEqual({
            "frontend": {
                didInvalidate: true,
                isFetching: false,
                items: []
            }
        })
    });

    test('should handle request posts', () => {
        expect(reducer(undefined, requestPosts('frontend'))).toEqual({
            "frontend": {
                didInvalidate: false,
                isFetching: true,
                items: []
            }
        })
    });

    test('should handle receive posts', () => {
        const json = {
            data:
                {
                    children: [
                        {data: {title: 'subreddit 1'}},
                        {data: {title: 'subreddit 2'}},
                        {data: {title: 'subreddit 3'}},
                    ]
                }
        };
        // console.log(receivePosts('frontend', json))
        expect(reducer(undefined, receivePosts('frontend', json))).toEqual({
            frontend: {
                didInvalidate: false,
                isFetching: false,
                items: [
                    {title: 'subreddit 1'},
                    {title: 'subreddit 2'},
                    {title: 'subreddit 3'},
                ],
                lastUpdated: mockDate
            }
        })
    })
});

