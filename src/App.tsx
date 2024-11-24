import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';


function App() {
  const window = globalThis as any
  const onFileChange =   () =>{
         window.api.openFileDialog().then((res:any)=>{
          console.log(res[0])
          setImage(res[0]);
        });
  }
  useEffect(()=>{
    console.log(window.api)
  },[])
  const [image,setImage] = useState("myapp://public/logo512.png")
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onFileChange}>选择文件</button>
      </header>
      <div>
        <img width={200} src={image}/>
      </div>
    </div>
  );
}

export default App;
