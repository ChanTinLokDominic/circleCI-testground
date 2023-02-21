import {useState,React} from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {
    Text,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Divider,
    Flex,
    Heading,
    HStack,
    IconButton,
    Spacer,
    Drawer,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    useDisclosure,
    Tag,
} from '@chakra-ui/react';
import { Search2Icon, HamburgerIcon } from '@chakra-ui/icons';
import { SearchBar } from '../components/SearchBar';
import { Button } from '../components/Button';
import { render } from '@testing-library/react';
import { validateUsername } from '../validate/username';
import { validatePassword } from '../validate/password';
import axios from 'axios'
import { changeloggined } from './App';
let currentusername;


export function TopNavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    var [logined,setLogined]=useState(false);
    const [warning,setWarning]=useState("");
    const [username,setUsername]=useState("");
    const [role,setRole]=useState("");

    // var name="testing";
    // var checkpassword="12345678";

    function Login(){
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let bodytext = "username=" + username + "&password=" + password;

        if(!validateUsername(username) || !validatePassword(password)){
            // console.log("error")
            setWarning("Invalid username or password")
        }
        else{
            // TODO: check if database contains the username, if yes, check password
            axios.post('http://localhost:3001/api/auth/signin', {
                username: username,
                password: password})
            .then((res) => { 
                setLogined(true)
                changeloggined(true)
                if(res.data.user.role=="admin")
                setRole("admin");
                else if(res.data.user.role=="user")
                setRole("user")
                // console.log(res.data.user.username)
                setUsername(res.data.user.username)
                currentusername=res.data.user.username;
                console.log(res.data.user.username)
             })
            .catch((error) => {
                console.error(error)
                if (error.response.status === 400) {
                    setWarning("Invalid username or password");
                }
                else{
                    setWarning("Invalid username or password")
                }
            })

            
        }
    }

    function Logout(){
        setWarning("");
        setLogined(false);
        changeloggined(false);
        setUsername("");
        window.location.href = 'http://localhost:3000/';
    }


    async function Register(){
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if(!validateUsername(username) || !validatePassword(password)){
            console.log("error")
            setWarning("Invalid username or password")
            return 
        }
        axios.post('http://localhost:3001/api/users/user', {
            username: username,
            password: password
        })
        .then((res) => { 
            setWarning('Successfully registered! Please log in now')
            console.log(res)
            currentusername=username;
         })
        .catch((error) => {
            console.error(error)
            if (error.response.status === 400) {
                setWarning("Username already been used");
            }
            else{
                setWarning("Unknown error has occured")
            }
        })
    }

        return (
        <>
            <Flex m="15px" position="sticky" gap={10}>
                <HStack spacing={10}>
                    <Link to="/">
                        <HStack minW={50}>
                            <Search2Icon boxSize="7" />
                            <Heading display="inline" minWidth="100px">EventGO</Heading>
                        </HStack>
                    </Link>
                </HStack>
                <Spacer />
                <IconButton
                    ref={btnRef}
                    icon={<HamburgerIcon />}
                    onClick={onOpen}
                />
            </Flex>
            <Divider />
            <Tabs align='center'>
                {logined?
                <TabList>
                    <Tab><Link to="/">Home</Link></Tab>
                    <Tab><Link to="/search">Search</Link></Tab>
                    <Tab><Link to="/sort">Sort</Link></Tab>
                    <Tab><Link to="/map">Map</Link></Tab>
                    {role=="admin"?
                    <Tab><Link to="/AdminCUD">Admin CUD</Link></Tab>:null}
                    {role=="admin"?
                     <Tab><Link to="/ShowAllUser">ShowAllUser</Link></Tab>
                     :null}
                     {role=="admin"?
                     <Tab><Link to="/ProgrammesAdd">Add Programmes</Link></Tab>
                     :null}
                     {role=="admin"?
                     <Tab><Link to="/ProgrammesRUD">Programmes RUD</Link></Tab>
                     :null}

                </TabList>
                :null}
            </Tabs>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Hello{" "+username}!</DrawerHeader>
                    <DrawerBody>
                    {logined?
                         <Link to="./myfavourite">My Favorite</Link> 
                         :null}
                         <br/> 
                         {!logined?
                        <form align='center'>
                                <div className="Register-input-field">
                                    
                                    <label htmlFor="username">Username</label><br/>
                                    <input type="text" name="username" id="username" placeholder="username" className="form-control" />
                                </div>
                                <div className="Register-input-field ">
                                    <label htmlFor="password">Password</label><br/>
                                    <input type="password" name="password" id="password" placeholder="password" className="form-control" />
                                </div>
                                <br/>
                                <div className="Login-btn">
                                <Button onClick={Login} label="Login"/>
                                </div>
                                <div className="Register-btn">
                                <Button onClick={Register} label="Register"/>
                                </div>
                                <Text color='red' as='b' fontSize='m'>{warning}</Text>
                            </form>
                            :null}
                    </DrawerBody>
                    <DrawerFooter>
                        {logined? <Button onClick={Logout} label="Log out"/> : null}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

function getcurrentusername(){
    return currentusername;
}

export{getcurrentusername};
