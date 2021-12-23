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

// firebase
import app from '../../util/firebase'
import { getDatabase, ref, set, push, remove, update, onValue } from "firebase/database";

const columns = [
  { field: 'id', headerName: 'Brand ID', flex:1 },
	{ field: 'barcode_prefix', headerName: 'Barcode Prefix', flex:1},
	{ field: 'category', headerName: 'Category', flex: 1},
  { field: 'name', headerName: 'Brand Name', flex: 1 },
  { field: 'company', headerName: 'Company Name', flex: 1 },
	{ field: 'cruelty_free', headerName: 'Cruelty Free', flex: 1 },
];

const rows = [
  { id: 1, name: 'Axe', company: "Unilever", cruelty_free:true },
	{ id: 2, name: 'Dove', company: "Unilever", cruelty_free:false },
	{ id: 3, name: 'Rexona', company: "Unilever", cruelty_free:true },
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
	// display: 'grid',
	// gridTemplateColumns: 'auto auto auto'
	// gridTemplateColumns: '50% 50%',
	// gridTemplateRows: '1fr',
	// columnGap: '20px'
	// display:'flex',
	// justifyContent:'center',
	// alignItems:'center',
};

const stringToBoolean = (str) => str.toLowerCase() === 'true'

function BrandTable() {
	const [companies, setCompanies] = useState([]);
	const [brands, setBrands] = useState([]);
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
						...brandResult[key],
						id:key
					})
				}

				// adjust brandArr
				brandArr = brandArr.map(function(item){
					let companyName = ""
					let temp = companyArr.find(c => c.id == item.company_id)
					if(temp){
						companyName = temp.name;
					}
					return {
						...item,
						cruelty_free:Boolean(JSON.parse(item.cruelty_free)),
						company:companyName
					}
					return item;
				})

				console.log(brandArr)

				setCompanies(companyArr)
				setBrands(brandArr)

			})
		});
	},[])	

	const handleSubmit = event => {
		event.preventDefault();

		const db = getDatabase(app);
		push(ref(db, 'brands'), fvalues);
		
		setAddOpen(false)
		setEditOpen(false)
		setfValues({})
	}

	const handleUpdate = event => {
		event.preventDefault()
		
		const db = getDatabase(app);
		update(ref(db, 'brands/' + fvalues.id), fvalues)
		
		setfValues({})
		setEditOpen(false);
	}

	const handleRemove = event => {
		event.preventDefault()
		
		const db = getDatabase(app);
		remove(ref(db, 'brands/' + fvalues.id))
		
		setfValues({})
		setDeleteOpen(false);
	}

  return (
    <div style={{width: '100%' }}>
			<Button color="secondary" variant="contained" sx={{mb:2}} onClick={() => setAddOpen(true)}>Add Brand</Button>
      <DataGrid
				disableSelectionOnClick={true}
				autoHeight={true}
        rows={brands}
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
								label="Brand Name"
							/>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Company Name</InputLabel>
							<Select
								name="company_id"
								required
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={fvalues.company_id}
								label="Company Name"
								sx={{width:'100%'}}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								{/* company names and id's */}
								{companies.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
							</Select>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues["barcode_prefix"]}
								name="barcode_prefix"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Barcode Prefix"
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues["category"]}
								name="category"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Category"
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
								label="Picture Url"
							/>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Status CFK?</FormLabel>
							<RadioGroup
								required
								aria-label="cruelty free"
								name="status_cfk"
								value={fvalues["status_cfk"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Status China</FormLabel>
							<RadioGroup
								required
								aria-label="status china"
								name="status_china"
								value={fvalues["status_china"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Status EE</FormLabel>
							<RadioGroup
								required
								aria-label="status ee"
								name="status_ee"
								value={fvalues["status_ee"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Status ES</FormLabel>
							<RadioGroup
								required
								aria-label="status es"
								name="status_es"
								value={fvalues["status_es"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Status LH</FormLabel>
							<RadioGroup
								required
								aria-label="status LH"
								name="status_lh"
								value={fvalues["status_lh"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Cer CCF</FormLabel>
							<RadioGroup
								required
								aria-label="status LH"
								name="cer_ccf"
								value={fvalues["cer_ccf"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Cer LB</FormLabel>
							<RadioGroup
								required
								aria-label="status LH"
								name="cer_lb"
								value={fvalues["cer_lb"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Cer Peta</FormLabel>
							<RadioGroup
								required
								aria-label="status LH"
								name="cer_peta"
								value={fvalues["cer_peta"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Is Cruelty-Free?</FormLabel>
							<RadioGroup
								required
								aria-label="cruelty free"
								name="cruelty_free"
								value={fvalues.cruelty_free}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={true} control={<Radio />} label="True" />
								<FormControlLabel value={false} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<Button type="submit" variant="outlined">Add Brand</Button>
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
								label="Brand Name"
							/>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Company Name</InputLabel>
							<Select
								name="company_id"
								required
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={fvalues.company_id}
								label="Company Name"
								sx={{width:'100%'}}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								{/* company names and id's */}
								{companies.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
							</Select>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues["barcode_prefix"]}
								name="barcode_prefix"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Barcode Prefix"
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								required
								value={fvalues["category"]}
								name="category"
								onInput={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
								variant="outlined"
								label="Category"
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
								label="Picture Url"
							/>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Status CFK?</FormLabel>
							<RadioGroup
								required
								aria-label="cruelty free"
								name="status_cfk"
								value={fvalues["status_cfk"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Status China</FormLabel>
							<RadioGroup
								required
								aria-label="status china"
								name="status_china"
								value={fvalues["status_china"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Status EE</FormLabel>
							<RadioGroup
								required
								aria-label="status ee"
								name="status_ee"
								value={fvalues["status_ee"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Status ES</FormLabel>
							<RadioGroup
								required
								aria-label="status es"
								name="status_es"
								value={fvalues["status_es"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Status LH</FormLabel>
							<RadioGroup
								required
								aria-label="status LH"
								name="status_lh"
								value={fvalues["status_lh"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Cer CCF</FormLabel>
							<RadioGroup
								required
								aria-label="status LH"
								name="cer_ccf"
								value={fvalues["cer_ccf"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Cer LB</FormLabel>
							<RadioGroup
								required
								aria-label="status LH"
								name="cer_lb"
								value={fvalues["cer_lb"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Cer Peta</FormLabel>
							<RadioGroup
								required
								aria-label="status LH"
								name="cer_peta"
								value={fvalues["cer_peta"]}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={"1"} control={<Radio />} label="True" />
								<FormControlLabel value={"0"} control={<Radio />} label="False" />
							</RadioGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel component="legend">Is Cruelty-Free?</FormLabel>
							<RadioGroup
								required
								aria-label="cruelty free"
								name="cruelty_free"
								value={fvalues.cruelty_free}
								onChange={({target}) => {
									const {name, value} = target
									setfValues({
										...fvalues,
										[name]:value
									})
								}}
							>
								<FormControlLabel value={true} control={<Radio />} label="True" />
								<FormControlLabel value={false} control={<Radio />} label="False" />
							</RadioGroup>					
						</FormControl>					
						<Button	type="submit" variant="outlined">Edit Brand</Button>
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

export default BrandTable;
