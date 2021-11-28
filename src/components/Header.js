import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header({drawerWidth, text}) {
  return (
		<AppBar
			position="fixed"
			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, boxShadow: 'none' }}
		>
			<Toolbar>
				<Typography variant="h6" noWrap component="div">
					{text}
				</Typography>
			</Toolbar>
		</AppBar>
  );
}

export default Header;
