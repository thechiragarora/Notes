import React from 'react';
// import {Picker, Form} from 'native-base';
import {Picker} from 'react-native';

const SelectFromDropDown = ({
  dropDownList,
  selectedValue,
  handleValueChange,
}) => (
  <Picker
    mode="dropdown"
    style={{width: 270}}
    selectedValue={selectedValue}
    onValueChange={handleValueChange}>
    {dropDownList.map(item => (
      <Picker.Item label={item.label} value={item.value} />
    ))}
  </Picker>
);

export default SelectFromDropDown;
