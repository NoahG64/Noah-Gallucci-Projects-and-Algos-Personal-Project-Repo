import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginAndRegister from './components/Login_and_Register';
import Navigation from './components/Navigation';
import Home from './components/Home';
import AddGame from './components/AddGame';
import GameDetails from './components/GameDetails';

function App() {

	return (
		<BrowserRouter>
			<Navigation/>
			<Routes>
				<Route element={<LoginAndRegister />} path='/' default />
				<Route element={<Home/>} path='/home'/>
				<Route element={<AddGame/>} path='/addGame'/>
				<Route element={<GameDetails/>} path='/gameDetails'/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
