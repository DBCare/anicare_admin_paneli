import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

// dialogs
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// firebase
import app from '../../util/firebase'
import { getDatabase, ref, set, push, remove, update, onValue } from "firebase/database";

import './index.scss'


const columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'firstname', headerName: 'First name', flex: 1 },
  { field: 'lastname', headerName: 'Last name', flex: 1 },
	{ field: 'email', headerName: 'Last name', flex: 1 },
	{ field: 'allergies', headerName: 'Allergies', flex: 1 },
  {
    field: 'fullname',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
		flex: 1,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstname') || ''} ${
        params.getValue(params.id, 'lastname') || ''
      }`,
  },
];

function UsersTable() {
	const [open, setOpen] = useState(false);
	const [users, setUsers] = useState([]);
	const [fvalues, setfValues] = useState("")
	
	const handleRemove = event => {
		event.preventDefault()

		const db = getDatabase(app);
		remove(ref(db, 'users/' + fvalues.id))

		setOpen(false)
	}

	columns.push({
		field: 'operation',
		headerName: 'Operation',
		renderCell: ({row}) => {
			return(
				<Button color="error" variant="outlined" onClick={() => {
					setfValues({...row})
					setOpen(true)
				}}>Delete</Button>
			)
		},
		flex: 1
	})

	useEffect(async () => {
		const database = getDatabase(app);
		const userRef = ref(database, 'users')
		onValue(userRef, (snapshot) => {
			const userResult = snapshot.val()
			let userArr = []
			for(let key in userResult){
				userArr.push({
					...userResult[key],
					id:key
				})	
			}
			setUsers(userArr);
		})
	},[])


  return (
    <div style={{width: '100%' }}>
      <DataGrid
				disableSelectionOnClick={true}
				autoHeight={true}
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
				className="user-table"
				disableExtendRowFullWidth={true}
      />
			 <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this user?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleRemove} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsersTable;
