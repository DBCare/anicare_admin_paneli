import './App.scss';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar/';

import OverviewPage from './pages/OverviewPage'
import UserManagement from './pages/UserManagementPage'
import ProductManagement from './pages/ProductManagementPage'
import RequestManagement from './pages/RequestManagementPage'
import CompanyManagement from './pages/CompanyManagementPage'
import BrandManagement from './pages/BrandManagementPage'

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

const drawerWidth = 240;

function App() {
  return (
    <div className="App">
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Sidebar drawerWidth={drawerWidth}></Sidebar>
				<Routes>
					<Route path="/" element={<OverviewPage drawerWidth={drawerWidth}></OverviewPage>}></Route>
					<Route path="/table/requests" element={<RequestManagement drawerWidth={drawerWidth}></RequestManagement>}></Route>
					<Route path="/table/users" element={<UserManagement drawerWidth={drawerWidth}></UserManagement>}></Route>
					<Route path="/table/products" element={<ProductManagement drawerWidth={drawerWidth}></ProductManagement>}></Route>
					<Route path="/table/products" element={<ProductManagement drawerWidth={drawerWidth}></ProductManagement>}></Route>
					<Route path="/table/company" element={<CompanyManagement drawerWidth={drawerWidth}></CompanyManagement>}></Route>
					<Route path="/table/brand" element={<BrandManagement drawerWidth={drawerWidth}></BrandManagement>}></Route>
				</Routes>
			</Box>
    </div>
  );
}

export default App;
