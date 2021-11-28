import React from 'react'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Header from '../components/Header/';
import ProductsTable from '../components/ProductsTable';

function ProductManagement({drawerWidth}) {
	return (
		<Box
			component="main"
			sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
		>
			{/* gives a padding at top */}
			<Toolbar />
			<Header drawerWidth={drawerWidth} text={"Product Management"}></Header>
			<ProductsTable></ProductsTable>
		</Box>
	)
}

export default ProductManagement
