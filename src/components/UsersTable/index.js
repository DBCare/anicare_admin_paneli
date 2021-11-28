import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

// dialogs
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './index.scss'

const columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'firstName', headerName: 'First name', flex: 1 },
  { field: 'lastName', headerName: 'Last name', flex: 1 },
  {
    field: 'age',
    headerName: 'Age',
    flex: 1,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
		flex: 1,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function UsersTable() {
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
				className="user-table"
				disableExtendRowFullWidth={true}
      />
			 <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this user?
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

export default UsersTable;
