import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios'

// firebase
import app from '../../util/firebase'
import { getDatabase, ref, set, push, remove, update, onValue } from "firebase/database";

// dialogs
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

// form
import TextField from '@mui/material/TextField';

const columns = [
  { field: 'id', headerName: 'Company ID', flex:1 },
  { field: 'name', headerName: 'Company Name', flex: 1 },
	{ field : 'country_code', headerName : 'Country', flex : 1 },
  { field: 'brand_number', headerName: 'Number of Brands', flex: 1 },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
	display:'flex',
	justifyContent:'center',
	alignItems:'center'
};

function CompanyTable() {
	const [companies, setCompanies] = useState(null);
	const [fvalues, setfValues] = useState("")
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	useEffect(async () => {
		const database = getDatabase(app);
		const companyRef = ref(database, 'companies')
		const brandRef = ref(database, 'brands');

		onValue(companyRef, (snapshot) => {
			const companyResult = snapshot.val();
			onValue(brandRef, (snapshot) => {
				const brandResult = snapshot.val();

				// generate company array
				let companyArr = []
				for(let key in companyResult){
					companyArr.push({
						...companyResult[key],
						id:key,
					})
				}

				// generate brand array
				let brandArr = []
				for(let key in brandResult){
					brandArr.push({
						...brandResult[key]
					})
				}

				// add brand_number to each company
				companyArr = companyArr.map(function(item){
					let temp = brandArr.filter(brand => brand.company_id === item.id).length
					return {
						...item,
						brand_number:temp
					}
				})
				setCompanies(companyArr)
			})
		});
	},[])	


	// Add operation buttons
	columns.push({
		field: 'operation',
		headerName: 'Operation',
		renderCell: ({row}) => {
			return(
				<>
					<Button color="error" variant="contained" onClick={() => {
						setfValues({...row})
						setDeleteOpen(true)
					}}>Delete</Button>
					<Button color="warning" variant="contained" onClick={() => {
						setfValues({...row})
						setEditOpen(true)
					}}>Edit</Button>
				</>
			)
		},
		flex: 1
	})

	const handleSubmit = (event)  => {
		event.preventDefault();
		const obj = {...fvalues}

		const db = getDatabase(app);
		push(ref(db, 'companies'), obj);

		setAddOpen(false)
		setfValues({})
	}

	const handleUpdate = (event) => {
		event.preventDefault();

		const db = getDatabase(app);
		update(ref(db, 'companies/' + fvalues.id), fvalues)

		setEditOpen(false)
		setfValues({})
	}

	const handleRemove = (event) => {
		event.preventDefault()
		const db = getDatabase(app);
		remove(ref(db, 'companies/' + fvalues.id))
		setDeleteOpen(false);
		setfValues({})
	}

  return (
    <div style={{width: '100%' }}>
			<Button color="secondary" variant="contained" sx={{mb:2}} onClick={() => setAddOpen(true)}>Add Company</Button>
      <DataGrid
				disableSelectionOnClick={true}
				autoHeight={true}
        rows={companies}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
				disableExtendRowFullWidth={true}
      />
			{/* POST FORM */}
			<Modal
				open={addOpen}
				onClose={() => {
					setAddOpen(false)
					setfValues({})
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form onSubmit={handleSubmit}>
						<TextField
							required
							value={fvalues.name}
							name="name"
							onInput={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
							variant="outlined"
							label="Company Name"
						/>
						<TextField
							required
							value={fvalues.country_code}
							name="country_code"
							onInput={({target}) => {
								const {name, value} = target
								const obj = {
									...fvalues,
									[name]:value
								} 
								setfValues(obj)
							}}
							variant="outlined"
							label="Country Code"
							inputProps={{ style: { textTransform: "uppercase" } }}
						/>
						<Button
							type="submit"
							variant="outlined"
						>Add Company</Button>
					</form>
				</Box>
			</Modal>
			{/* PUT FORM */}
			<Modal
				open={editOpen}
				onClose={() => {
					setEditOpen(false)
					setfValues({})
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form onSubmit={handleUpdate}>
						<TextField
							value={fvalues.id}
							variant="outlined"
							label="Company Id"
							InputProps={{
								readOnly: true,
							}}
						/>
						<TextField
							required
							name="name"
							value={fvalues.name}
							onInput={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
							variant="outlined"
							label="Company Name"
						/>
						<TextField
							required
							value={fvalues.country_code}
							name="country_code"
							onInput={({target}) => {
								const {name, value} = target
								const obj = {
									...fvalues,
									[name]:value
								} 
								setfValues(obj)
							}}
							variant="outlined"
							label="Country Code"
							inputProps={{ style: { textTransform: "uppercase" } }}
						/>
						<Button
							type="submit"
							variant="outlined"
						>Edit Company</Button>
					</form>
				</Box>
			</Modal>
			{/* DELETE BUTTON DIALOG */}
			 <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete {fvalues.name}?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button onClick={handleRemove} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CompanyTable;
