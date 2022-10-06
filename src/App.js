import { useState } from 'react';
import './App.css';
import Form from './components/form/Form';
import ErrorModal from './components/ui/ErrorModal';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //Sending form to a server
  function addContractorHandler(contractorData){
    setIsLoading(true)
    fetch(
      'https://localhost:60001/Contractor/Save.json',
      {
        method: 'POST',
        body: JSON.stringify(contractorData),
        headers:{
          'Content-Type': 'application/json',
        }
      } 
    ).then(response => {
      setIsLoading(false);
      return response.json()
    }).catch(error => {
      setError('Nie znaleziono metody zapisu!')
      setIsLoading(false)
    })
  }

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      <h2>Add Contractor</h2>
      <section>
        <Form onAddContractor={addContractorHandler}/>
      </section>
      {isLoading && <h3>Loading...</h3>}
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
    </div>
  );
}

export default App;