import { Table } from "antd";

import { Dashboard } from "./dashboard";
import { euroRender, sorter } from "./util";

export const Participations = () => {
    const groupbyOptions = [
        { value: "name", label: "Nom" },
        { value: "nomSociete", label: "Société" },
    ];
    return (
        <Dashboard
            sourceName={"participations.json"}
            groupbyOptions={groupbyOptions}
            groupbyField={"evaluation"}
            columns={[
                <Table.Column title={"Société"} dataIndex={"nomSociete"} />,
                <Table.Column
                    title={"Evaluation"}
                    dataIndex={"evaluation"}
                    sorter={sorter("evaluation")}
                    render={euroRender}
                />,
                <Table.Column title={"Capital"} dataIndex={"capitalDetenu"} sorter={sorter("capitalDetenu")} />,
                // <Table.Column title={"Rem"} dataIndex={"remuneration"} />,
            ]}
        />
    );
};
