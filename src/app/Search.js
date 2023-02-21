import { Box, Container, Text, VStack } from '@chakra-ui/react'
import { SearchBar } from '../components/SearchBar'
import { findUserById } from './App'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FileCard } from '../components/FileCard'
import { getcurrentusername } from './TopNavBar';


export function Search() {
    const [keyword, setKeyword] = useState()
    const [venuesData, setVenuesData] = useState([])

    const [venuesRes, setVenuesRes] = useState()
    const [venuesErr, setVenuesErr] = useState(null)
    const [venuesLoading, setVenuesLoading] = useState(false)

    const [searchLoading, setSearchLoading] = useState(false)
    const [addLoading, setAddLoading] = useState(false)


    useEffect(() => {
        if (!venuesLoading && venuesRes) {
            setVenuesData(venuesRes.data.docs)
            setSearchLoading(false)
            console.log(venuesData)
        }
    }, [venuesLoading, venuesRes])


    return (
        <>
            <Container mt="15px" ml="10px">
                <SearchBar
                    width="lg"
                    onChange={handleSearchChange}
                    onClick={submitKeyword}
                    isLoading={searchLoading}
                />
                <Box mt='10px'>
                    {venuesData.map((venue) => 
                        <FileCard 
                            name={venue.name} 
                            venueCode={venue.venueCode}
                            isLoading={addLoading}
                            onClick={() => {addToFavourite(venue.venueCode)}}
                        />
                    )}
                </Box>
            </Container>
        </>    
    )

    async function addToFavourite(venueCode) {
        setAddLoading(true)
        const username = getcurrentusername()
        await axios
        .post(
            'http://localhost:3001/api/users/updateFavourite',
            {
                'venueCode': venueCode,
                'username': username
            }
        )
        .then((response) => {console.log(response);})
        .catch((error) => {console.log(error);})
        .finally(() => {setAddLoading(false);})
    }

    function handleSearchChange(e) {
        setKeyword(e.target.value)
    }

    function submitKeyword() {
        setSearchLoading(true)
        if (keyword) {
            getVenuesByKeyword(keyword)
        }
        else setSearchLoading(false)
    }

    async function getVenuesByKeyword(keyword) {
        setVenuesLoading(true)
        console.log("Fetching...")
        await axios
        .post(
            'http://localhost:3001/api/venues/paginate/all',
            { "keywords": keyword }
        )
        .then((response) => {setVenuesRes(response)})
        .catch((error) => {setVenuesErr(error)})
        .finally(() => { setVenuesLoading(false) })
        // return [{}]
    }
}