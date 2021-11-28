import './App.scss';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Sidebar from './components/Sidebar/';

import OverviewPage from './pages/OverviewPage'
import UserManagement from './pages/UserManagementPage'

const drawerWidth = 240;

function App() {
  return (
    <div className="App">
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Sidebar drawerWidth={drawerWidth}></Sidebar>
				{/* <OverviewPage drawerWidth={drawerWidth}></OverviewPage> */}
				<UserManagement drawerWidth={drawerWidth}></UserManagement>
			</Box>
    </div>
  );
}

export default App;
