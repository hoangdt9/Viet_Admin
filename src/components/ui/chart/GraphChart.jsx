import React, { useRef } from 'react';
import CanvasJSReact from './canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphChart = () => {
	const chart = useRef(null);

	const addSymbols = (e) => {
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
		if (order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}

	const toggleDataSeries = (e) => {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		chart.current.render();
	}

	const options = {
		animationEnabled: true,
		colorSet: "colorSet2",
		title: {
			text: "Monthly Sales"
		},
		axisX: {
			valueFormatString: "MMMM"
		},
		axisY: {
			prefix: "$",
			labelFormatter: addSymbols
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			itemclick: toggleDataSeries,
			verticalAlign: "top"
		},
		data: [
			//...Your data goes here
		]
	}
	
	return (
		<div>
			<CanvasJSChart options = {options} onRef={ref => chart.current = ref} />
		</div>
	);
}

export default GraphChart;
