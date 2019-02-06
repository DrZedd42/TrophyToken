import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {
  Icon,
  Image,
  Input,
  Menu,
  Responsive,
  Sidebar
} from 'semantic-ui-react';

import './Navigation.css';

import trophy from './trophies/trophy_8.svg';

class Navigation extends Component {
  state = {
    search: '',
    visible: false
  };

  onSidebarClick = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  onPusherClick = () => {
    const { visible } = this.state;

    if (visible) {
      this.setState({ visible: false });
    }
  }

  onChangeSearch = async (e, { name, value }) => {
    const { history, web3 } = this.props;

    this.setState({ [name]: value });

    if (web3.utils.isAddress(value)) {
      history.push(`/view/${value}`);
    }
  };

  renderNetworkStatus() {
    const { web3 } = this.props;

    if (web3 && (window.ethereum || window.web3)) {
      return (
        <Menu.Item>
          <Icon name="check circle" color="green" /> Network Connected
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item>
          <Icon name="warning circle" color="red" /> MetaMask Not Installed
        </Menu.Item>
      );
    }
  }

  renderMenuItems() {
    const { web3, accounts } = this.props;
    const { search } = this.state;

    let listItems = [
      <Menu.Item key="create" as={NavLink} to="/create">
        Create New Trophy
      </Menu.Item>
    ];

    if (web3 && accounts && accounts.length > 0) {
      listItems.push(
        <Menu.Item key="view" as={NavLink} to={`/view/${accounts[0]}`}>
          View My Trophies
        </Menu.Item>
      );

      listItems.push(
        <Menu.Item key="search">
          <Input
            icon="search"
            placeholder="Search addresses"
            name="search"
            value={search}
            onChange={this.onChangeSearch}
          />
        </Menu.Item>
      );
    }

    return listItems;
  }

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      <Sidebar.Pushable>
        <Sidebar as={Menu} animation="overlay" vertical visible={visible}>
          {this.renderNetworkStatus()}
          {this.renderMenuItems()}
        </Sidebar>
        <Sidebar.Pusher onClick={this.onPusherClick} dimmed={visible}>
          <Menu fixed="top">
            <Menu.Item as={NavLink} exact to="/" header>
              <Image src={trophy} className="menuHeaderImage" />
              &nbsp;
              TrophyToken
            </Menu.Item>
            <Responsive
              as={Menu.Menu}
              minWidth={Responsive.onlyTablet.minWidth}
            >
              {this.renderNetworkStatus()}
            </Responsive>
            <Responsive
              as={Menu.Menu}
              position="right"
              minWidth={Responsive.onlyTablet.minWidth}
            >
              {this.renderMenuItems()}
            </Responsive>
            <Responsive
              {...Responsive.onlyMobile}
              as={Menu.Menu}
              position="right"
            >
              <Menu.Item onClick={this.onSidebarClick}>
                <Icon name="sidebar" />
              </Menu.Item>
            </Responsive>
          </Menu>
          <div className="SidebarPusherChildren">
            {children}
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default withRouter(Navigation);
