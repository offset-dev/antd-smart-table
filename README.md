# Antd Smart Table
[![NPM](https://img.shields.io/npm/v/@offset-dev/antd-smart-table.svg)](https://www.npmjs.com/package/@offset-dev/antd-smart-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Have you ever used [Ant Design]'s Table component and ended up constantly rewriting the same functions?
#### This is for you.

**Antd Smart Table** includes:
- Search Function
- Date Range Function

With more coming soon...

> Made with create-react-library

## Install

```bash
npm install --save @offset-dev/antd-smart-table
yarn add @offset-dev/antd-smart-table
```

## Usage

```jsx
import SmartTable from "@offset-dev/antd-smart-table";
import "antd/dist/antd.css";

const dataSource = [
    {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
        date: "2020-01-01T10:00:00-00:00"
    },
    {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
        date: "2020-01-02T10:00:00-00:00"
    },
];

const Page = () => {
    return (
        <SmartTable dataSource={dataSource} columns={[
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
                dateRange: "date"
            },
        ]}/>
    )
}
```

## License

MIT © [offset-dev](https://github.com/offset-dev)

[Logo]: https://i.ibb.co/0Vt1LRy/logo.png "Offset Logo"
[Ant Design]: https://ant.design/ "Ant Design"
