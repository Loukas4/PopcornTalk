import { Routes, Route } from 'react-router-dom';
import Home from './routes/homepage/homepage';
import Authentication from './components/authenication/authentication';
 
const App = () => {
    return ( 
        <Routes>
            <Route index element= { <Home /> }></Route>
            <Route path='auth' element= { <Authentication/> }></Route>
        </Routes>
        );
}

export default App;