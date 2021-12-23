import { useState, useEffect } from 'react';
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
import FormControl from '@mui/material/FormControl';

import TextareaAutosize from '@mui/material/TextareaAutosize';

// firebase
import app from '../../util/firebase'
import { getDatabase, ref, set, push, remove, update, onValue } from "firebase/database";

const columns = [
  { field: 'id', headerName: 'Product ID', flex:1 },
	{ field: 'name', headerName : 'Product Name', flex:1 },
  { field: 'brand', headerName: 'Brand Name', flex: 1 },
	{ field: 'category', headerName: 'Category Name', flex: 1},
	{ field: 'description', headerName: 'Description', flex: 1},
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

const formStyle={
	"& div" : {
		marginTop : '10px'
	}
}

function ProductTable() {
	const [products, setProducts] = useState([]);
	const [brands, setBrands] = useState([]);
	const [companies, setCompanies] = useState([]);
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

	useEffect(async () => {
		const database = getDatabase(app);
		const companyRef = ref(database, 'companies')
		const brandRef = ref(database, 'brands');
		const productRef = ref(database, 'products');

		onValue(companyRef, (snapshot) => {
			const companyResult = snapshot.val();
			onValue(brandRef, (snapshot) => {
				const brandResult = snapshot.val();
				onValue(productRef, (snapshot) => {
					const productResult = snapshot.val()

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
							...brandResult[key],
							id:key
						})
					}
					
					// generate product array
					let productArr = []
					for(let key in productResult){
						productArr.push({
							...productResult[key],
							id:key
						})
					}

					// adjust brandArr
					productArr = productArr.map(function(item){
						let brandName = ""
						let temp = brandArr.find(c => c.id == item.brand_id)
						if(temp){
							brandName = temp.name;
						}
						return {
							...item,
							brand:brandName
						}
						return item;
					})

					console.log(productArr)
					setCompanies(companyArr)
					setBrands(brandArr)
					setProducts(productArr)
				})
			})
		});
	},[])	

	const handleSubmit = event  => {
		event.preventDefault();
		console.log(fvalues);

		// const db = getDatabase(app);
		// push(ref(db, 'products'), fvalues);

		setAddOpen(false)
		setEditOpen(false)
		setfValues({})
	}

	const handleUpdate = event => {
		event.preventDefault()
		console.log(fvalues)

		const db = getDatabase(app);
		update(ref(db, 'products/' + fvalues.id), fvalues)
		
		setEditOpen(false);
		setfValues({})
	}

	const handleRemove = event => {
		event.preventDefault()

		const db = getDatabase(app);
		remove(ref(db, 'products/' + fvalues.id))

		setDeleteOpen(false)
		setfValues({})
	}

  return (
    <div style={{width: '100%' }}>
			<Button color="secondary" variant="contained" sx={{mb:2}} onClick={() => setAddOpen(true)}>Add Product</Button>
      <DataGrid
				disableSelectionOnClick={true}
				autoHeight={true}
        rows={products}
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
					<form onSubmit={handleSubmit} className="table-form">
						<FormControl fullWidth>
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
								label="Product Name"
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues.description}
								name="description"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Product Description"
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues.category}
								name="category"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Product Category"
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues.picUrl}
								name="pic-url"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Product Picture Url"
							/>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel>Vegan Status</FormLabel>
							<RadioGroup
								aria-label="Vegan Status"
								name="status_vegan"
								value={fvalues["status_vegan"]}
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
							>
								<FormControlLabel value="1" control={<Radio />} label="True" />
								<FormControlLabel value="0" control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues["sub_category"]}
								name="sub_category"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Sub Category"
							/>
						</FormControl>
						<FormControl fullWidth>
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
								{brands.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
							</Select>
						</FormControl>				
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
					<form onSubmit={handleUpdate} className="table-form">
						<FormControl fullWidth>
							<TextField
								value={fvalues.id}
								name="id"
								variant="outlined"
								label="Product Id"
								InputProps={{
									readOnly: true,
								}}
							/>
						</FormControl>
						<FormControl fullWidth>
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
								label="Product Name"
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues.description}
								name="description"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Product Description"
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues.category}
								name="category"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Product Category"
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues["pic-url"]}
								name="pic-url"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Product Picture Url"
							/>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel>Vegan Status</FormLabel>
							<RadioGroup
								aria-label="Vegan Status"
								name="status_vegan"
								value={fvalues["status_vegan"]}
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
							>
								<FormControlLabel value="1" control={<Radio />} label="True" />
								<FormControlLabel value="0" control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues["sub_category"]}
								name="sub_category"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Sub Category"
							/>
						</FormControl>
						<FormControl fullWidth>
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
								{brands.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
							</Select>						
						</FormControl>
						<Button
							type="submit"
							variant="outlined"
						>Edit Product</Button>
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
          <Button onClick={handleRemove} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductTable;
