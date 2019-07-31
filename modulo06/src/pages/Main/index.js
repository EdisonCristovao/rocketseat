import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, Input, SubmitButton } from './styles';

class Main extends Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = () => {
    const { newUser, users } = this.state;

    this.setState({ users: [...users, newUser] });
  };

  render() {
    const { users, newUser } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuários"
            value={newUser}
            onChangeText={user => this.setState({ newUser: user })}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

export default Main;

Main.navigationOptions = {
  title: 'Usuários',
};
