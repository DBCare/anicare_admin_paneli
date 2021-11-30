import './App.scss';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar/';

import OverviewPage from './pages/OverviewPage'
import UserManagement from './pages/UserManagementPage'
import ProductManagement from './pages/ProductManagementPage'
import RequestManagement from './pages/RequestManagementPage'

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
				</Routes>

				{/* <OverviewPage drawerWidth={drawerWidth}></OverviewPage> */}
				{/* <UserManagement drawerWidth={drawerWidth}></UserManagement> */}
				{/* <ProductManagement drawerWidth={drawerWidth}></ProductManagement> */}
				{/* <RequestManagement drawerWidth={drawerWidth}></RequestManagement> */}
			</Box>
    </div>
  );
}

export default App;
