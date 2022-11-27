import renderer from 'react-test-renderer';
import {Button} from "./button";
import {fireEvent, render, screen} from "@testing-library/react";

describe('Button test', () => {
    it('renders with text', () => {
        const buttonElement = renderer.create(<Button text={'some text'} />).toJSON();
        expect(buttonElement).toMatchSnapshot();
    })
    it('renders without text', () => {
        const buttonElement = renderer.create(<Button />).toJSON();
        expect(buttonElement).toMatchSnapshot();
    })
    it('renders with disabled prop', () => {
        const buttonElement = renderer.create(<Button disabled={true}/>).toJSON();
        expect(buttonElement).toMatchSnapshot();
    })
    it('renders with loader prop', () => {
        const buttonElement = renderer.create(<Button isLoader={true}/>).toJSON();
        expect(buttonElement).toMatchSnapshot();
    })
    it('fires callback on click', () => {
        const callbackFn  = jest.fn();
        render(<Button text={'callbackTest'} onClick={callbackFn}/>);
        const buttonElement = screen.getByText('callbackTest');
        fireEvent.click(buttonElement);
        expect(callbackFn).toHaveBeenCalledTimes(1);
    })
})