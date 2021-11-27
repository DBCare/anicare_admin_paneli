import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChartIcon from '@mui/icons-material/PieChart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InboxIcon from '@mui/icons-material/Inbox';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

function App() {
  return (
		<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					}
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar>
					<div style={{
						display:'flex',
						justifyContent:'space-around',
						alignItems:'center',
						width:'100%',
						margin:'20px 0px'
					}}>
						<svg 
						style={{
							width:'50%'
						}}
						width="33" height="40" viewBox="0 0 33 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<ellipse cx="29.5096" cy="28.2013" rx="3.49038" ry="3.55201" fill="#29303E"/>
							<path d="M17.7789 0.108215C21.0789 0.108215 20.4231 2.90677 19.6828 4.30604C23.2367 1.46444 25.1827 3.33731 25.7115 4.62895C27.4885 9.02053 19.0481 14.2086 14.6058 16.2537C12.575 17.8037 15.2404 19.0523 16.8269 19.4828C19.0481 19.8057 26.9808 19.8057 28.8846 27.2326C30.4077 33.1742 27.4038 37.4581 25.7115 38.8574C21.6923 38.965 12.8923 39.1157 9.84614 38.8574C6.79999 38.5991 7.9423 36.597 8.89422 35.6283C9.90961 33.5617 8.04812 29.3854 6.99045 27.5556C1.40589 27.5556 0.0097045 23.8959 0.00967991 22.0661C-0.244166 15.6079 4.55776 13.3475 6.99045 13.0246C9.2116 4.95186 13.6539 0.108215 17.7789 0.108215Z" fill="#F9F9F9"/>
							<path d="M10.1538 13.3475L19.6731 4.30598C20.9423 2.23936 20.1677 0.785201 19.3557 0.431063C14.025 -1.89389 9.51921 5.59765 6.34613 13.0245C7.36152 13.0245 9.30767 13.2398 10.1538 13.3475Z" fill="#29303E"/>
							<path d="M18.7212 26.9097C17.3462 26.5868 14.4693 27.1035 13.9616 31.7534V35.6283C13.327 35.6283 11.9943 35.8866 11.7405 36.92C11.4232 38.2116 12.6924 38.8574 13.327 38.8574" stroke="#29303E" stroke-width="2.11538" stroke-linecap="round"/>
							<path d="M2.53851 24.5721C2.85582 24.6984 3.5539 24.7616 3.80774 24.0035" stroke="#29303E" stroke-width="2.11538" stroke-linecap="round"/>
							<path d="M1.70107 22.066H1.47195C1.12494 22.066 0.925501 22.4608 1.13137 22.7401L1.24593 22.8956C1.41502 23.125 1.75799 23.125 1.92708 22.8956L2.04164 22.7401C2.24751 22.4608 2.04807 22.066 1.70107 22.066Z" fill="#29303E"/>
							<ellipse cx="3.80771" cy="21.4202" rx="0.634615" ry="0.645819" fill="#29303E"/>
						</svg>
							<h3>Admin Dashboard</h3>
					</div>
				</Toolbar>
				<Divider />
				<List>
					<ListItem button>
						<ListItemIcon>
							<PieChartIcon></PieChartIcon>
						</ListItemIcon>
						<ListItemText primary={"Overview"} />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<Inventory2Icon></Inventory2Icon>
						</ListItemIcon>
						<ListItemText primary={"Product Management"} />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<GroupIcon></GroupIcon>
						</ListItemIcon>
						<ListItemText primary={"User Management"} />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<ListAltIcon></ListAltIcon>
						</ListItemIcon>
						<ListItemText primary={"Request Management"} />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<InboxIcon></InboxIcon>
						</ListItemIcon>
						<ListItemText primary={"Inbox"} />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button>
						<ListItemIcon>
							<SettingsIcon></SettingsIcon>
						</ListItemIcon>
						<ListItemText primary={"Settings"} />
					</ListItem>
				</List>
			</Drawer>
  );
}

export default App;
