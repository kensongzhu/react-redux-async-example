import reducer from '../index';

describe('root reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            selectedSubreddit: 'reactjs',
            postsBySubreddit: {}
        })
    })
});