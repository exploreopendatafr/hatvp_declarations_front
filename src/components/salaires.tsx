import { Table } from "antd";

import { Dashboard } from "./dashboard";
import { sorter, yearlyEuroRender } from "./util";

export const Salaires = () => {
    const groupbyOptions = [
        { value: "name", label: "Nom" },
        { value: "year", label: "Année" },
    ];
    return (
        <Dashboard
            sourceName={"salaires.json"}
            groupbyOptions={groupbyOptions}
            groupbyField={"value"}
            columns={[
                <Table.Column title={"Catégorie"} dataIndex={"activityType"} />,
                <Table.Column title={"Activité"} dataIndex={"activityName"} />,
                <Table.Column title={"Type"} dataIndex={"type"} />,
                <Table.Column title={"Année"} dataIndex={"year"} sorter={sorter("year")} />,
                <Table.Column
                    title={"Montant (/12)"}
                    dataIndex={"value"}
                    render={yearlyEuroRender}
                    sorter={sorter("value")}
                />,
            ]}
        />
    );
};
