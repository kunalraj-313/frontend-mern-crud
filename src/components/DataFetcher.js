import React,{useState} from "react";
import "./DataFetcher.css";
import Add from "./Add";
import SearchResult from "./SearchResult";

function DataFetcher() {
    const [toggle,setToggle] = useState(false)
    const[searchBtn,setBtn] = useState(false)
    const [keyword,setKeyword]=useState('')
    const [render,setRender]=useState(true)

    const clickHandler=(flag)=>{
      if(flag=='add'){
        setToggle(true)
        setBtn(false)
      }else if(flag=='search'){
        setToggle(false)
        setBtn(true)
        setRender(!render)
      }
    }

  return (
      <>
    <div className="search-bar">
      <label>
        Keyword :
        <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
      </label>
    <div>
      <button className="search" onClick={()=>clickHandler('search')}>Search</button>
      <button className="add-entry" onClick={()=>clickHandler('add')}>Add Data</button>
      </div>  
    </div>
    {searchBtn && <SearchResult text={keyword} status={render} />}
    {toggle && <Add/>} 
    </>
  );
}

export default DataFetcher;
