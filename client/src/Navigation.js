import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Image, Input, Menu } from 'semantic-ui-react';

import trophy from './trophies/trophy_8.svg';

class Navigation extends Component {
  state = {
    search: ''
  };

  onChangeSearch = async (e, { name, value }) => {
    const { history, web3 } = this.props;

    this.setState({ [name]: value });

    if (web3.utils.isAddress(value)) {
      history.push(`/view/${value}`);
      this.setState({ [name]: '' });
    }
  };

  renderMenuItems() {
    const { web3, accounts } = this.props;
    const { search } = this.state;

    if (web3 && accounts) {
      return (
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/create">
            Create New Trophy
          </Menu.Item>
          <Menu.Item as={NavLink} to={`/view/${accounts[0]}`}>
            View My Trophies
          </Menu.Item>
          <Menu.Item>
            <Input
              icon="search"
              placeholder="Search addresses"
              name="search"
              value={search}
              onChange={this.onChangeSearch}
            />
          </Menu.Item>
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/create">
            Create New Trophy
          </Menu.Item>
        </Menu.Menu>
      );
    }
  }

  render() {
    return (
      <Menu fixed="top">
        <Menu.Item as={NavLink} exact to="/" header>
          <Image src={trophy} className="menuHeaderImage" />
          &nbsp;
          TrophyToken
        </Menu.Item>
        {this.renderMenuItems()}
      </Menu>
    );
  }
}

export default withRouter(Navigation);
