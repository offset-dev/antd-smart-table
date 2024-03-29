import React, { useState } from "react";
import { Button, Input, Table, DatePicker } from "antd";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import propTypes from "prop-types";
import moment from "moment";

SmartTable.propTypes = {
	onRowsChange: propTypes.func,
	columns: propTypes.array.isRequired,
	spanish: propTypes.bool,
};

export default function SmartTable(props) {
	const [state, setState] = useState({
		searchedText: "",
		searchedColumn: null,
	});

	// noinspection JSUnusedGlobalSymbols
	const getSearchColumnProps = (dataIndex, title, dateRange) => ({
		filterDropdown: function f({ setSelectedKeys, selectedKeys, confirm, clearFilters }) {
			return (
				<div style={{ padding: 8 }}>
					{dateRange ? (
						<React.Fragment>
							<DatePicker.RangePicker
								onChange={e => setSelectedKeys([e?.[0] + "/" + e?.[1]])}
								onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
								ranges={{
									[props.spanish ? "Últimos 7 Dias" : "Last 7 Days"]: [moment().subtract(7, "days").startOf("day"), moment()],
									[props.spanish ? "Últimos 15 Dias" : "Last 15 Days"]: [moment().subtract(15, "days").startOf("day"), moment()],
									[props.spanish ? "Últimos 30 Dias" : "Last 30 Days"]: [moment().subtract(30, "days").startOf("day"), moment()],
								}}
								style={{ width: 300, marginBottom: 8 }}
							/>
							<br />
						</React.Fragment>
					) : (
						<Input
							onChange={e => setSelectedKeys(e.currentTarget.value ? [e.currentTarget.value] : [])}
							onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
							placeholder={`${props.spanish ? "Buscar" : "Search"} ${title}`}
							style={{ width: 188, marginBottom: 8, display: "block" }}
							value={selectedKeys[0]}
						/>
					)}
					<Button
						icon={dateRange ? <FilterFilled /> : <SearchOutlined />}
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						size="small"
						style={{ width: 90, marginRight: 8 }}
						type="primary">
						{dateRange ? (props.spanish ? "Filtrar" : "Filter") : props.spanish ? "Buscar" : "Search"}
					</Button>
					<Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						{props.spanish ? "Reiniciar" : "Reset"}
					</Button>
				</div>
			);
		},
		filterIcon: () => {
			if (dateRange) {
				return <FilterFilled />;
			} else {
				return <SearchOutlined />;
			}
		},
		onFilter: (value, record) => {
			const date1 = moment(value.split("/")?.[0], "x");
			const date2 = moment(value.split("/")?.[1], "x");

			if (date1.isValid() && date2.isValid()) {
				return moment(record[dataIndex]).isBetween(date1.startOf("day"), date2.endOf("day"));
			} else {
				return record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase());
			}
		},
		render: text => {
			if (state.searchedColumn === dataIndex) {
				return (
					<Highlighter
						autoEscape
						highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
						searchWords={[state.searchedText]}
						textToHighlight={text?.toString() ?? ""}
					/>
				);
			} else {
				return text;
			}
		},
	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setState({
			searchedText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};

	const handleReset = clearFilters => {
		clearFilters();
		setState({ ...state, searchedText: "" });
	};

	return (
		<Table
			onChange={(a, b, c, d) => props?.onRowsChange?.(d.currentDataSource.length)}
			pagination={{ defaultPageSize: 30 }}
			locale={
				props.spanish
					? {
							emptyText: "No hay Información por mostrar",
							filterTitle: "Filtrar",
							filterConfirm: "OK",
							filterReset: "Reiniciar",
							filterEmptyText: "No hay filtros",
							selectAll: "Seleccionar página",
							selectInvert: "Invertir selección",
							selectionAll: "Seleccionar todo",
							sortTitle: "Ordenar",
							expand: "Expandir",
							collapse: "Colapsar",
							triggerDesc: "Click para ordenar descendiente",
							triggerAsc: "Click para ordenar ascendiente",
							cancelSort: "Click para cancelar orden",
					  }
					: {}
			}
			{...props}
			columns={props.columns.map(c => {
				if (c.search) {
					return {
						key: c.search,
						...getSearchColumnProps(c.search, c.title),
						...c,
					};
				} else if (c.dateRange) {
					return {
						...getSearchColumnProps(c.dataIndex, c.title, true),
						...c,
					};
				} else {
					return c;
				}
			})}
		/>
	);
}
