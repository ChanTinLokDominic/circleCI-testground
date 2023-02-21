import { HStack, Button} from '@chakra-ui/react'
import React, { useEffect, useState }  from 'react';
import axios from 'axios'
import { FileCard } from '../components/FileCard';
import { getcurrentusername } from './TopNavBar';


export function Sort() {   
    const [dsorted, setDSorted] = useState(false)
    const [asorted, setAsorted]= useState(false)

    const [venueRes, setVenueRes] = useState()
    const [venueErr, setVenueErr] = useState()
    const [venueLoading, setVenueLoading] = useState(true)

    const [venueData, setVenueData] = useState([])
    const [venueDataLoading, setVenueDataLoading] = useState(true)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllVenues()
    }, [])

    useEffect(() => {
        if(venueRes && venueRes.data && venueDataLoading){
            const venueDataTmp = []
            venueRes.data.map(async (venue) => {
                const venueCode = venue.venueCode
                const count = await getProgrammesCountByVenueCode(venueCode)
                venueDataTmp.push(
                    {name: venue.name, count: count, venueCode: venueCode}
                )
                if (venueDataTmp.length === 10) {setVenueData(venueDataTmp)}
            })
            setVenueDataLoading(false)
        }
    }, [venueRes])

    useEffect(() => {
        if (!venueDataLoading) {
            if (asorted) {
                console.log("asorting...")
                const asortedArray = venueData.sort((r1, r2) => (r1.count > r2.count) ? 1 : (r1.count < r2.count) ? -1 : 0)
                setVenueData([...asortedArray])
            }
            else if (dsorted) {
                console.log("dsorting...")
                const dsortedArray = venueData.sort((r1, r2) => (r1.count < r2.count) ? 1 : (r1.count > r2.count) ? -1 : 0)
                setVenueData([...dsortedArray])
            }
        }
    }, [venueDataLoading, asorted, dsorted])
    
    
        return (
            <>
                <HStack spacing="10px" ml="10px">
                    <Button onClick={() => {setAsorted(true); setDSorted(false)}}>Sorting: Ascending</Button>
                    <Button onClick={() => {setAsorted(false); setDSorted(true)}}>Sorting: Descending</Button>
                </HStack>
                {venueData.map((venue) => 
                    <FileCard 
                        name={venue.name} 
                        count={venue.count} 
                        venueCode={venue.venueCode}
                        isLoading={isLoading}
                        onClick={() => {addToFavourite(venue.venueCode)}}
                    />
                )}
            </>
        )

    async function addToFavourite(venueCode) {
        setIsLoading(true)
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
        .finally(() => {setIsLoading(false);})
    }

    async function getAllVenues() {
        setVenueLoading(true)
        await axios
        .get('http://localhost:3001/api/venues/allVenues')
        .then((response) => { setVenueRes(response) })
        .catch((error) => {setVenueErr(error)})
        .finally(() => {setVenueLoading(false)})
    }

    async function getProgrammesCountByVenueCode(venueCode) {
        const programme = await axios
        .post(
            'http://localhost:3001/api/programmes/paginate/all',
            {
                'venueCode': venueCode
            }
        )
        return (
            programme.data.totalDocs
        )
    }
}





