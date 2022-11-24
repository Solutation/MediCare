import React from 'react';
import classNames from 'classnames/bind';
import styles from './FindHospitals.module.scss';
import { useState, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input } from '@chakra-ui/react';

const cx = classNames.bind(styles);
const center = { lat: 16.054407, lng: 108.202164 };

function FindHospitals() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyA4i0saGBGHfSUh9yg9AZTBmjM1WwtRSGY',
        libraries: ['places']
    });

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef();

    if (!isLoaded) {
        return '';
    }

    async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
            return;
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
        console.log(origin);
    }

    function clearRoute() {
        setDirectionsResponse(null);
        setDistance('');
        setDuration('');
        originRef.current.value = '';
        destiantionRef.current.value = '';
    }
    return (
        <>
            <div className={cx('wrapper')}>
                <Flex position="relative" flexDirection="column" alignItems="center" h="100vh" w="100vw">
                    <Box position="absolute" left={0} top={0} h="100%" w="100%">
                        <GoogleMap
                            center={center}
                            zoom={15}
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            onLoad={(map) => setMap(map)}
                        >
                            <Marker position={center} />
                            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                        </GoogleMap>
                    </Box>
                    <Box p={4} borderRadius="lg" m={4} bgColor="white" shadow="base" minW="container.md" zIndex="1">
                        <HStack spacing={2} justifyContent="space-between">
                            <Box flexGrow={1}>
                                <Autocomplete>
                                    <Input
                                        type="text"
                                        placeholder="Điểm bắt đầu"
                                        ref={originRef}
                                        className={cx('input__1')}
                                    />
                                </Autocomplete>
                            </Box>
                            <Box flexGrow={1}>
                                <Autocomplete>
                                    <Input
                                        type="text"
                                        placeholder="Điểm kết thúc"
                                        ref={destiantionRef}
                                        className={cx('input__2')}
                                    />
                                </Autocomplete>
                            </Box>

                            <ButtonGroup>
                                <Button
                                    colorScheme="pink"
                                    type="submit"
                                    onClick={calculateRoute}
                                    className={cx('btn-tim')}
                                >
                                    Tìm
                                </Button>
                                <IconButton
                                    aria-label="center back"
                                    icon={<FontAwesomeIcon icon={faTimes} />}
                                    onClick={clearRoute}
                                    className={cx('btn-clear')}
                                />
                            </ButtonGroup>
                        </HStack>
                        <HStack spacing={4} mt={4} justifyContent="space-between" alignItems="flex-start">
                            <p>Quảng đường: {distance} </p>
                            <p>Thời gian: {duration} </p>
                            <IconButton
                                aria-label="center back"
                                icon={<FontAwesomeIcon icon={faLocationArrow} />}
                                isRound
                                onClick={() => {
                                    map.panTo(center);
                                    map.setZoom(15);
                                }}
                                padding={10}
                            />
                        </HStack>
                    </Box>
                </Flex>
            </div>
        </>
    );
}
export default FindHospitals;
