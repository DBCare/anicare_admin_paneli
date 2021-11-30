import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


// dialogs
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

// form
import TextField from '@mui/material/TextField';

const columns = [
  { field: 'id', headerName: 'Company ID', flex:1 },
  { field: 'company', headerName: 'Company Name', flex: 1 },
  { field: 'brand_num', headerName: 'Number of Brands', flex: 1 },
];

const rows = [
  { id: 1, company: 'Unilever', brand_num: 123 },
	{ id: 2, company: 'placeholder-1', brand_num: 12 },
	{ id: 3, company: 'placeholder-2', brand_num: 2 }
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
	const [fvalues, setfValues] = useState("")
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	// Add operation buttons
	columns.push({
		field: 'operation',
		headerName: 'Operation',
		renderCell: ({row}) => {
			return(
				<>
					<Button color="error" variant="contained" onClick={() => setDeleteOpen(true)}>Delete</Button>
					<Button color="warning" variant="contained" onClick={() => {
						console.log(row.id, row.company)
						setfValues({id:row.id, company:row.company})
						console.log(fvalues)
						setEditOpen(true)
					}}>Edit</Button>
				</>
			)
		},
		flex: 1
	})

	const handleSubmit = (event)  => {
		event.preventDefault();
		console.log("form submitted")
		console.log(fvalues);
		setAddOpen(false)
		setEditOpen(false)
		setfValues({})
	}

  return (
    <div style={{width: '100%' }}>
			<Button color="secondary" variant="contained" sx={{mb:2}} onClick={() => setAddOpen(true)}>Add Company</Button>
      <DataGrid
				disableSelectionOnClick={true}
				autoHeight={true}
        rows={rows}
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
							value={fvalues.company}
							name="company"
							onInput={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
							variant="outlined"
							label="Company Name"
						>
						</TextField>
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
					<form onSubmit={handleSubmit}>
						<TextField
							value={fvalues.id}
							variant="outlined"
							label="Company Id"
							InputProps={{
								readOnly: true,
							}}
						>
						</TextField>
						<TextField
							required
							name="company"
							value={fvalues.company}
							onInput={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
							variant="outlined"
							label="Company Name"
						>
						</TextField>
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
          Are you sure you want to delete this product?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button onClick={() => setDeleteOpen(false)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CompanyTable;
