import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	footer: {
		flexShrink: 0,
	},
}));

export const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Typography variant="body2" color="textSecondary" align="center">
				<a
					href="https://johnwang.netlify.app/"
					target="_blank"
					rel="noreferrer"
				>
					Design and Built by John Wang
				</a>
			</Typography>
		</footer>
	);
};
