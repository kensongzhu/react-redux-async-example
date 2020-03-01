import reducer from "../selectedSubreddit";
import {selectSubreddit} from "../../actions";

describe('selectedSubreddit reducer', () => {

    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual('reactjs')
    });

    test('should handle select subreddit', () => {
        expect(reducer(undefined, selectSubreddit('frontend'))).toEqual('frontend')
    })
});