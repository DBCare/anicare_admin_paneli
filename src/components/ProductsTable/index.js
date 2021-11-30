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
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';


const columns = [
  { field: 'id', headerName: 'Product ID', flex:1 },
	{ field: 'product', headerName : 'Product Name', flex:1 },
  { field: 'brand', headerName: 'Brand Name', flex: 1 },
  { field: 'company', headerName: 'Company Name', flex: 1 },
];

const rows = [
  { id: 1, product: 'Axe Black', brand: "Axe", company:'Unilever' },
	{ id: 2, product: 'Axe Africa', brand: "Axe", company:'Unilever' },
	{ id: 3, product: 'Axe Apollo', brand: "Axe", company:'Unilever' },
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

function ProductTable() {
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
						setfValues({id:row.id, product:row.product, brand:row.brand, company:row.company, brand_id:1, company_id:1})
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
			<Button color="secondary" variant="contained" sx={{mb:2}} onClick={() => setAddOpen(true)}>Add Product</Button>
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
							value={fvalues.brand}
							name="product"
							onInput={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
							variant="outlined"
							label="Product Name"
						></TextField>
						<InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
						<Select
							name="brand_id"
							required
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={fvalues.brand_id}
							label="Brand Name"
							onChange={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
						>
							{/* brand names and id's */}
							<MenuItem value={1}>Brand-1</MenuItem>
							<MenuItem value={2}>Brand-2</MenuItem>
							<MenuItem value={3}>Brand-3</MenuItem>
						</Select>
						<InputLabel id="demo-simple-select-label-2">Company Name</InputLabel>
						<Select
							name="company_id"
							required
							labelId="demo-simple-select-label-2"
							id="demo-simple-select"
							value={fvalues.company_id}
							label="Company Name"
							onChange={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
						>
							{/* company names and id's */}
							<MenuItem value={1}>Company-1</MenuItem>
							<MenuItem value={2}>Company-2</MenuItem>
							<MenuItem value={3}>Company-3</MenuItem>
						</Select>
						<Button
							type="submit"
							variant="outlined"
						>Add Product</Button>
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
							name="id"
							variant="outlined"
							label="Product Id"
							InputProps={{
								readOnly: true,
							}}
						></TextField>
						<TextField
							required
							value={fvalues.product}
							name="product"
							onInput={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
							variant="outlined"
							label="Product Name"
						></TextField>
						<InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
						<Select
							name="brand_id"
							required
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={fvalues.brand_id}
							label="Brand Name"
							onChange={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
						>
							{/* brand names and id's */}
							<MenuItem value={1}>Brand-1</MenuItem>
							<MenuItem value={2}>Brand-2</MenuItem>
							<MenuItem value={3}>Brand-3</MenuItem>
						</Select>
						<InputLabel id="demo-simple-select-label-2">Company Name</InputLabel>
						<Select
							name="company_id"
							required
							labelId="demo-simple-select-label-2"
							id="demo-simple-select"
							value={fvalues.company_id}
							label="Company Name"
							onChange={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
						>
							{/* company names and id's */}
							<MenuItem value={1}>Company-1</MenuItem>
							<MenuItem value={2}>Company-2</MenuItem>
							<MenuItem value={3}>Company-3</MenuItem>
						</Select>
						<Button
							type="submit"
							variant="outlined"
						>Add Product</Button>
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
          Are you sure you want to delete this brand?
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

export default ProductTable;
