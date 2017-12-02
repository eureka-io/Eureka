import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import { Layout, Menu, Steps, Icon, Switch, Tag, Button, Row, Col, Radio } from 'antd';
import DashboardHeader from './DashboardHeader';
import TopVideos from './TopVideos';
import RecentVideo from './RecentVideo';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Slider from 'react-slick';



const Dashboard = function(props) {
    return (
      <div>

        <div className='videoContainer'>
          <div className='videoContainerInner'>
              <div className='videoDisplay'><iframe width="760" height="515" src="https://www.youtube.com/embed/mkpbbWZvYmw" frameBorder="0" allowFullScreen></iframe></div>
          </div>
        </div>

        <div className='votingContainer'>
          <a href="#" className='votingIcon shareIcon'><Icon type="share-alt" style={{ fontSize: 40 }} /></a> 
          <a href="#" className='votingIcon frownIcon'><Icon type="dislike-o" style={{ fontSize: 40 }} /></a> 
          <div className='centerButton'>
            <a href="#" className='votingIcon bulbIcon' onClick={props.nextVideo}><Icon type="bulb" style={{ fontSize: 60 }} /></a> 
          </div>
          <a href="#" className='votingIcon smileIcon' ><Icon type="like-o" style={{ fontSize: 40 }} /></a>
          <a href="#" id='heartIcon' className='votingIcon heartIcon' onClick={props.handleHeartClick}><Icon type="heart" style={{ fontSize: 40 }} /></a> 
        </div>

        <div className='videoInfoBox'>
          <Row>
            <Col span={16}>
              <div className='videoTitleContainer'>
                <Tag color="blue">{props.currentCategory}</Tag> <Tag>Subcategory</Tag> <Tag>Subcategory</Tag> <Button size="small" type="dashed">+ Add Subcategory</Button><br />
                <span className='videoTitle'>Recognize the Signs and Symptoms of Stroke </span><br />
                Centers for Disease Control and Prevention (CDC) | Published on Oct 26, 2015  <br />
                <div className='reportButton'>
                  <Icon type="notification" style={{ fontSize: 20, color: 'darkred' }} /> Report Video
                </div>
                <div className='videoStats'>
                  <span className='videoStat'><Icon type="caret-right" style={{ fontSize: 20 }} /> 6032 </span>
                  <span className='videoStat'><Icon type="smile" style={{ fontSize: 20 }} /> 2302 </span>
                  <span className='videoStat'><Icon type="heart" style={{ fontSize: 20 }} /> 532 <br /> </span>
                </div>

                
                <div className='videoDesc'>When someone is having a stroke, every minute counts. Just as putting out a fire quickly can stop it from spreading, treating a stroke quickly can reduce damage to the brain. If you learn how to recognize the telltale signs of a stroke, you can act quickly and save a life—maybe even your own. </div><br />
              </div>
            
            </Col>
            <Col span={8}>
              <div className='recentlyWatchedVideos'>
                <h2>Recently Viewed:</h2> 
                  <RecentVideo playClickedVideo={props.playClickedVideo} />
                  <RecentVideo playClickedVideo={props.playClickedVideo} />
                  <RecentVideo playClickedVideo={props.playClickedVideo} />
                  <RecentVideo playClickedVideo={props.playClickedVideo} />
                  <RecentVideo playClickedVideo={props.playClickedVideo} />
              </div>
            </Col>
          </Row>



        </div>



      </div>
    );

}

export default Dashboard;
        // <div className="vidRecContainer">
        //   <DashboardHeader title={props.currentCategory}/>
        //   <TopVideos />
        // </div>


          // <RadioGroup defaultValue="a" size="large">
          //   <RadioButton value="d"><Icon type="share-alt" style={{ fontSize: 20 }} /></RadioButton>
          //   <RadioButton value="a"><Icon type="frown" style={{ fontSize: 20 }} /></RadioButton>
          //   <RadioButton value="b"><Icon type="bulb" style={{ fontSize: 20 }} /></RadioButton>
          //   <RadioButton value="c"><Icon type="smile" style={{ fontSize: 20 }} /></RadioButton>
          //   <RadioButton value="d"><Icon type="heart" style={{ fontSize: 20 }} /></RadioButton>
          // </RadioGroup>