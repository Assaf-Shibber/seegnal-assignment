import React, { useState } from "react";
import "./App.css";

function App() {
  const [arrOfData, setArrOfData] = useState([
    { term: "no data", count: "no data", precentage: "no data" },
  ]);
  const [keyWord, setKeyWord] = useState()
 const handleChange=(e)=>{

   setKeyWord(e.target.value)
 }
  const handleClick = () => {
    fetch(`http://localhost:4000/newData`,{
      method: "POST",
    body: JSON.stringify({keyWord}),
    headers: {
      "Content-Type": "application/json"
    }
    }).then((response) =>
      response
        .json()
        .then((response) => {
          setArrOfData(response);
        })
        .catch((error) => console.error("Error:", error))
    );
    
  };

  return (
    <div className="App">
      <div className="search-container">
        <h3>Search for Reaction</h3>
        <input
          type="text"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button onClick={()=>{handleClick()}}>Search!</button>
      </div>
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th>Name of Ingredient</th>
              <th>Count</th>
              <th>Precentage</th>
            </tr>
          </thead>
          <tbody>
            {arrOfData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-column="term">
                    {item.term}
                  </td>
                  <td data-column="Count">{item.count}</td>
                  <td data-column="Precentage">{item.precentage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
