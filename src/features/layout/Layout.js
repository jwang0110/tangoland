import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Header } from "./Header";
import { Footer } from "./Footer";

const useStyles = makeStyles((theme) => ({
	main: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

export const Layout = ({ children }) => {
	const classes = useStyles();

	return (
		<>
			<Header />
			<Container className={classes.main} maxWidth="xs">
				<main>{children}</main>
				<Footer />
			</Container>
		</>
	);
};
