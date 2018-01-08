import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Menu, Icon, Row, Col } from 'antd';
import AccountBookmarks from './AccountBookmarks';
import AccountCategories from './AccountCategories';
import AccountInfo from './AccountInfo';
import { connect } from 'react-redux';
import './Account.css';
import axios from 'axios';
import _ from 'lodash';

const TabPane = Tabs.TabPane;
const fakePreferences = [{}, {}, {} ]

function cb(key) {
  console.log(key);
}

class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      totalCategories: [],
      toBeUpdatedCategories: {},
      categories: [],
      email: this.props.authStatus.currentUser,
      preferencesUI: {},
      bookmarkedVideos: this.props.bookmarkedVideos
		};
	}

  componentWillMount() {
    this.getTotalCategories();
    this.getUserPreferences();
    console.log(this.state.bookmarkedVideos);
    //this.setPreferencesUI();
  }

  setPreferencesUI() {
    let preferences = this.state.totalCategories;
    let userPreferences = this.props.userPreferences.subcategories;
    let preferUI = {};
    for(var categories in preferences){
        preferUI[categories] = {};
      preferences[categories].forEach((subcat)=>{
        if(userPreferences.includes(subcat)){
          preferUI[categories][subcat] = true;
        } else {
          preferUI[categories][subcat] = false;
        }

      });
    }
    this.setState({preferencesUI: preferUI });
    console.log('preferencesUI in state', this.state.preferencesUI);
  }

  getTotalCategories() {
    axios.get('/api/getCategories', {})
    .then((response) => {
      console.log('Received Categories',response.data);
      var categories = Object.keys(response.data);
      console.log('Categories', categories);
      this.setState({totalCategories: response.data,
                     categories: categories });
    })
    .then(()=>{
      this.setPreferencesUI();
    })
    .catch((error)=> {
      console.log(error);
    });
  }

  getUserPreferences() {

    var user = { email: 'a@gmail.com' };
    console.log("USER", user);
    axios.get('/api/getCatSubCatData', {query: user})
    .then((response)=> {
      console.log('Successfully Retrieved User Preferences');
      console.log('PREFERENCE DATA', response.data)
      //this.setState({userPreferences: response.data });


    })
    .then(()=>{
      //this.setPreferencesUI();
    })
    .catch((error)=> {
      console.log('ERROR:' , error)
      console.log(error)
    });
  }

  handleClickCategories(category, subcategory){
    console.log("SUBCAT CLICKED!");
    console.log("SUBCAT",category);
    console.log("CAT", subcategory);
    this.updateUI(category, subcategory);
  }

  updateUI(cat, subcat){
    let preferUI = this.state.preferencesUI;
    preferUI[cat][subcat] = !preferUI[cat][subcat];
    this.setState({preferencesUI: preferUI});
  }

  updatedCategories(){
    console.log('UPDATING PREFERENCES');
  }


  render() {
		return (
      <div className="accountTitle">

        <Tabs defaultActiveKey="1" onChange={cb}>
          <TabPane tab="AccountInfo" key="1">
            <AccountInfo user={this.state.email} />
          </TabPane>

          <TabPane tab="AccountCategories" key="2">
            <AccountCategories
              categoriesObject={this.state.totalCategories}
              categoriesKeys={this.state.categories}
              clicked={this.handleClickCategories.bind(this)}
              preferUI={this.state.preferencesUI}
              updatePreferences={this.updatedCategories.bind(this)}
              />
          </TabPane>

           <TabPane tab="AccountBookmarks" key="3">
            <AccountBookmarks />
          </TabPane>

        </Tabs>
      </div>
		)
  }
}

export default Account;
