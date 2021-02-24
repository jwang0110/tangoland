import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "./features/layout/Layout";
import { Flashcard } from "./features/flashcards/Flashcard";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { ResetButton } from "./features/flashcards/ResetButton";
import "./App.css";

const App = () => {
	const flashcardsStatus = useSelector((state) => state.flashcards.status);
	const error = useSelector((state) => state.flashcards.error);

	let content;

	if (flashcardsStatus === "loading") {
		content = <Loading />;
	} else if (flashcardsStatus === "succeeded") {
		content = (
			<>
				<Flashcard />
				<ResetButton />
			</>
		);
	} else if (flashcardsStatus === "failed") {
		content = <Error message={error} />;
	}

	return (
		<div className="App">
			<Layout>{content}</Layout>
		</div>
	);
};

export default App;
