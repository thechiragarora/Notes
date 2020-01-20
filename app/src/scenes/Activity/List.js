import React, {Component} from 'react';
import {View, Modal} from 'react-native';
import {
  Button,
  Text,
  Icon,
  Item,
  Input,
  Card,
  CardItem,
  Left,
  CheckBox,
  Right,
  Body,
} from 'native-base';
// import Modal from './Modal';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      itemValue: '',
    };
  }

  handleOnChange = input => {
    this.setState({itemValue: input});
  };

  handleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible, itemValue: ''});
  };

  handleCheckbox = index => {
    const {list, handleOnChange} = this.props;
    list[index].checked = !list[index].checked;
    handleOnChange(list);
  };

  handleSuccess = () => {
    const {itemValue} = this.state;
    let {list, handleOnChange} = this.props;
    if (!list) {
      list = [];
    }
    if (itemValue !== '') {
      list.unshift({value: itemValue, checked: false});
      handleOnChange(list);
    }
    this.handleModal();
  };

  handleDelete = index => {
    const {list, handleOnChange} = this.props;
    list.splice(index, 1);
    handleOnChange(list);
  };

  render() {
    const {itemValue, modalVisible} = this.state;
    const {list} = this.props;
    return (
      <>
        <Button iconLeft transparent rounded onPress={this.handleModal}>
          <Icon name="md-add" />
          <Text>Add New Item</Text>
        </Button>
        {list &&
          !!list.length &&
          list.map((item, index) => {
            const strikeStyle = {textDecorationLine: 'line-through'};
            return (
              <Item>
                <Left>
                  <CheckBox
                    checked={item.checked}
                    onPress={() => this.handleCheckbox(index)}
                  />
                </Left>
                <Body>
                  <Text style={item.checked ? strikeStyle : {}}>{` ${
                    item.value
                  }`}</Text>
                </Body>
                <Right>
                  {/* <Button transparent>
                    <Icon name="create" />
                  </Button> */}
                  <Button transparent onPress={() => this.handleDelete(index)}>
                    <Icon name="trash" />
                  </Button>
                </Right>
              </Item>
            );
          })}
        <View style={{flex: 1}}>
          <Modal
            animationType="slide"
            transparent
            visible={this.state.modalVisible}>
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
                <Text>Add new Item</Text>
                <Item>
                  <Input
                    placeholder="Enter your Item here"
                    value={itemValue}
                    onChangeText={input => this.handleOnChange(input)}
                  />
                </Item>
                <CardItem>
                  <Left>
                    <Button rounded bordered danger onPress={this.handleModal}>
                      <Text>Cancel</Text>
                    </Button>
                  </Left>
                  <Button rounded bordered success onPress={this.handleSuccess}>
                    <Text>Okay</Text>
                  </Button>
                </CardItem>
              </Card>
            </View>
          </Modal>
          {/* {modalVisible && (
            <Modal
              title="Add new Item"
              visible={this.state.modalVisible}
              handleCancel={this.handleModal}
              handleOk={this.handleSuccess}>
              {() => (
                <Input
                  placeholder="Enter your Item here"
                  value={itemValue}
                  onChangeText={input => this.handleOnChange(input)}
                />
              )}
            </Modal>
          )} */}
        </View>
      </>
    );
  }
}

export default List;
