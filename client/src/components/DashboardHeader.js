import React, { Component } from 'react';


const DashboardHeader = function(props) {
  return (
      <div>
        <div className='topicDashboardHeader'>
          <div className='topicDashboardTitle'>
            <span>{props.title}</span>
          </div>
        </div>
      </div>

    )

}

export default DashboardHeader;
