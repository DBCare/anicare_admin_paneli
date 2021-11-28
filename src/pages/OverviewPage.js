import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Header from '../components/Header/';
import StatsCard from '../components/StatsCard'
import OverviewList from '../components/OverviewList';

// charts
import {
  Chart,
  PieSeries,
  Title,
	Legend
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
const brandChartData = [
  { brand: 'Urban Care', value: 24 },
  { brand: 'Flormar', value: 7 },
  { brand: 'Pastel', value: 7 },
  { brand: 'Siveno', value: 7 }
];

const productChartData = [
  { product: 'Skin Care', value: 24 },
  { product: 'Make Up', value: 7 },
  { product: 'Hair Care', value: 7 },
  { product: 'Dental Care', value: 7 }
];

const userChartData = [
  { gender: 'Female', value: 24 },
  { gender: 'Male', value: 7 },
  { gender: 'Not specified', value: 7 }
];

function OverviewPage({drawerWidth}) {
  return (
		<Box
			component="main"
			sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
		>
			{/* gives a padding at top */}
			<Header drawerWidth={drawerWidth} text={"Overview"}></Header>
			<Toolbar />
				<Grid sx={{textAlign:'center'}}  container spacing={3}>
					<Grid container item spacing={3}>
						<Grid item xs={3}>
							<StatsCard
								title={"Pending Requests"}
								value={60}
							/>
						</Grid>
						<Grid item xs={3}>
							<StatsCard
								title={"Closed Requests"}
								value={143}
							/>
						</Grid>
						<Grid item xs={3}>
							<StatsCard
								title={"User Count"}
								value={1500}
							/>
						</Grid>
						<Grid item xs={3}>
							<StatsCard
								title={"Product Count"}
								value={"10K"}
							/>
						</Grid>
					</Grid>
					<Grid container item spacing={3}>
						<Grid item xs={6}>
							<OverviewList></OverviewList>
						</Grid>
						<Grid item xs={6}>
							<OverviewList></OverviewList>
						</Grid>
					</Grid>
					<Grid container item spacing={3}>
						<Grid item xs={12}>
						<Typography sx={{textAlign:'left'}} variant="h5" noWrap component="div">
							Overall Distrubition
						</Typography>
						</Grid>
						<Grid item xs={4}>
							<Chart
								data={brandChartData}
							>
								<PieSeries
									valueField="value"
									argumentField="brand"
								/>
								<Title
									text="Brand Chart"
								/>
								<Animation />
								<Legend/>
							</Chart>
						</Grid>
						<Grid item xs={4}>
							<Chart
								data={productChartData}
							>
								<PieSeries
									valueField="value"
									argumentField="product"
								/>
								<Title
									text="Product Chart"
								/>
								<Animation />
								<Legend/>
							</Chart>
						</Grid>
						<Grid item xs={4}>
							<Chart
								data={userChartData}
							>
								<PieSeries
									valueField="value"
									argumentField="gender"
								/>
								<Title
									text="User Chart"
								/>
								<Animation />
								<Legend/>
							</Chart>
						</Grid>
					</Grid>
				</Grid>
		</Box>
  );
}

export default OverviewPage;
