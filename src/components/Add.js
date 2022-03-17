import React, { useState } from "react";
import axios from 'axios'
import './Add.css'

function Add() {
  const [input, setInput] = useState({
    name: "",
    age: "",
    rank: "",
    salary: "",
  });
  const[result,setResult]=useState(false)
  // const { name, age, rank, salary } = input;

  const changeHandler = (e) => {
    
    setInput({
     ...input, [e.target.name]: e.target.value,
    });
    setResult(false)
  };

  const displayData = (e) => {
    e.preventDefault();
    axios.post('https://backendcurd.herokuapp.com/add',input)
      .then(res => {
        console.log(res.data);
        if (res.data== "Data added Successfully"){
          setResult(true);
        }
        
      }).catch(e=>{
        console.log(e.message)
      })
  };

  return (
    <div className="form">
        <form onSubmit={displayData}>
      <div>
        <label>Name :</label>
        <input type="text" name="name" onChange={changeHandler} />
      </div>
        <div>
        <label> Age :</label>
        <input type="text" name="age" onChange={changeHandler} />
        </div>
        <div>
        <label> Rank :</label>
        <input type="text" name="rank" onChange={changeHandler} />
        </div>
        <div>
        <label>Salary : </label>
        <input type="text" name="salary" onChange={changeHandler} />
        </div>
      <button type="sumbit" className='add-btn'>
        Submit
      </button>
      {result?(<div className='stat'>Data Added Successfully!</div>):null}
      </form >
    </div>
  );
}

export default Add;
