import React from 'react';
import classNames from 'classnames/bind';
import styles from './FindHospitals.module.scss';
import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';

const cx = classNames.bind(styles);

function FindHospitals() {
  const [coords, setCoords] = useState({});
  const [data, setData] = useState([]);
  const [map, setMap] = useState();
  const [content, setContent] = useState();
  const mapContainerStyle = {
    width: "100%",
    height: "100vh"
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyASRdjZAG5N6Qmx0g-mxOvOXlKjDJ_NB1k',
    libraries: ['places']
  });

  const onMapLoad = useCallback(map1 => {
    const service = new window.google.maps.places.PlacesService(map1);
    const pyrmont = new window.google.maps.LatLng(16.049514040723956,108.16051657950058);
    // 16.0640964, 108.2375506
    service.nearbySearch({
      location: pyrmont,
      radius: 200 * 1000,
      type: ['hospital']
    },
      function (results, status) {
        if (status === 'OK') {
          setData(results)
        }
      }
    )
    setMap(map1)
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);
  return coords && isLoaded ? (
    <section className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('row', 'd-flex', 'justify-content-center')}>
          <div className={cx("col-4",'div-form')}>
            <select className={cx('form-control','sl')} id="exampleFormControlSelect1"   >
              {data && data.length > 0 && data.map((obj, index) => {
                return (
                  <option key={index} value={obj.name}> {obj.name} , {obj.vicinity}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div >
          <div className={cx('col-12')}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              options={{ zoomControl: true }}
              center={coords}
              onLoad={onMapLoad}
            >
              <Marker position={coords}>
              </Marker>
              {data && data.length >= 1 && data.map((obj, index) =>
                < Marker
                  className={cx('abc')}
                  key={index}
                  position={obj.geometry.location}
                  title={obj.name}
                  icon={{
                    url: obj.icon,
                    scaledSize: new window.google.maps.Size(15, 15),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                  }}
                  onClick={() => setContent(obj)}
                />
              )}
              {content &&
                <InfoWindow position={content.geometry.location} onCloseClick={() => setContent(undefined)}>
                  <div className={cx('div_content')}>
                    <p className={cx('info_content')}>{content.name} , {content.vicinity}</p>
                  </div>
                </InfoWindow>
              }
            </GoogleMap>
          </div>
        </div>
      </div>
    </section >
  ) : <></>
}
export default FindHospitals;
