import { useState, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import './index.scss'

// firebase
import app from '../../util/firebase'
import { getDatabase, ref, set, push, remove, update, onValue } from "firebase/database";


const columns = [
  { field: 'id', headerName: 'ID', flex:1 },
	{ field: 'category', headerName: 'Category', flex:1 },
	{ field: 'description', headerName: 'Description', flex:1 },
	{ field: 'name', headerName: 'Name', flex:1 },
	{ field: 'status', headerName: 'Status', flex:1 },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
	borderRadius : '4px',
  boxShadow: 24,
  p: 4,
	display:'flex',
	justifyContent:'center',
	alignItems:'center'
};

function RequestsTable() {

	const [requests, setRequests] = useState([])
	const [fvalues, setfValues] = useState("")
	const [activeRow, setActiveRow] = useState({})

	const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

	columns.push({
		field: 'operation',
		headerName: 'Operation',
		renderCell: ({row}) => {
			return(
				<Button color="warning" variant="contained" onClick={() => {
					setfValues({...row})
					setOpen(true)
				}}>Set Status</Button>
			)
		},
		flex: 1
	})

	useEffect(() => {
		const database = getDatabase(app);
		const requestRef = ref(database, 'requests')
		onValue(requestRef, (snapshot) => {
			const requestResult = snapshot.val()
			let requestArr = []
			for(let key in requestResult){
				requestArr.push({
					...requestResult[key],
					id:key
				})	
			}
			setRequests(requestArr);
		})
	},[])

	const handleUpdate = msg => {
		console.log(fvalues)
		console.log(msg)

		const db = getDatabase(app);
		update(ref(db, 'requests/' + fvalues.id), {
			...fvalues,
			status:msg
		})

		setOpen(false);
	}
	
	return (
    <div style={{width: '100%' }}>
      <DataGrid
				disableSelectionOnClick={true}
				autoHeight={true}
        rows={requests}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
				disableExtendRowFullWidth={true}
				className="request-table"
      />
			<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
						<List sx={{ 
							width: '100%', 
							maxWidth: 360, 
							bgcolor: 'background.paper',
							li:{
								display:'flex',
								justifyContent:'center',
								alignItems:'center'
							}
						}}>
							<ListItem>
								{fvalues.id}
							</ListItem>
							<ListItem>
								{fvalues.category}
							</ListItem>
							<ListItem>
								{fvalues.description}
							</ListItem>
							<ListItem>
								{fvalues.name}
							</ListItem>
							<ListItem>
								{fvalues.status}
							</ListItem>
							<ListItem sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
								<Button variant="contained" href="#" color="success" onClick={() => handleUpdate("approved")}>Approve</Button>
								<Button variant="contained" href="#" color="error" onClick={() => handleUpdate("rejected")}>Reject</Button>
							</ListItem>
						</List>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default RequestsTable;
