import { Table,Thead, TableContainer,Text,Tr, Td, Th, Tbody} from '@chakra-ui/react'
import { findUserById } from './App'
import { Button } from '../components/Button';
import {useState,React} from 'react';
import { validateUsername } from '../validate/username';
import { validatePassword } from '../validate/password';
import axios from 'axios'
import { valid } from 'semver';


var user5 =[{} /*, ... */];

function UserRow(props){
    return(
        <>
        <Tr>
                <Td>{props.array[props.e]._id}</Td>
                <Td>{props.array[props.e].venue}</Td>
                <Td>{props.array[props.e].title}</Td>
                <Td>{props.array[props.e].date}</Td>
                <Td>{props.array[props.e].presenter}</Td>

                <Td></Td>
            </Tr>

        </>
    )

}


export function ProgrammesRUD() {
    const [warning1,setWarning1]=useState("");
    const [warning2,setWarning2]=useState("");
    const [warning3,setWarning3]=useState("");
    const [usersResp, setUsersResp] = useState()
    const [usersLoading, setUsersLoading] = useState(true)


    function Update(){
        let _id= document.getElementById("_id").value;
        let description = document.getElementById("description").value;
        let venue = document.getElementById("venue").value;
        let price = document.getElementById("price").value;
        let title = document.getElementById("title").value;
        let date = document.getElementById("date").value;
        let presenter = document.getElementById("presenter").value;

        // if(!validateUsername(C_username) || !validatePassword(C_password)){
        //     console.log("error")
        //     setWarning1("Invalid username or password")
        //     return 
        // }
        axios.patch('http://localhost:3001/api/programmes/updateProgrammes', {
            id:_id,
            description:description,
            venue:venue,
            price:price,
            title:title,
            date:date,
            presenter:presenter
        })
        .then((res) => { 
            console.log(res)
            setWarning1("Successfully updated")
         })
        .catch((error) => {
            console.error(error)
            if (error.response.status === 400) {
                setWarning1("Failed");
            }
            else{
                setWarning1("Unknown error has occured")
            }
        })
    }


    function Delete(){
        let d_id= document.getElementById("d_id").value;

        axios.patch('http://localhost:3001/api/programmes/removeProgramme', {
            id:d_id,

        })
        .then((res) => { 
            console.log(res)
            setWarning2("Successfully deleted")
         })
        .catch((error) => {
            console.error(error)
            if (error.response.status === 400) {
                setWarning2("No such id");
            }
            else{
                setWarning2("Unknown error has occured")
            }
        })
    }

    function Retrieve(){
        let r_id= document.getElementById("r_id").value;

        axios.post('http://localhost:3001/api/programmes/getProgrammeById', {
            id:r_id,

        })
        .then((res) => { 
            console.log(res)
            setWarning3("Successfully retrieved")
            setUsersResp(res)
         })
        .catch((error) => {
            console.error(error)
            if (error.response.status === 400) {
                setWarning3("No such id");
            }
            else{
                setWarning3("Unknown error has occured")
            }
        }).finally(() => {setUsersLoading(false)})
    }

    if(!usersLoading){
        user5=usersResp.data;
        console.log(user5);
    }




    return (
        <>
            <form align='center'>
                        <div className="Add-input-field">
                        <Text color='red' as='b' fontSize='l'>Update Programme</Text><br/>
                        <label htmlFor="_id">ID</label><br/>
                        <input type="text" name="_id" id="_id" placeholder="ID" className="form-control" />
                            </div>
                        <div className="Add-input-field">
                            <label htmlFor="description">Description</label><br/>
                            <input type="text" name="description" id="description" placeholder="description" className="form-control" />
                                </div>
                                <div className="Add-input-field ">
                            <label htmlFor="venue">Venue</label><br/>
                            <input type="text" name="venue" id="venue" placeholder="venue" className="form-control" />
                        </div>
                        <div className="Add-input-field ">
                            <label htmlFor="price">Price</label><br/>
                            <input type="text" name="price" id="price" placeholder="price" className="form-control" />
                        </div>
                        <div className="Add-input-field ">
                            <label htmlFor="title">Title</label><br/>
                            <input type="text" name="title" id="title" placeholder="title" className="form-control" />
                        </div>
                        <div className="Add-input-field ">
                            <label htmlFor="date">Date</label><br/>
                            <input type="text" name="date" id="date" placeholder="date" className="form-control" />
                        </div>
                        <div className="Add-input-field ">
                            <label htmlFor="presenter">Presenter</label><br/>
                            <input type="text" name="presenter" id="presenter" placeholder="presenter" className="form-control" />
                        </div>
                        <br/>
                        <div className="Update-btn">
                                <Button onClick={Update} label="Update Programmes"/>
                                </div>
                                {warning1=="Successfully updated"?
                                <Text color='green' as='b' fontSize='m'>{warning1}</Text>:<Text color='red' as='b' fontSize='m'>{warning1}</Text>
                                }
                            </form>

                            <br/><br/><br/><br/>
                    <form align='center'>
                        <div className="Delete-input-field">
                        <Text color='red' as='b' fontSize='l'>Delete Programme</Text><br/>
                        <label htmlFor="d_id">ID</label><br/>
                        <input type="text" name="d_id" id="d_id" placeholder="ID" className="form-control" />
                            </div>
                            <br/>
                            <div className="Delete-btn">
                                <Button onClick={Delete} label="Delete Programmes"/>
                                </div>
                                {warning2=="Successfully deleted"?
                                <Text color='green' as='b' fontSize='m'>{warning2}</Text>:<Text color='red' as='b' fontSize='m'>{warning2}</Text>
                                }
                            </form>
                                <br/><br/><br/><br/>

                            <form align='center'>
                        <div className="Retrieve-input-field">
                        <Text color='red' as='b' fontSize='l'>Retrieve Programme</Text><br/>
                        <label htmlFor="r_id">ID</label><br/>
                        <input type="text" name="r_id" id="r_id" placeholder="ID" className="form-control" />
                            </div>
                            <br/>
                            <div className="Delete-btn">
                                <Button onClick={Retrieve} label="Retrieve Programmes"/>
                                </div>
                                {warning3=="Successfully retrieved"?
                                <Text color='green' as='b' fontSize='m'>{warning3}</Text>:<Text color='red' as='b' fontSize='m'>{warning3}</Text>
                                }
                            </form>

                            <TableContainer>
            <Table size='md'>
            <Thead>
            <Tr>
                <Th>_id</Th>
                <Th>venue</Th>
                <Th>title</Th>
                <Th>date</Th>
                <Th>presenter</Th>
            </Tr>
            <Tr>
                <Th>{user5._id}</Th>
                <Th>{user5.venue}</Th>
                <Th>{user5.title}</Th>
                <Th>{user5.date}</Th>
                <Th>{user5.presenter}</Th>
            </Tr>

            </Thead>

            
        </Table>
    </TableContainer>
        </>
        
    )
}