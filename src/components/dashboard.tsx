import { useState, useEffect } from "react";
import { Row, Col, Table, Select, Switch } from "antd";

import { hatvp_parser } from "../services/hatvp_gh_parser";
import { ParsedData, RowData } from "./model";

interface DashBordProps {
    sourceName: string;
    groupbyOptions: Array<{ value: string; label: string }>;
    groupbyField: string;
    columns: Array<any>;
}

export const Dashboard = ({ sourceName, groupbyOptions, groupbyField, columns }: DashBordProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [baseData, setBaseData] = useState<ParsedData>({});
    const [rowData, setRowData] = useState<Array<RowData>>([]);
    const [preparedData, setPreparedData] = useState<Array<RowData>>([]);

    // filters
    const [persons, setPersons] = useState<Array<string>>([]);
    const [groupBy, setGroupBy] = useState<Array<string>>([]);
    const [emptyValue, setEmptyValue] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        hatvp_parser
            .getFile(sourceName)
            .then((result) => setBaseData(result))
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
        setRowData(
            Object.entries(baseData).flatMap(([name, valuesPerActivityType]) =>
                Object.entries(valuesPerActivityType).flatMap(([activityType, valuesPerActivityName]) =>
                    Object.entries(valuesPerActivityName).flatMap(([activityName, items]) =>
                        items.map((item, i) => ({
                            // key: `${name}_${activityType}_${activityName}_${i}`,
                            name,
                            activityType,
                            activityName,
                            ...item,
                        }))
                    )
                )
            )
        );
    }, [baseData]);

    useEffect(() => {
        let filteredData = rowData.filter(
            ({ name }) => !persons.length || persons.includes(name)
            //({ name, value }) => (!persons.length || persons.includes(name)) && (emptyValue || value > 0)
        );

        if (groupBy.length === 0) {
            setPreparedData(filteredData);
        } else {
            let grouper: { [key: string]: Array<number> } = {};

            filteredData.forEach((item) => {
                let keyProps: { [key: string]: any } = {};

                Object.entries(item).forEach(([key, value]) => (keyProps[key] = groupBy.includes(key) ? value : ""));
                let key = JSON.stringify(keyProps);

                grouper[key] = grouper[key] || [];

                console.log(key, item[groupbyField], item);
                grouper[key].push(item[groupbyField]);
            });

            console.log(grouper);
            setPreparedData(
                Object.entries(grouper).map(([props, values]) => ({
                    ...JSON.parse(props),
                    [groupbyField]: values.reduce((a, b) => a + b, 0),
                }))
            );
        }
    }, [rowData, persons, emptyValue, groupBy]);

    return (
        <Row justify={"center"} gutter={[16, 16]}>
            <Col span={24}>
                <Row gutter={[16, 16]}>
                    <Col xs={12} md={12} xl={6}>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Sélectionnez des personnes"
                            onChange={setPersons}
                            options={Array.from(new Set(Object.keys(baseData))).map((name) => ({
                                label: name,
                                value: name,
                            }))}
                        />
                    </Col>
                    <Col xs={12} md={12} xl={6}>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Grouper par"
                            onChange={setGroupBy}
                            options={groupbyOptions}
                        />
                    </Col>
                </Row>
            </Col>

            {/* <Col span={6}>
                <span>Salaire vide</span>
                <Switch defaultChecked={emptyValue} onChange={setEmptyValue} />
            </Col> */}

            <Col span={24}>
                <Table
                    dataSource={preparedData}
                    size={"middle"}
                    loading={loading}
                    pagination={{ showSizeChanger: true }}
                >
                    <Table.Column title={"Personne"} dataIndex={"name"} />
                    {columns}
                </Table>
            </Col>
        </Row>
    );
};
