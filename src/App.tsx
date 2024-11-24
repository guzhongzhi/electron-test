import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';


function App() {
  const onFileChange = (e:any) =>{
      console.log(e.target.files[0])
      console.log(e.target.files[0].path)
  }
  const [image,setImage] = useState("myapp:///public/logo512.png")
  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={onFileChange}/>
      </header>
      <div>
        <img src={image}/>
      </div>
    </div>
  );
}

export default App;
