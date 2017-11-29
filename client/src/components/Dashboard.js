import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import { Layout, Menu, Steps, Icon } from 'antd';
import DashboardNav from './DashboardNav';
import DashboardHeader from './DashboardHeader';
import TopVideos from './TopVideos';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Slider from 'react-slick';


class CategoryDashboard extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>
        <DashboardHeader />

        <div className='topVideosContainer'>
          <Slider {...settings}>
            <div className='videoDisplay'><iframe width="760" height="515" src="https://www.youtube.com/embed/mkpbbWZvYmw" frameborder="0" allowfullscreen></iframe></div>
            <div className='videoDisplay'><iframe width="760" height="515" src="https://www.youtube.com/embed/mkpbbWZvYmw" frameborder="0" allowfullscreen></iframe></div>
            <div className='videoDisplay'><iframe width="760" height="515" src="https://www.youtube.com/embed/mkpbbWZvYmw" frameborder="0" allowfullscreen></iframe></div>
          </Slider>
        </div>

        <div className='videoInfoBox'>
          <div className='videoTitleContainer'>
            <span className='videoTitle'>Recognize the Signs and Symptoms of Stroke </span><br />
            <span className='videoDesc'>Description | Date Posted | Some Other Info</span><br />
          </div>
          <div className='votingContainer'>
            <RadioGroup defaultValue="a" size="large">
              <RadioButton value="d"><Icon type="share-alt" style={{ fontSize: 20 }} /></RadioButton>
              <RadioButton value="a"><Icon type="frown" style={{ fontSize: 20 }} /></RadioButton>
              <RadioButton value="b"><Icon type="bulb" style={{ fontSize: 40 }} /></RadioButton>
              <RadioButton value="c"><Icon type="smile" style={{ fontSize: 20 }} /></RadioButton>
              <RadioButton value="d"><Icon type="heart" style={{ fontSize: 20 }} /></RadioButton>
            </RadioGroup>
          </div>
        </div>

        <div className="vidRecContainer">
          <TopVideos />
        </div>

      </div>
    );
  }
}

export default CategoryDashboard;
