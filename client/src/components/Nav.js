import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Icon, Anchor } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import bluebulb from '../images/bluebulb.png';
import { NavLink } from 'react-router-dom';
const SubMenu = Menu.SubMenu;


const menuTopics = function(props) {
  return (
    <div>
      <ul>
        <li className='subtopic'><a href='#' name='Technology' onClick={props.handleClick}> Technology </a></li>
        <li className='subtopic'><a href='#' name='Hobbies' onClick={props.handleClick}> Hobbies </a></li>
        <li className='subtopic'><a href='#' name='Sports' onClick={props.handleClick}> Sports </a></li>
        <li className='subtopic'><a href='#' name='Fashion' onClick={props.handleClick}> Fashion </a></li>
        <li className='subtopic'><a href='#' name='Life Hacks' onClick={props.handleClick}> Life Hacks </a></li>
        <li className='subtopic'><a href='#' name='Get Started...' onClick={props.handleClick}> "Get Started..." </a></li>
      </ul>
    </div>
  )
};

const userAccountMenu = function(props) {
  return (
    <div>
      <ul>
        <li className='subtopic'><a href='#'>My MindFeed</a></li>
        <li className='subtopic'><a href='#'>My Bookmarks</a></li>
        <li className='subtopic'><a href='#'>Settings</a></li>
        <li className='subtopic'><a href='#' onClick={props.logout}>Log Out</a></li>
      </ul>
    </div>
  )
};


const Nav = function(props) {
  return (
    <div id="nav" className="nav">
      <ul>
        <li>
          <Dropdown overlay={menuTopics(props)}>
            <a id='navLinks' className="ant-dropdown-link" href="#"> Topics <Icon type="down" /> </a>
          </Dropdown>
        </li>
          {props.currentPage === 'home' && (
            <div className='navLeft'>
              <li><a href='#howitworks'>How It Works</a></li>
              <li><a href='#personalize'>Personalize Feed</a></li>
            </div>
          )}
        <div className='navRight'>
          {!props.loggedIn && (
            <li><div>
              <a onClick={props.goToLogin}>Log In</a> or <a onClick={props.goToSignup}>Sign Up</a>
            </div></li> 
          )}
          {props.loggedIn && (<div>
            <li><Dropdown overlay={userAccountMenu(props)}>
              <a id='navLinks2' className="ant-dropdown-link" href="#">
                My Account <Icon type="down" />
              </a>
            </Dropdown></li>
            <li><button className="submitVideoButton" onClick={props.goToSubmitVideo}>Submit Video</button></li>       
            </div>
          )}
        </div>
      </ul>
    </div>
  )
}

export default Nav;
