import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { TopNavBar} from './TopNavBar';
import { MyFavorite } from './MyFavorite'
import { Search } from './Search'
import { Location } from './Location';
import { Sort } from './Sort'
import { Map } from './Map'
// import{ ShowAllProgramme } from './ShowAllProgramme'
import { AdminCUD} from './AdminCUD'
import { ShowAllUser } from './ShowAllUser';
import {ProgrammesAdd} from './ProgrammesAdd'
import {ProgrammesRUD} from './ProgrammesRUD'
let loggined=false



function App() { 
  if(window.location!='http://localhost:3000/' && loggined==false){
  window.location.href = 'http://localhost:3000/';
}
  else{
  return (
    <ChakraProvider theme={theme}>
      <TopNavBar />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path="/search" element={<Search />} />
        <Route path="/myfavourite" element={<MyFavorite />} />
        <Route path="/sort" element={<Sort />} />
        <Route path="/map" element={<Map />} />
        <Route path="/admin/showAllUser" element={<ShowAllUser/>}/>
        {/* <Route path="/admin/ShowAllProgramme" element={<ShowAllProgramme/>}/> */}
        <Route path="/location/:id" element={<Location />} />
        <Route path="/AdminCUD" element={<AdminCUD/>}/>
        <Route path="/ShowAllUser" element={<ShowAllUser/>}/>
        <Route path="/ProgrammesAdd" element={<ProgrammesAdd/>}/>
        <Route path="/ProgrammesRUD" element={<ProgrammesRUD/>}/>
      </Routes>
    </ChakraProvider>
  );
  }
}

function changeloggined(bool){
loggined=bool;
}
// function changeRole(x){
//   role=x;
// }
export default App;
export {changeloggined};
