import React, {Component} from 'react';
import {Fab, Button, Icon} from 'native-base';

class FloatingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const {open} = this.state;
    const {
      mainIcon,
      direction,
      backgroundColor,
      position,
      contents,
    } = this.props;
    return (
      <Fab
        active={open}
        direction={direction}
        style={{backgroundColor}}
        position={position}
        onPress={() => this.setState({open: !open})}>
        <Icon name={open ? mainIcon.onClose : mainIcon.onOpen} />
        {contents.map(content => {
          const {name, handle} = content;
          return (
            <Button style={{backgroundColor}} onPress={handle}>
              <Icon name={name} />
            </Button>
          );
        })}
      </Fab>
    );
  }
}

export default FloatingButton;
