import React, { Component } from 'react';
import { Tabs, Menu, Icon, Row, Col } from 'antd';
import AccountCategoryCard from './AccountCategoryCard';
const TabPane = Tabs.TabPane;

const AccountCategories = (props) => {
  return (
    <div className="accountContainer">
      <div className="accountInner">
      <h3> Edit Your Category Preferences</h3>
        <div>
          <Tabs tabPosition="left">
            {
              props.categoriesKeys.map((catKey)=>{
                return (
                  <TabPane tab={catKey} key={catKey}>
                    {props.categoriesObject[catKey].map((subcat)=>{

                      return(
                        <div onClick={props.clicked.bind(this, catKey, subcat)}
                        key={subcat}>
                        <AccountCategoryCard
                          currentUI={props.preferUI[catKey][subcat]}
                          subcategory={subcat} />
                        </div>
                        )
                    })}
                  </TabPane>
                  )
              })
            }
          </Tabs>
        <button onClick={props.updatePreferences} className='formButton '> Update </button>
        </div>
      </div>
    </div>

    )
}

export default AccountCategories;

          // <button onClick={}> Update Categories </button>
                  // <div>
                  // <h4 key={index}> {catKey} </h4>
                  //   <Row>
                  //     {
                  //       props.categoriesObject[catKey].map((subcat,subIndex)=>{
                  //         return(
                  //           <Col
                  //             span={2}
                  //             onClick={props.clicked.bind(this,subcat, catKey)}
                  //             key={subIndex}>
                  //             {subcat}
                  //           </Col>
                  //           )
                  //       })
                  //     }
                  //   </Row>
                  // </div>
