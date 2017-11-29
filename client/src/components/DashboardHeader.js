import React, { Component } from 'react';


class DashboardHeader extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  //functions here


  render() {
    return (
      <div>
        <div className='topicDashboardHeader'>
          <div className='topicDashboardTitle'>
            <span>Life Hacks</span>
          </div>
          <div className='topicDashboardSubTitle'>
            Buttons of subtopics here so that users can specify
          </div>
        </div>
      </div>

    )
  }
}

export default DashboardHeader;
