import { Text,Card, CardBody,Heading ,TableContainer, Table, Thead, Tr, Td, Th, Tbody} from '@chakra-ui/react'
import React, { useEffect, useState }  from 'react';
import axios from 'axios'
const user=[
{username:"Pandora", password:"yayy", role:"user", favorite:[{venueCode:"123"},{venueCode:"456"}]},
{username:"Jason", password:"yooo", role:"user", favorite:[{venueCode:"789"},{venueCode:"000"}]}
]

const user2=[
    {username:"Patrick", password:"yayy", role:"user", favorite:[{venueCode:"123"},{venueCode:"456"}]},
    {username:"Aaron", password:"yooo", role:"user", favorite:[{venueCode:"789"},{venueCode:"000"}]},
    {username:"Pandora", password:"yayy", role:"user", favorite:[{venueCode:"123"},{venueCode:"456"}]},
    {username:"Jason", password:"yooo", role:"user", favorite:[{venueCode:"789"},{venueCode:"000"}]}
    ]

    var user3 =[{}, {}, {} /*, ... */];

function UserRow(props){
    return(
        <>
        <Tr>
                <Td>{props.array[props.e].username}</Td>
                <Td>{props.array[props.e]._id}</Td>
                <Td>{props.array[props.e].role}</Td>

                <Td></Td>
            </Tr>

        </>
    )

}


export function ShowAllUser() {
    const [usersResp, setUsersResp] = useState()
    const [usersErr, setUsersErr] = useState()
    const [usersLoading, setUsersLoading] = useState(true)

    useEffect(() => {
        getAllUsers()
    }, [])

    useEffect(() => {
        if (!usersLoading && usersResp) {
            console.log(usersResp)
        }
    }, [usersLoading, usersResp])
    async function getAllUsers(){
        
        await axios.get(
            'http://localhost:3001/api/users/user'
        )
        .then((response) => {setUsersResp(response)})
        .catch((error) => {setUsersErr(error)})
        .finally(() => {setUsersLoading(false)})
    }
    
    if(!usersLoading){
        user3=usersResp.data;
        console.log(user3);
    }

    console.log(user);
    return (
        <>
        <Heading>Show All Users</Heading>
        <TableContainer>
            <Table size='md'>
            <Thead>
            <Tr>
                <Th>Username</Th>
                <Th>_id</Th>
                <Th>role</Th>
            </Tr>
            </Thead>
            <Tbody>

            
            {user3.map((file,index) => <UserRow array={user3} e={index} key={index}/>)}
            </Tbody>
            
        </Table>
    </TableContainer>
        
        </>
    )
}