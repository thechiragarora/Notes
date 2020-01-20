import React, {Component} from 'react';
import {
  Card,
  Body,
  CardItem,
  Icon,
  Left,
  List,
  ListItem,
  Content as NativeContent,
  Text,
} from 'native-base';
import {TouchableOpacity} from 'react-native';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  getTypeIcon = type => {
    switch (type) {
      case 'text':
        return <Icon name="list" />;
      case 'list':
        return <Icon name="ios-list" />;
      case 'voice':
        return <Icon name="microphone" />;
    }
  };

  getTypeComponent = (type, value) => {
    switch (type) {
      case 'text':
        return (
          <Text style={{fontStyle: 'italic'}}>
            {value.length > 150 ? value.substr(0, 150) + '....' : value}
          </Text>
        );
      case 'list':
        const listToShow = [];
        for (let i = 0; i <= value.length - 1; i += 1) {
          if (i >= 3) {
            break;
          }
          listToShow.push(
            <ListItem style={{paddingTop: 5, paddingBottom: 0}}>
              {value[i].checked && <Icon name="checkmark" />}
              <Text> {value[i].value}</Text>
            </ListItem>,
          );
        }
        return <List>{listToShow}</List>;
      default:
        return <Text />;
    }
  };

  render() {
    const {items, handleCard} = this.props;
    return (
      <NativeContent padder>
        {items.map(({text, id, title, type, star, tag, [type]: value}) => (
          <TouchableOpacity
            key={id}
            onPress={() => handleCard({id, star, tag, title, value, type})}>
            <Card pointerEvents="none">
              <CardItem
                style={{
                  paddingTop: 5,
                  paddingBottom: 0,
                }}
                key={1}>
                <Body>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}>
                    {title && title.length > 70
                      ? title.substr(0, 70) + '....'
                      : title}
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                key={2}>
                <Body>{this.getTypeComponent(type, value)}</Body>
              </CardItem>
              <CardItem
                footer
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
                key={3}>
                <Left>
                  {!!tag && <Icon name="pricetag" />}
                  <Text>{tag}</Text>
                </Left>
                {this.getTypeIcon(type)}
                {star ? (
                  <Icon name="star" style={{color: 'yellow'}} />
                ) : (
                  <Icon name="star-outline" />
                )}
              </CardItem>
            </Card>
          </TouchableOpacity>
        ))}
      </NativeContent>
    );
  }
}

export default Content;
