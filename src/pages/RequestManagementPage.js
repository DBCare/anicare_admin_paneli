import React from 'react'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Header from '../components/Header/';
import RequestsTable from '../components/RequestsTable';

function RequestManagement({drawerWidth}) {
	return (
		<Box
			component="main"
			sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
		>
			{/* gives a padding at top */}
			<Toolbar />
			<Header drawerWidth={drawerWidth} text={"Request Management"}></Header>
			<RequestsTable></RequestsTable>
		</Box>
	)
}

export default RequestManagement
