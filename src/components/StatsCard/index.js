import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './index.scss'

function StatsCard({title, value}) {
  return (
    <Card className="stats-card"
			sx={{
				boxShadow:'none',
				borderRadius:'8px',
				border:'1px solid #DFE0EB'
			}}
		
		>
			<CardContent
				sx={{
					cursor:'pointer',
					'&:hover':{
						color:"#3751FF"
					}
				}}
			>
				<Typography sx={{ fontSize: 20, textAlign:'center' }} color="text.secondary" gutterBottom>
					{title}
				</Typography>
				<Typography sx={{fontWeight:'bold'}} variant="h3" component="div">
					{value}
				</Typography>
			</CardContent>
		</Card>
  );
}

export default StatsCard;
