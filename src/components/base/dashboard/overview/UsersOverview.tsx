import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useAppSelector } from "../../../../../store/store";

interface PieChartProps {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
	index: number;
}

const COLORS = ["#e60000", "#c26363"];
const USER_TYPES = ["Brokers", "Barterers"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}: PieChartProps) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill='white'
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline='central'
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const UsersOverview = () => {
	const { usersData } = useAppSelector((state) => state.users);

	let brokersCount = 0;
	let barterersCount = 0;

	Object.keys(usersData).forEach((userType) => {
		usersData[userType].forEach((user) => {
			if (user.user_type.type === "broker") {
				brokersCount++;
			} else if (user.user_type.type === "barterer") {
				barterersCount++;
			}
		});
	});

	const data = [
		{ name: "Brokers", value: brokersCount },
		{ name: "Barterers", value: barterersCount },
	];

	return (
		<div className='text-2xl font-semibold ml-5 flex border-2 w-fit mt-20 rounded-medium p-5'>
			<h1>Users</h1>
			<ResponsiveContainer
				width={300}
				height={300}
			>
				<PieChart>
					<Pie
						data={data}
						cx='50%'
						cy='50%'
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={80}
						fill='#8884d8'
						dataKey='value'
					>
						{data.map((_, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Legend
						iconType='circle'
						layout='vertical'
						verticalAlign='middle'
						align='right'
						payload={USER_TYPES.map((userType, index) => ({
							value: userType,
							type: "square",
							color: COLORS[index],
						}))}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default UsersOverview;
