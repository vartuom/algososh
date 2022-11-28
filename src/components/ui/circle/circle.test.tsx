import renderer from 'react-test-renderer';
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe('Circle test', () => {
    it('renders blank', () => {
        const circleElement = renderer.create(<Circle />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
    it('renders with letters', () => {
        const circleElement = renderer.create(<Circle letter={'any'} />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
    it('renders with head prop', () => {
        const circleElement = renderer.create(<Circle head={'any'} />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
    it('renders with react element in head prop', () => {
        const circleElement = renderer.create(<Circle head={<Circle />} />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
    it('renders with tail prop', () => {
        const circleElement = renderer.create(<Circle tail={'any'} />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
    it('renders with react element in tail prop', () => {
        const circleElement = renderer.create(<Circle tail={<Circle />} />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
    it('renders with index prop', () => {
        const circleElement = renderer.create(<Circle index={1} />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
    it('renders with isSmall prop', () => {
        const circleElement = renderer.create(<Circle isSmall={true} />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
    it('renders in default state', () => {
        const circleElement = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
    it('renders in changing state', () => {
        const circleElement = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
    it('renders in modified state', () => {
        const circleElement = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(circleElement).toMatchSnapshot();
    })
})