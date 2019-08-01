import React, { Component } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  StarsLoad,
} from './styles';

class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    starsLoading: true,
    refreshing: false,
    page: 1,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`users/${user.login}/starred`);

    this.setState({ stars: response.data, starsLoading: false });
  }

  loadMoreStars = async () => {
    const { stars, page } = this.state;
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    const response = await api.get(`users/${user.login}/starred`, {
      params: { page: page + 1 },
    });

    this.setState({ stars: [...stars, ...response.data], page: page + 1 });
  };

  refreshList = async () => {
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    const response = await api.get(`users/${user.login}/starred`);

    this.setState({ stars: response.data, page: 1 });
  };

  render() {
    const { navigation } = this.props;
    const { stars, starsLoading, refreshing } = this.state;

    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {starsLoading ? (
          <StarsLoad color="#7159c1" size={32} />
        ) : (
          <Stars
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMoreStars}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <RectButton
                onPress={() => navigation.navigate('Project', { item })}
              >
                <Starred>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </RectButton>
            )}
          />
        )}
      </Container>
    );
  }
}

export default User;
