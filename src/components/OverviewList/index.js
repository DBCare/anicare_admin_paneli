import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const data = [
	{
		company:"Dermoskin Face Cream",
		value:4238
	},
	{
		company:"NYX Lipstick",
		value:1005
	},
	{
		company:"Urban Care Hydrating Shampoo",
		value:914
	},
	{
		company:"Cosmed Cleansing Oil",
		value:281
	}
]

function OverviewList() {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', p:1, borderRadius:'8px', border:'1px solid #DFE0EB'}}>
      <nav aria-label="main mailbox folders" style={{width:'100%'}}>
        <List
					subheader={<ListSubheader sx={{
						display:'flex', 
						justifyContent:'space-between', 
						alignItems:'center',
					}}>
						<Typography variant="h6" component="div" color="text.primary">
							Unresolved Requests
						</Typography>
						<Link>View details</Link>
					</ListSubheader>}
				>
					{data.map(item => {
						return(
							<>
								<ListItem sx={{display:'flex', justifyContent:'center', alignItems:'center', padding:'20px'}}>
									<ListItemText>
										{item.company}
									</ListItemText>
									<ListItemText sx={{textAlign:'right'}}>
										{item.value}
									</ListItemText>
								</ListItem>
								<Divider></Divider>
							</>
						)
					})}         
        </List>
      </nav>
    </Box>
  );
}

export default OverviewList;
