import React, { Component } from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents />', () => {
    let NumberOfEventsWrapper, noeInput;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        noeInput = NumberOfEventsWrapper.find('.noe-input');
    });

    test('<NumberOfEvents /> and noe-input are both rendered', () => {
      expect(NumberOfEventsWrapper).toBeDefined();
      expect(noeInput).toBeDefined();
    });

    test('noe-input is 32 (number type) by default', () => {
       expect(NumberOfEventsWrapper.find('input.noe-input').prop('type')).toBe('number');
       expect(NumberOfEventsWrapper.state('noe')).toBe(32);
    });

    test('noe-input is changed and the value is reflected correctly', () => {
        expect(NumberOfEventsWrapper.state('noe')).toBe(32);
        NumberOfEventsWrapper.find('input.noe-input')
        .simulate('change', {
            target: { value: 37}
        });
        expect(NumberOfEventsWrapper.state('noe')).toBe(37);
    })
})