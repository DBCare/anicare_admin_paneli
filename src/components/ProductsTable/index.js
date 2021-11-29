import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

// dialogs
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'product', headerName: 'Product Name', flex: 1 },
  { field: 'company', headerName: 'Company Name', flex: 1 },
  { field: 'amount', headerName: 'Number of Products', flex: 1 },
];

const rows = [
  { id: 1, product: 'placeholder', company: 'placeholder', amount: 35 },
	{ id: 2, product: 'placeholder', company: 'placeholder', amount: 35 },
	{ id: 3, product: 'placeholder', company: 'placeholder', amount: 35 },
	{ id: 4, product: 'placeholder', company: 'placeholder', amount: 35 },
	{ id: 5, product: 'placeholder', company: 'placeholder', amount: 35 },
];

function ProductsTable() {
	const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	columns.push({
		field: 'operation',
		headerName: 'Operation',
		renderCell: (params) => {
			console.log(params)
			return(
				<Button color="error" variant="outlined" onClick={handleClickOpen}>Delete</Button>
			)
		},
		flex: 1
	})

  return (
    <div style={{width: '100%' }}>
      <DataGrid
				disableSelectionOnClick={true}
				autoHeight={true}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
				disableExtendRowFullWidth={true}
      />
			 <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this product?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductsTable;
