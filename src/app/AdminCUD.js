import { Text } from '@chakra-ui/react'
import { findUserById } from './App'
import { Button } from '../components/Button';
import {useState,React} from 'react';
import { validateUsername } from '../validate/username';
import { validatePassword } from '../validate/password';
import axios from 'axios'
import { valid } from 'semver';


export function AdminCUD() {
    const [warning1,setWarning1]=useState("");
    const [warning2,setWarning2]=useState("");
    const [warning3,setWarning3]=useState("");


    function Create(){
        let C_username = document.getElementById("username").value;
        let C_password = document.getElementById("password").value;

        if(!validateUsername(C_username) || !validatePassword(C_password)){
            console.log("error")
            setWarning1("Invalid username or password")
            return 
        }
        axios.post('http://localhost:3001/api/users/user', {
            username: C_username,
            password: C_password
        })
        .then((res) => { 
            // console.log(res)
            console.log(document.getElementById("text1").color)
            setWarning1("Successfully created")
         })
        .catch((error) => {
            console.error(error)
            if (error.response.status === 400) {
                console.log(document.getElementById("text1"))
                setWarning1("Username already been used");
            }
            else{
                setWarning1("Unknown error has occured")
            }
        })
    }




    function Update(){
        let U_username = document.getElementById("U_username").value;
        let U_newUsername = document.getElementById("U_newUsername").value;
        let U_password = document.getElementById("U_password").value;


        if(!validateUsername(U_username) ||!validateUsername(U_newUsername)|| !validatePassword(U_password)){
            setWarning2("Invalid username or password")
            return 
        }
        axios.patch('http://localhost:3001/api/users/user', {
            username: U_username,
            newUsername: U_newUsername,
            password: U_password
        })
        .then((res) => { 
            console.log(res)
            setWarning2("Successfully updated")
         })
        .catch((error) => {
            console.error(error)
            if (error.response.status === 400) {
                setWarning2("Username not exist");
            }
            else{
                setWarning2("Unknown error has occured")
            }
        })
    }

    function Delete(){
        let D_username = document.getElementById("D_username").value;

        if(!validateUsername(D_username)){
            console.log("error")
            
            setWarning3("Invalid username or password")
            return 
        }
        axios.patch('http://localhost:3001/api/users/removeUser', {
            username: D_username,
        })
        .then((res) => { 
            console.log(res)
            document.getElementById("text3").color="green";
            setWarning3("Successfully deleted")
         })
        .catch((error) => {
            console.error(error)
            if (error.response.status === 400) {
                setWarning3("Username not exist");
            }
            else{
                setWarning3("Unknown error has occured")
            }
        })

    }


    return (
        <>
            <form align='center'>
                        <div className="Create-input-field">
                        <Text color='red' as='b' fontSize='l'>Create User</Text><br/>
                            <label htmlFor="username">Username</label><br/>
                            <input type="text" name="username" id="username" placeholder="username" className="form-control" />
                                </div>
                                <div className="Create-input-field ">
                            <label htmlFor="password">Password</label><br/>
                            <input type="password" name="password" id="password" placeholder="password" className="form-control" />
                        </div>
                        <div className="Create-btn">
                                <Button onClick={Create} label="Create"/>
                                </div>
                                {warning1=="Successfully created"?
                                <Text id="text1" color='green' as='b' fontSize='m'>{warning1}</Text>:<Text id="text1" color='red' as='b' fontSize='m'>{warning1}</Text>
                                }
                            </form><br/><br/><br/><br/><br/>
                            


                            <form align='center'>
                                <div className="Update-input-field">
                                <Text color='red' as='b' fontSize='l'>Update User</Text><br/>
                                    <label htmlFor="username">Username</label><br/>
                                    <input type="text" name="U_username" id="U_username" placeholder="username" className="form-control" />
                                </div>
                                <div className="Update-input-field ">
                                    <label htmlFor="newUsername">New Username</label><br/>
                                    <input type="text" name="U_newUsername" id="U_newUsername" placeholder="newUsername" className="form-control" />
                                </div>
                                <div className="Update-input-field">
                                    <label htmlFor="password">Password</label><br/>
                                    <input type="password" name="U_password" id="U_password" placeholder="password" className="form-control" />
                                </div>
                                <div className="Update-btn">
                                <Button onClick={Update} label="Update"/>
                                </div>
                                {warning2=="Successfully updated"?
                                <Text id="text2" color='green' as='b' fontSize='m'>{warning2}</Text>:<Text id="text2" color='red' as='b' fontSize='m'>{warning2}</Text>
                                }
                            </form><br/><br/><br/><br/><br/>


                            <form align='center'>
                                <div className="Delete-input-field">
                                <Text color='red' as='b' fontSize='l'>Delete User</Text><br/>
                                    <label htmlFor="username">Username</label><br/>
                                    <input type="text" name="D_username" id="D_username" placeholder="username" className="form-control" />
                                </div>
                                <div className="Delete-btn">
                                <Button onClick={Delete} label="Delete"/>
                                </div>
                                {warning3=="Successfully deleted"?
                                <Text id="text3" color='green' as='b' fontSize='m'>{warning3}</Text>:<Text id="text3" color='red' as='b' fontSize='m'>{warning3}</Text>
                                }
                            </form>
        </>
        
    )
}