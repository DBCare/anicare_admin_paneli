import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
	const navigate = useNavigate();
	const [fvalues, setfValues] = useState({});

	console.log(navigate)

	const handleSubmit = (event) => {
		event.preventDefault()
		const obj = {...fvalues}
		console.log(obj)
		navigate("/")
	}

	return (
		<>
			<Box
				sx={{
					width: '50%',
					height: 300,
					margin: '100px auto',
					borderRadius: '8px',
					color: 'white',
					display:'flex',
					justifyContent:'center',
					alignItems:'center',
					flexDirection:'column',
					'& div': {
						marginTop: '2px'
					}
				}}
			>
				<Typography variant="h4" color="primary" sx={{margin:'15px', fontWeight:'bold'}}>
					Log In to Admin Panel
				</Typography>
				<form onSubmit={handleSubmit}>
					<FormControl fullWidth>
						<TextField
							required
							value={fvalues.email}
							name="email"
							type="email"
							onInput={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
							variant="outlined"
							label="Email"
						/>
					</FormControl>
					<FormControl fullWidth>
						<TextField
							required
							value={fvalues.password}
							name="password"
							type="password"
							onInput={({target}) => {
								const {name, value} = target
								setfValues({
									...fvalues,
									[name]:value
								})
							}}
							variant="outlined"
							label="Password"
						/>
					</FormControl>
					<Button
						sx={{
							margin:'5px 0px',
							width:'100%',
							padding:'7px 0px'
						}}
						type="submit"
						variant="contained"
					>Login</Button>
				</form>
			</Box>
		</>
	)
}

export default LoginPage
