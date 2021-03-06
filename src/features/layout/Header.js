import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	header: {
		margin: "1rem",
	},
	link: {
		color: "black",
		textDecoration: "none",
	},
	title: {
		[theme.breakpoints.down("sm")]: {
			fontSize: "3rem",
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "3.75rem",
		},
	},
}));

const Header = () => {
	const classes = useStyles();

	return (
		<header className={classes.header}>
			<Link to="/" className={classes.link}>
				<Typography className={classes.title} component="h1" align="center">
					TangoLand
				</Typography>
			</Link>
		</header>
	);
};

export default Header;
