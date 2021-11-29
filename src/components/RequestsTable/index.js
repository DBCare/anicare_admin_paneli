import { useState } from 'react';

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

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'details', headerName: 'Request Details', flex: 1 },
  { field: 'requester', headerName: 'Requester Name', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1 },
	{ field: 'status', headerName: 'Status', flex: 1 },
];

const rows = [
  { id: 1, details: 'Lorem Ipsum', requester: 'Tom Cruise', date: String(new Date()), status:"REJECTED" },
	{ id: 2, details: 'Lorem Ipsum Dolor Sit Amet', requester: 'Matt Damon', date: String(new Date()), status:"PENDING" },
	{ id: 3, details: 'Lorem Ipsum Dolor Sit', requester: 'Robert Downey', date: String(new Date()), status:"PENDING" },
	{ id: 4, details: 'Lorem', requester: 'Christian Bale', date: String(new Date()), status:"APPROVED" },
	{ id: 5, details: 'Lorem Ipsum', requester: 'Henry Cavil', date: String(new Date()), status:"APPROVED" }
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
};

function RequestsTable() {

	const [activeRow, setActiveRow] = useState({})

	const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

	const doubleClickHandler = ({row}) => {
		console.log(row)
		setActiveRow(row)
		setOpen(true);
	}
	
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
				onCellDoubleClick={doubleClickHandler}
      />
			<Button onClick={handleOpen}>Open modal</Button>
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
						<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
							<ListItem>
								{activeRow.requester}
							</ListItem>
							<ListItem>
								{activeRow.details}
							</ListItem>
							<ListItem>
								{activeRow.date}
							</ListItem>
							<ListItem>
								{activeRow.status}
							</ListItem>
							<ListItem sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
								<Button variant="contained" href="#" color="success">Approve</Button>
								<Button variant="contained" href="#" color="error">Reject</Button>
							</ListItem>
						</List>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default RequestsTable;
