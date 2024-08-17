import * as d3 from "d3";
import { Tree } from "./Tree";

async function getData() {
	return await d3.json("/data.json");
}

async function drawTree() {
	const container = document.getElementById("chart");
	const data = await getData();

	const chart = Tree(data, {
		label: (d) => d.name,
		title: (d, n) =>
			`${n
				.ancestors()
				.reverse()
				.map((d) => d.data.name)
				.join(".")}`, // hover text
		link: (d, n) =>
			`https://github.com/prefuse/Flare/${
				n.children ? "tree" : "blob"
			}/master/flare/src/${n
				.ancestors()
				.reverse()
				.map((d) => d.data.name)
				.join("/")}${n.children ? "" : ".as"}`,
		width: 1152,
	});

	container.appendChild(chart);
}

drawTree();
