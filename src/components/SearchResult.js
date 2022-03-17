import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './SearchResult.css'
import Update from './Update'

export default function SearchResult(props) {
  const[data,setData]=useState({name:'',age:'',rank:'',salary:'',id:''})
  const [result,setResult]=useState(true)
  const[del,setDelete]=useState(false)
  const[update,setUpdate]=useState(false)

  useEffect(()=>{
    setDelete(false)
    axios.post('https://backendcurd.herokuapp.com/search',{name : props.text}) //get json from express after search and render here 
      .then(res => {
      setResult(true)
      setUpdate(false)
      setData({
              name : res.data[0].name,
              age : res.data[0].age,
              rank : res.data[0].rank,
              salary : res.data[0].salary,
              id:res.data[0]._id
         })
         console.log(res.data[0]._id)
      }).catch(e=>{
        console.log(e.message)
        setResult(false)
      })
  },[props.status])

  const Delhandler =()=>{            
    axios.post('https://backendcurd.herokuapp.com/delete',{_id : data.id})
    .then(response =>{
        setDelete(true)           
        setResult(false)
        setUpdate(false)
        console.log(response.data)
      }) .catch(e=>{
      console.log(e.message)
    })
  
  }

  const updateHandler=()=>{
      setResult(false)
      setDelete(false)
      setUpdate(true)
  }
  
  return (
    result?(<div className='search-result'>
      <label>Name : {data.name}</label>
      <label>Age : {data.age}</label>
      <label>Rank : {data.rank}</label>
      <label>Salary : {data.salary}</label>
      <div className='btns'>
      <button onClick={Delhandler}>Delete</button><button onClick={updateHandler}>Update</button>
      </div>
    </div>) :(!update && !result && del)? (<h3>Record Deleted</h3>):
              (!update && !result && !del)? (<h3>No records found</h3>):
              (update) ? <Update props={data} /> :null

  
  )
}
