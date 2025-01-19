import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import { useAppSelector } from "../../../../../store/store";

const BartersOverview = () => {
	const { bartersData } = useAppSelector((state) => state.barters);

	const chartData = useMemo(() => {
		const groupedData: Record<string, number> = {};

		bartersData.forEach((barter) => {
			const date = new Date(barter.created_at);
			const dateKey = `${date.getFullYear()}-${
				date.getMonth() + 1
			}-${date.getDate()}`;
			groupedData[dateKey] = (groupedData[dateKey] || 0) + 1;
		});

		return Object.keys(groupedData).map((dateKey) => ({
			date: dateKey,
			count: groupedData[dateKey],
		}));
	}, [bartersData]);

	return (
		<div className='text-2xl font-semibold ml-5 flex border-2 w-fit mt-20 rounded-medium p-5'>
			<h1>Barters Over Time</h1>
			<ResponsiveContainer
				width='100%'
				height={300}
			>
				<LineChart data={chartData}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='date' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type='monotone'
						dataKey='count'
						stroke='#e60000'
						activeDot={{ r: 8 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default BartersOverview;
