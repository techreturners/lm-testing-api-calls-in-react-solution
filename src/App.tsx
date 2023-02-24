import './App.css';
import useFetchData from './fetchData';
import { handleResponse } from './utils';

function App() {

  const { data, error, isFetching, status } = useFetchData<{ name: string }>('https://swapi.dev/api/people/1/');

  return (
    <div className="App">
      <h1>
        {isFetching ? "Fetching..." : handleResponse(data, error, status)}
      </h1>
    </div>
  );
}

export default App;
