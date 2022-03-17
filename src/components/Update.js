import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './Update.css'

function Update({props}) {

  const[data,setData]=useState({name:'',age:'',rank:'',salary:'',id:''})
  const[result,setResult]=useState(false)
  const { name, age, rank, salary ,id} = props;

  useEffect(() => {
          setData({
            name:name,
            age:age,
            rank:rank,
            salary:salary,
            id:id
          })
  }, [props])
  
  const changeHandler = (e) => {
    
    setData({
     ...data, [e.target.name]: e.target.value
    });
    setResult(false)
  };

  const updateData = (e)=> {
    e.preventDefault();
    console.log(data);
    axios.post('https://backendcurd.herokuapp.com/update', data).then(response => {
      console.log(response.data);

      if (response.data == "Updated Successfully") {
        setResult(true);
      }
    }).catch(e => {
      console.log(e.message);
    });
  };

  return (
    <div className='updform'>
        <form onSubmit={updateData}>
      <div>
        <label>Name :</label>
        <input type="text" name="name" value={data.name} onChange={changeHandler} />
      </div>
        <div>
        <label> Age :</label>
        <input type="text" name="age" value={data.age} onChange={changeHandler} />
        </div>
        <div>
        <label> Rank :</label>
        <input type="text" name="rank" value={data.rank} onChange={changeHandler} />
        </div>
        <div>
        <label>Salary : </label>
        <input type="text" name="salary" value={data.salary} onChange={changeHandler} />
        </div>
      <button type="sumbit" className='add-btn'>
        Submit
      </button>
      {result?(<div className='stat'>Data updated Successfully!</div>):null}
      </form >
    </div>
  )
}

export default Update