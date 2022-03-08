import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './SearchResult.css'

export default function SearchResult(props) {
  const[data,setData]=useState({name:'',age:'',rank:'',salary:'',id:''})
  const [result,setResult]=useState(true)
  const[del,setDelete]=useState(false)
  useEffect(()=>{
    setDelete(false)
    axios.post('http://localhost:5000/search',{name : props.text}) //get json from express after search and render here 
      .then(res => {
      setResult(true)
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
    axios.post('http://localhost:5000/delete',{_id : data.id})
    .then(response =>{
        setDelete(true)           
        setResult(false)
        console.log(response.data)
      }) .catch(e=>{
      console.log(e.message)
    })
  
  }
  
  return (
    result?(<div className='search-result'>
      <label>Name : {data.name}</label>
      <label>Age : {data.age}</label>
      <label>Rank : {data.rank}</label>
      <label>Salary : {data.salary}</label>
      <div className='btns'>
      <button onClick={Delhandler}>Delete</button><button>Update</button>
      </div>
    </div>) :(!result && del)? (<h3>Record Deleted</h3>):
              (!result && !del)? (<h3>No records found</h3>):
              <h3></h3>

  
  )
}
