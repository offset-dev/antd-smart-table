import React from "react";
import SmartTable from "@offset-dev/antd-smart-table";

const dataSource = [
	{
		key: "1",
		name: "Mike",
		age: 32,
		address: "10 Downing Street",
		date: "2020-01-01T10:00:00-00:00",
	},
	{
		key: "2",
		name: "John",
		age: 42,
		address: "10 Downing Street",
		date: "2020-01-02T10:00:00-00:00",
	},
];

const App = () => {
	return (
		<SmartTable
			dataSource={dataSource}
			columns={[
				{
					title: "Name",
					dataIndex: "name",
					key: "name",
					search: "name",
				},
				{
					title: "Age",
					dataIndex: "age",
					key: "age",
				},
				{
					title: "Address",
					dataIndex: "address",
					key: "address",
					search: "address",
				},
				{
					title: "Date",
					dataIndex: "date",
					key: "date",
					dateRange: "date",
					s,
				},
			]}
		/>
	);
};

export default App;
