import React, { useState, useEffect } from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';

export default function Dashboard(props) {

  // The state maintained by this React Component.
  // This component maintains the list of people.
  const [cases, setCases] = useState([])

  // React function that is called when the page load.
  useEffect(() => {
    // Send an HTTP request to the server.
    fetch('http://localhost:8081/total', {
      method: 'GET', // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(totalCases => {
        let casesDiv=  (
            <div>
              <strong>{totalCases}</strong>
            </div>
        );



        // Set the state of the person list to the value returned by the HTTP response from the server.
        setCases(casesDiv);
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }, [])


  return (
    <div className='Dashboard'>
      <PageNavbar active='Dashboard' />
      <div className='container people-container'>
        <br></br>
        <div className='jumbotron less-headspace'>
          <div className='people-container'>
            <div className='people-header'>
              <div className='header-lg'>
                <strong>Confirmed cases</strong>
              </div>
              <div className='header'>
                <strong>Death</strong>
              </div>
              <div className='header'>
                <strong>Case fatality rate</strong>
              </div>
            </div>
            <div className='results-container' id='results'>
              {cases}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
