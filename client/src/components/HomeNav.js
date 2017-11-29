import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Icon, Anchor } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import bluebulb from '../images/bluebulb.png';
import { NavLink } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

const menuTopics = (          
  <ul>
    <li className='subtopic'><a href='#'>Technology</a></li>
    <li className='subtopic'><a href='#'>Hobbies</a></li>
    <li className='subtopic'><a href='#'>Sports</a></li>
    <li className='subtopic'><a href='#'>Fashion</a></li>
    <li className='subtopic'><a href='#'>Life Hacks</a></li>
    <li className='subtopic'><a href='#'>"Get Started..."</a></li>
  </ul>
);

const userAccountMenu = (          
  <ul>
    <li className='subtopic'><a href='#'>My MindFeed</a></li>
    <li className='subtopic'><a href='#'>My Bookmarks</a></li>
    <li className='subtopic'><a href='#'>Settings</a></li>
    <li className='subtopic'><a href='#'>Log Out</a></li>

  </ul>
);

const HomeNav = function(props) {
  return (

    <div className="nav">
      <ul>
        <li>
          <Dropdown overlay={menuTopics}>
            <a className="ant-dropdown-link" href="#">
              Topics <Icon type="down" />
            </a>
          </Dropdown>
        </li>
        <li><a href='#howitworks'>How It Works</a></li>
        <li><a href='#personalize'>Personalize Feed</a></li>

        <div className='navRight'>
          {!props.loggedIn && (
            <li><div>
              <a onClick={props.goToLogin}>Log In</a> or  <a onClick={props.goToSignup}>Sign Up</a>
            </div></li> 
          )}
          {props.loggedIn && (<div>
            <li><Dropdown overlay={userAccountMenu}>
              <a className="ant-dropdown-link" href="#">
                My Account <Icon type="down" />
              </a>
            </Dropdown></li>
            <li><button>Contribute</button></li>       
            </div>
          )}
        </div>

      </ul>
    </div>
  )
}

export default HomeNav;
