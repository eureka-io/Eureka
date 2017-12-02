import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import HomeHeader from './HomeHeader';
import TopVideos from './TopVideos';
import gears from '../images/gears.png';
import Signup from './Signup';
import { Affix, Icon, Card, Col, Row } from 'antd';
import magnifying from '../images/magnifying.png';
import lightbulb from '../images/lightbulb.png';
import list from '../images/list.png';
import Slider from 'react-slick';

const Home = function(props) {
  return (
      <div>
        <HomeHeader handleClick={props.handleClick}/>
        <TopVideos />
   
        <div className="howItWorksContainer">
          <h1><a name='howitworks'>How It Works</a></h1>
          <h3>A cool description about how the process of selecting and recommending works. </h3>
          <div className='howItWorksContainerInner'>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <div className="custom-image">
                    <img alt="example" width="100%" src={magnifying} />
                  </div>
                  <div className="custom-card">
                    <h2>Browse or Start</h2>
                    <p>Check out the content and sign up to start being cool!</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <div className="custom-image">
                    <img alt="example" width="100%" src={list} />
                  </div>
                  <div className="custom-card">
                    <h2>Select Preferences</h2>
                    <p>Customize your preferences and what you'd like to watch and learn.</p>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <div className="custom-image">
                    <img alt="example" width="100%" src={lightbulb} />
                  </div>
                  <div className="custom-card">
                    <h2>Get Recommendations</h2>
                    <p>Get a customized list over time and contribute videos too.</p>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        <div className='recEngineContainer'>
          <img src={gears} className='hexleft' />
          <h1 className='title'><a name='personalize'>Personalized Feed</a></h1>

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          <br /><br />

          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

          <Signup />
        </div>
      </div>


    )

}        

export default Home;