import { Text } from '@chakra-ui/react'
import { findUserById } from './App'
import { Button } from '../components/Button';
import {useState,React} from 'react';
import { validateUsername } from '../validate/username';
import { validatePassword } from '../validate/password';
import axios from 'axios'
import { valid } from 'semver';


export function ProgrammesAdd() {
    const [warning1,setWarning1]=useState("");


    function Add(){
        let description = document.getElementById("description").value;
        let venue = document.getElementById("venue").value;
        let price = document.getElementById("price").value;
        let title = document.getElementById("title").value;
        let date = document.getElementById("date").value;
        let presenter = document.getElementById("presenter").value;

        axios.post('http://localhost:3001/api/programmes/updateProgrammes', {
            description:description,
            venue:venue,
            price:price,
            title:title,
            date:date,
            presenter:presenter
        })
        .then((res) => { 
            console.log(res)
            setWarning1("Successfully created")
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




    return (
        <>
            <form align='center'>
                        <div className="Add-input-field">
                        <Text color='red' as='b' fontSize='l'>Add Programme</Text><br/>
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
                        <div className="Create-btn">
                                <Button onClick={Add} label="Add Programmes"/>
                                </div>
                                {warning1=="Successfully created"?
                                <Text color='green' as='b' fontSize='m'>{warning1}</Text>:<Text color='red' as='b' fontSize='m'>{warning1}</Text>
                                }
                            </form>
        </>
        
    )
}