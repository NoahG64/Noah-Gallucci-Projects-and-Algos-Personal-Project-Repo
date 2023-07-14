import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginAndRegister from './components/Login_and_Register';
import Navigation from './components/Navigation';
import Home from './components/home';

function App() {

	return (
		<BrowserRouter>
			<Navigation/>
			<Routes>
				<Route element={<LoginAndRegister />} path='/' default />
				<Route element={<Home/>} path='/home'/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
