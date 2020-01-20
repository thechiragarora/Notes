import React, {Component} from 'react';
import {Modal as NativeModal, View} from 'react-native';
import {
  Button,
  Text,
  Icon,
  Item,
  Input,
  Card,
  CardItem,
  Left,
} from 'native-base';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      //   visible,
      handleCancel,
      handleOk,
      title,
      children: Children,
    } = this.props;
    return (
      <NativeModal animationType="slide" transparent>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(100,100,100, 0.5)',
            padding: 20,
          }}>
          <Card>
            <Text>{title}</Text>
            <Item>
              <Children />
            </Item>
            <CardItem>
              <Left>
                <Button rounded bordered danger onPress={handleCancel}>
                  <Text>Cancel</Text>
                </Button>
              </Left>
              <Button rounded bordered success onPress={handleOk}>
                <Text>Okay</Text>
              </Button>
            </CardItem>
          </Card>
        </View>
      </NativeModal>
    );
  }
}
export default Modal;
