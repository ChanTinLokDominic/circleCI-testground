import GoogleMapReact from 'google-map-react';
import LCSDIcon from './LCSD_Icon.png'
import axios from 'axios'
import {Link} from 'react-router-dom'

import {useState, useEffect, React} from 'react';






export function Map(){
  const [locations, setLocations] = useState([{}]);
  
  useEffect(() => {
    axios
    .get("http://localhost:3001/api/venues/allVenues")
    .then((response) => {
      console.log(response)
      setLocations(response.data)
    });
    }, []);


  const defaultProps = {
    center: {
      lat: 22.331500,
      lng: 114.172845
    },
    zoom: 12
  };


    
      
  return (
    // Important! Always set the container height explicitly
    <>
    <div style={{ height: '1000px', width: '1000px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCvxNfxeQFHFZjBysUXS6AuyNOGnxOQRDw" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >


        {locations.map(item => {
                  return (
                    <Link to={"/location/" + item.venueCode} lat={item.latitude} lng={item.longitude}>
                      <img src={LCSDIcon} alt="icon" />
                    </Link>
                  );
            })}
      </GoogleMapReact>
    </div>
    </>
    
  );
}