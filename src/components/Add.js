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
  const { name, age, rank, salary } = input;

  const changeHandler = (e) => {
    
    setInput({
     ...input, [e.target.name]: e.target.value,
    });
  };

  const displayData = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/add',input)
      .then(res => {
        console.log(res);
        console.log(res.data);
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
      </form >
    </div>
  );
}

export default Add;
