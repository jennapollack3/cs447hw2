import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [dataSet, setDataSet] = useState([]);

  const [createName, setCreateName] = useState("");
  const [createId, setCreateId] = useState("");
  const [createPoints, setCreatePoints] = useState("");
  const [needUpdate, setNeedUpdate] = useState(0);

  function deleteRecord(id) {
    fetch("/delete?id=" + id).then((res) => { });
    console.log("deleting..." + id);
    setNeedUpdate(needUpdate + 1);
  }
  function createRecord() {
    fetch("/create?name=" + createName + "&points=" + createPoints + "&id="+createId).then((res) => { });
    console.log("creating..." + createName + "  points: " + createPoints + "  id: " + createId);
    setCreateName("");
    setCreatePoints("");
    setCreateId("");
    setNeedUpdate(needUpdate + 1);
  }

  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/readall").then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        setDataSet(data);
        console.log("got data set" + data);
      })
    );
  }, [needUpdate]);//initial rendering


  return (
    <div className="App">
      <h1>Person Database CS447 HW2</h1>

      <div >
        <table>
          <tr>
            <th>ID Number</th>
            <th>Name</th>
            <th>Points</th>
            <th></th>
          </tr>
          {dataSet.map((data) => {
            return (
              <tr key={data.id}>
                <td style={{ width: "100px" }}>{data.id}</td>
                <td style={{ width: "300px" }}>{data.name}</td>
                <td style={{ width: "150px" }}>{data.points}</td>
                <td><button type="button" onClick={() => deleteRecord(data.id)}>Delete</button></td>
              </tr>
            )
          })}
          <tr>
            <td><input type="text" value={createId} onChange={(e) => setCreateId(e.target.value)} /></td>
            <td><input type="text" value={createName} onChange={(e) => setCreateName(e.target.value)} /></td>
            <td><input type="text" value={createPoints} onChange={(e) => setCreatePoints(e.target.value)} /></td>
            <td><button type="button" onClick={() => createRecord()}>Add</button></td>
          </tr>
        </table>
      </div>

    </div>
  );
}

export default App;
