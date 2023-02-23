// import { useFetchData } from './fetchData';
import { useState, useEffect } from 'react';
import './App.css';
import useFetchData from './fetchData';

function App() {

  // const [person, setPerson] = useState("")
  // const [error, setError] = useState("")

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('https://swapi.dev/api/people/1/');
  //       if (response.status === 200) {
  //         const json = await response.json();
  //         setPerson(json.name)
  //       }
  //       else if (response.status === 500) {
  //         setError("Oops... something went wrong, try again")
  //       }
  //       else if (response.status === 418) {
  //         setError("418 I'm a tea pot 🫖, silly")
  //       }
  //   }
  //   catch(e) {
  //     console.log(e)
  //   }
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  const { data, error, isFetching } = useFetchData<{name: string}>('https://swapi.dev/api/people/1/')

  // console.log("hi", isFetching ? "fetching..." : data.name)

  // console.log("hi", data !== {} ? data.name : "")

console.log(data?.name)
  return (
    <div className="App">
      {/* {person !== "" && error === "" ? <h1>{person}</h1> : <h1>{error}</h1>} */}
    </div>
  );
}

export default App;
