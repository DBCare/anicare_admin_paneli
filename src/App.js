import './App.scss';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar/';

import OverviewPage from './pages/OverviewPage'
import UserManagement from './pages/UserManagementPage'
import ProductManagement from './pages/ProductManagementPage'
import RequestManagement from './pages/RequestManagementPage'

const drawerWidth = 240;

function App() {
  return (
    <div className="App">
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Sidebar drawerWidth={drawerWidth}></Sidebar>
				{/* <OverviewPage drawerWidth={drawerWidth}></OverviewPage> */}
				{/* <UserManagement drawerWidth={drawerWidth}></UserManagement> */}
				{/* <ProductManagement drawerWidth={drawerWidth}></ProductManagement> */}
				<RequestManagement drawerWidth={drawerWidth}></RequestManagement>
			</Box>
    </div>
  );
}

export default App;
