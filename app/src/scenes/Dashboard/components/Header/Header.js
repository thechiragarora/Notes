import React from 'react';
import {
  Header as NativeHeader,
  Button,
  Left,
  Right,
  Body,
  Title,
  Icon,
} from 'native-base';

const Header = ({icon, title}) => (
  <NativeHeader>
    <Left>
      <Button
        transparent
        onPress={() => alert('Will be coming in the another release')}>
        <Icon name={icon} />
      </Button>
    </Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right />
  </NativeHeader>
);

export default Header;
