'use client';

import { PageDescription } from "../PageDescription";
import { PageTitle } from "../PageTitle";

export default function Home1() {
	return (
		<div>
			<PageTitle>Hello World!</PageTitle>
			<PageDescription>
				Welcome to the Utified!
				<br />
				Utified is a modern, user-friendly utility toolkit for developers. Perform encoding, decoding, JSON formatting, text transformations, and more – all in one fast and sleek interface.
			</PageDescription>
		</div>
	);
}
