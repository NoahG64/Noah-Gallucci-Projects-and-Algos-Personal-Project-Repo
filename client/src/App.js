import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginAndRegister from './components/Login_and_Register';
import Navigation from './components/Navigation';

function App() {

	return (
		<BrowserRouter>
			<Navigation/>
			<Routes>
				<Route element={<LoginAndRegister />} path='/' default />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
