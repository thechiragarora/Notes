import React from 'react';
import {Footer as NativeFooter, Button, Text, FooterTab} from 'native-base';

const Footer = ({text}) => (
  <NativeFooter>
    <FooterTab>
      <Button full>
        <Text>{text}</Text>
      </Button>
    </FooterTab>
  </NativeFooter>
);

export default Footer;
