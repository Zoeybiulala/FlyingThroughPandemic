import React, { useState, useEffect } from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import CovidMap from './CovidMap';
import FlyMap from './FlyMap';

export default function Dashboard(props) {

  // The state maintained by this React Component.
  // This component maintains the list of people.


    return (
    <div className='Dashboard'>
      <PageNavbar active='Dashboard' />
      <div className='container people-container'>
        <br></br>
        <div className='jumbotron less-headspace'>
          <div className='people-container'>
            <div style={{display:'flex'}}>
              <CovidMap style={{flex:1}}/>
              <FlyMap style={{flex:1}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
