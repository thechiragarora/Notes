import React, {Component} from 'react';
import {Container, Toast} from 'native-base';
import {FloatingButton, Footer} from '../../components';
import {Header, Content} from './components';
import Activity from '../Activity';
import AsyncStorage from '@react-native-community/async-storage';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      openModal: {
        id: '',
      },
    };
  }

  componentDidMount = async () => {
    try {
      const items = await AsyncStorage.getItem('items');
      if (items !== null) {
        this.setState({items: JSON.parse(items)});
      }
    } catch (e) {
      alert('Error while fetching data');
      console.log('Error while fetching data');
    }
  };

  handleCreateNote = type => {
    const id = Math.floor(Math.random() * 10000);
    const {items} = this.state;
    items.unshift({
      id,
      type,
      star: false,
      tag: '',
    });
    this.setState({
      items,
      openModal: {id, type, star: false, tag: ''},
    });
  };

  closeModal = async value => {
    const {id, type, title, star, tag} = value;
    let {items} = this.state;
    if (!title && (!value[type] || !value[type].length)) {
      items = items.filter(item => item.id !== id);
    } else {
      items.forEach(item => {
        if (item.id === id) {
          item.title = title;
          item[type] = value[type];
          item.star = star;
          item.tag = tag;
        }
      });
    }

    await AsyncStorage.setItem('items', JSON.stringify(items));

    Toast.show({
      text: 'Note Saved',
      position: 'bottom',
      buttonText: 'Ok',
      buttonStyle: {backgroundColor: 'green'},
    });

    this.setState({
      openModal: {id: ''},
      items,
    });
  };

  handleCard = ({id, star, tag, type, title, value}) => {
    this.setState({openModal: {id, star, tag, type, title, [type]: value}});
  };

  contents = [
    {name: 'list', text: 'Text', handle: () => this.handleCreateNote('text')},
    {
      name: 'ios-list',
      text: 'List',
      handle: () => this.handleCreateNote('list'),
    },
    {
      name: 'microphone',
      text: 'Voice',
      handle: () => this.handleCreateNote('voice'),
    },
  ];

  render() {
    const {items, openModal} = this.state;
    return (
      <>
        {openModal.id !== '' ? (
          <Activity data={openModal} closeModal={this.closeModal} />
        ) : (
          <Container>
            <Header icon="menu" title="Notes" />
            <Content items={items} handleCard={this.handleCard} />
            <FloatingButton
              direction="up"
              backgroundColor="#5067FF"
              position="bottomRight"
              mainIcon={{onOpen: 'md-add', onClose: 'close'}}
              contents={this.contents}
            />
          </Container>
        )}
      </>
    );
  }
}
export default Dashboard;
