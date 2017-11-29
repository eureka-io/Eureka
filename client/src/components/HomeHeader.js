import React, { Component } from 'react';
import { Button } from 'antd';
import bluebulb from '../images/bluebulb.png';
import { NavLink } from 'react-router-dom';
import { Affix, Row, Col, Icon } from 'antd';
import video from '../images/videoThumbnail.jpg';
import iconhacks from '../images/iconhacks.png';
import iconhobbies from '../images/iconhobbies.png';
import iconsports from '../images/iconSports.png';
import icontech from '../images/iconTech.png';
import colorex from '../images/colorex.png';


 class Header extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  //functions here


  render() {
    return (
      <div className='getStartedContainer'>
      <img src={bluebulb} className='bulb'/>
        <div className='getStartedContainerTitle'>
          Mind Feed
        </div>
        <div className='getStartedContainerSubTitle'>
          The internet's best videos to teach you something new, all under 5 minutes!
        </div>
        <div className='headerTopicsContainer'>
          <Row type="flex" justify="space-around">
          <div><Icon type="caret-left" className='arrow' /></div>
          <Col span={5}><a href="#"><img src={icontech} className='headertopic' /></a></Col>
          <Col span={5}><a href="#"><img src={iconsports} className='headertopic' /></a></Col>
          <Col span={5}><a href="#"><img src={iconhobbies} className='headertopic' /></a></Col>
          <Col span={5}><a href="#"><img src={iconhacks} className='headertopic' /></a></Col>
          <div><Icon type="caret-right" className='arrow'/></div>
        </Row>

        </div>
      </div>
    )
  }
}

export default Header;


