import { Text, Card, CardBody,Heading } from '@chakra-ui/react'
import React, { useEffect, useState }  from 'react';
import axios from 'axios'
import { getcurrentusername } from './TopNavBar';

const fav1=[
    {venueCode:"1234"},
    {venueCode:"5678"}
]

const fav2=[
    {venueCode:"0000"},
    {venueCode:"1111"}
]

var fav =[{}, {}, {} /*, ... */];
function FavoriteCard(props){

    return(
        <>
        <Card>
            <CardBody>
                <Text>Venue Code: {props.array[props.e].venueCode}</Text>
            </CardBody>
        </Card>
        </>
    )
}

export function MyFavorite() {

    const [userResp, setUserResp] = useState(null)
    const [userErr, setUserErr] = useState(null)
    const [userLoading, setUserLoading] = useState(false)

    useEffect(() => {
        getUserByUsername(getcurrentusername())
    }, [])

    useEffect(() => {
        if(!userLoading && userResp) {
            console.log(userResp.data.favourite);
        }
    }, [userLoading, userResp])

    async function getUserByUsername(username) {
        setUserLoading(true)
        await axios.post(
            'http://localhost:3001/api/users/userByUsername',
            { 'username': username}    
        )
        .then((response) => {setUserResp(response)})
        .catch((error) => {setUserErr(error)})
        .finally(() => {setUserLoading(false)})
    }
    
    if(!userLoading && userResp) {
        fav=userResp.data.favourite;
    }
    return (
        <>
        <Heading>My Favorite</Heading>
        {fav.map((file,index) => <FavoriteCard array={fav} e={index} key={index}/>)}
        </>
        
    )
}