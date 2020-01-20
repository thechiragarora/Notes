import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Left,
  Button,
  Icon,
  Right,
  Textarea,
  Text,
} from 'native-base';
import List from './List';
import Modal from './Modal';
import {SelectFromDropDown} from '../../components';
import {tagList} from './constants';

class Activity extends Component {
  constructor(props) {
    super(props);
    const {
      data: {id, ...rest},
    } = props;
    this.state = {
      modalInfo: {
        visible: false,
        type: '',
      },
      dropDownValue: '',
      ...rest,
    };
  }

  handleOnChange = (recognizer, input) => {
    this.setState({[recognizer]: input});
  };

  handleModalCancel = () => {
    this.setState({modalInfo: {visible: false, type: ''}});
  };

  handleDropDownChange = value => {
    this.setState({dropDownValue: value});
  };

  modalContent = {
    delete: {
      title: 'Do you want to delete this Note ?',
      handleOk: () =>
        this.props.closeModal({
          id: this.props.data.id,
          title: '',
          [this.props.type]: '',
        }),
      handleCancel: () => this.handleModalCancel(),
      item: () => <Text />,
    },
    tag: {
      title: 'Add Tag',
      handleOk: () => {
        this.setState({tag: this.state.dropDownValue});
        this.handleModalCancel();
      },
      handleCancel: () => this.handleModalCancel(),
      item: () => (
        <SelectFromDropDown
          dropDownList={tagList}
          selectedValue={this.state.dropDownValue}
          handleValueChange={this.handleDropDownChange}
        />
      ),
    },
  };

  render() {
    const {
      closeModal,
      data: {id, type},
    } = this.props;
    const {title, star, modalInfo} = this.state;
    const {
      id: stateId,
      modalInfo: stateModalInfo,
      dropDownValue,
      ...rest
    } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => closeModal({id, ...rest})}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              onPress={() => alert('Coming in the another release')}>
              <Icon name="color-palette" />
            </Button>
            <Button
              transparent
              onPress={() => this.handleOnChange('star', !star)}>
              <Icon name={star ? 'star' : 'star-outline'} />
            </Button>
            <Button
              transparent
              onPress={() =>
                this.setState({modalInfo: {visible: true, type: 'tag'}})
              }>
              <Icon name="pricetag" />
            </Button>
            <Button
              transparent
              onPress={() =>
                this.setState({modalInfo: {visible: true, type: 'delete'}})
              }>
              <Icon name="trash" />
            </Button>
            <Button
              transparent
              onPress={() => alert('Will be coming in the another release')}>
              <Icon name="share" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Item>
            <Input
              placeholder="Title"
              value={title}
              onChangeText={input => this.handleOnChange('title', input)}
            />
          </Item>
          {type === 'text' && (
            <Textarea
              rowSpan={10}
              placeholder="Body"
              value={this.state.text}
              onChangeText={input => this.handleOnChange('text', input)}
            />
          )}
          {type === 'list' && (
            <List
              list={this.state.list}
              handleOnChange={input => this.handleOnChange('list', input)}
            />
          )}
          {type === 'voice' && (
            <Text style={{fontWeight: 'bold', paddingTop: 20, color: 'green'}}>
              Will be coming in the another release
            </Text>
          )}
        </Content>
        {modalInfo.visible && (
          <Modal
            handleCancel={this.modalContent[modalInfo.type].handleCancel}
            handleOk={this.modalContent[modalInfo.type].handleOk}
            title={this.modalContent[modalInfo.type].title}>
            {this.modalContent[modalInfo.type].item}
          </Modal>
        )}
      </Container>
    );
  }
}

export default Activity;
