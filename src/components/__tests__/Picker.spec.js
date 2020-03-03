import React from "react";
import {shallow} from "enzyme";
import Picker from "../Picker";

const setup = (setupProps = {}) => {

	const defaultProps = {
		value: 'frontend',
		onChange: jest.fn(value => value),
		options: ['frontend', 'react', 'redux']
	};

	const props = {...defaultProps, ...setupProps};

	const wrapper = shallow(<Picker {...props} />);

	return {
		props,
		wrapper
	}
};

describe("Picker", () => {

	test("should render without crashing", () => {
		const {wrapper} = setup();
		expect(wrapper).toMatchSnapshot();
	});

	test("should call onChange callback after select", () => {
		const {props, wrapper} = setup({value: 'foo', options: ['foo', 'bar', 'baz']});
		const h1 = wrapper.find('h1');
		const select = wrapper.find('select');

		// 'foo' as default
		expect(h1.text()).toEqual('foo');
		expect(select.props().value).toEqual('foo');

		// change to `bar`
		// no need to test state, since this component doesn't hold state
		select.simulate('change', {target: {value: 'bar'}});
		expect(props.onChange).toHaveBeenCalledWith('bar');
	})
});