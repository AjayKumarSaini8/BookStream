import { Router, Route, useNavigate, Routes } from 'react-router-dom'
import { Navbar, Home, Booklist } from './components/index'
import { useState } from 'react';


function App() {


  const [booklist, setBookist] = useState([]);
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchInput === '') return;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=books+${searchInput}&key=AIzaSyAbr_mnO88bXbeseUjO5aX1L2xXQCoVr_c`
    );
    const data = await response.json();
    setResults(data.items);
  }

  const addToBooklist = (result) => {
    const oldresult = [...booklist]
    const newresult = [...oldresult, result]
    setBookist(newresult)
    console.log(newresult)

  }

  const removeFromBooklist = (id) => {
    const oldresult = [...booklist]
    const newresult = oldresult.filter(result => result.id !== id)
    setBookist(newresult)
    console.log(newresult)
  }

  return (
    <div >

      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="/booklist" element={<Booklist booklist={booklist} removeFromBooklist={removeFromBooklist} />} />
          <Route path="/navbar" element={<Navbar results={results} searchInput={searchInput} setSearchInput={setSearchInput} handleSubmit={handleSubmit} isLoading={isLoading} addToBooklist={addToBooklist} />} />
        </>

      </Routes>


    </div>
  )
}

export default App
