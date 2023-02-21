import { CardFooter, Text } from '@chakra-ui/react'
import { Card, CardBody, Stack, Button, Heading, Box, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from '@chakra-ui/react'

import GoogleMapReact from 'google-map-react';
import LCSDIcon from './LCSD_Icon.png'
import { CommentInput} from '../components/CommentInput';
import React, { useEffect, useState }  from 'react';
import axios from 'axios'

function AccordionEvent(props) {
    return(
        <>
        <AccordionItem>
            <h2>
            <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                {props.array[props.e].title}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            <Text>Date: {props.array[props.e].date}</Text>
            <Text>Presenter: {props.array[props.e].presenter}</Text>
            <Text>Price: {props.array[props.e].price} </Text>
            <Text>Description: {props.array[props.e].description}</Text>
            </AccordionPanel>
        </AccordionItem>
        </>
    )
}

function GMap(props) {
    return(
        <>
        <div style={{ height: '600px', width: '600px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCvxNfxeQFHFZjBysUXS6AuyNOGnxOQRDw" }}
                defaultCenter={{
                lat: 22.4000,
                lng: 114.1500
                }}
                defaultZoom={11}
            >
                
                <button
                lat={props.venue.latitude}
                lng={props.venue.longitude}
                text="My Marker 2"
                
                ><img src={LCSDIcon} />
                </button>
            </GoogleMapReact>
            </div>
        </>
        
    )
}

export function Location() {
    var url = window.location.href // get the current url
    var id = url.substring(url.lastIndexOf('/')+1) // get the item after last '/'
    var Vcode = id+"" // change to string for compare

    const [eventsRes, setEventsRes] = useState(null)
    const [eventsErr, setEventsErr] = useState(null)
    const [eventsLoading, setEventsLoading] = useState(false)
    const [eventData, setEventData] = useState([])

    const [venueRes, setVenueRes] = useState(null)
    const [venueErr, setVenueErr] = useState(null)
    const [venueLoading, setVenueLoading] = useState(false)
    const [venueData, setVenueData] = useState([])


    const [click, setClick] = useState(false)
    useEffect(() => {
        getEventsByVenueCode(Vcode)
        getVenueByCode(Vcode)
    }, [click])

    useEffect(() => {
        if(eventsErr || venueErr) { return }
        if((!eventsLoading && eventsRes) && (!venueLoading && venueRes)) {
            console.log(eventsRes.data)
            console.log(venueRes.data)
        }
    }, [eventsLoading, venueLoading])

    useEffect(() => {
        if(!eventsLoading && eventsRes) {
            setEventData(eventsRes.data.docs)
        }
    }, [eventsLoading, eventsRes])

    useEffect(() => {
        if (!venueLoading && venueRes) {
            setVenueData(venueRes.data.docs[0])
            console.log(venueData)
        }
    }, [venueLoading, venueRes])

    async function getEventsByVenueCode(venueCode) {
        setEventsLoading(true)
        await axios
        .post(
            'http://localhost:3001/api/programmes/paginate/all',
            {
                'venueCode': venueCode
            }
        )
        .then((response) => {setEventsRes(response)})
        .catch((error) => {setEventsErr(error)})
        .finally(() => {setEventsLoading(false)})
    }

    async function getVenueByCode(venueCode) {
        setVenueLoading(true)
        await axios
        .post(
            "http://localhost:3001/api/venues/paginate/all",
            {
                'venueCode': venueCode
            }
        )
        .then((response) => {setVenueRes(response)})
        .catch((error) => {setVenueErr(error)})
        .finally(() => {setVenueLoading(false)})
    }
     
    const [inputComment, setInputComment] = useState("")
    function handleCommentChange(e) {
        setInputComment(e.target.value)
    }

    const [submitLoading, setSubmitLoading] = useState(false)
    async function submitComment() {
        if (!inputComment) {return}
        setSubmitLoading(true)
        await axios
        .post(
            'http://localhost:3001/api/venues/comment',
            { 
                'comment': inputComment,
                'venueCode': Vcode
            }
        )
        .then(
            (response) => {
                console.log(response);
                setClick(!click)
        })
        .catch((error) => {console.log(error)})
        .finally(() => {setSubmitLoading(false); setInputComment("")})
    }

    return (
        <>
            <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            >
                <div>
                    <div><GMap venue={venueData}/></div>
                    <div>
                        <CommentInput 
                            commentArray={venueData.comment}
                            value={inputComment}
                            onChange={(e) => handleCommentChange(e)}
                            onClick={submitComment}
                            isLoading={submitLoading}
                        />
                    </div>
                </div>

                <Stack>
                    <CardBody>
                    <Heading size='md'>{venueData.name} ({venueData.venueCode})</Heading>
                    <Text py='2'>
                        Event
                    </Text>
                    <Accordion>
                        {eventData.map((file,index) => <AccordionEvent array={eventData} e={index} key={index}/>)}
                    </Accordion>
                    </CardBody>
                </Stack>
            </Card> 
        </>
    )
    
}


