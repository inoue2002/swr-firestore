import {
    BrowserRouter,
    Route,
    Routes
  } from "react-router-dom";
  import Home from '../Home';
  import About from '../About';
  
  const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default AppRoutes;