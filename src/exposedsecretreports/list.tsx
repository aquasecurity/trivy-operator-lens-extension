import "./list.scss"
import React from "react"
import {Renderer} from "@k8slens/extensions"
import {ExposedSecret} from "./types";

const {
    Component: {
        Table,
        TableHead,
        TableRow,
        TableCell,
        Badge,
    }
} = Renderer;

interface Props {
    exposedsecrets: ExposedSecret[];
}

const severityOrder = new Map([
    ["CRITICAL", 0],
    ["HIGH", 1],
    ["MEDIUM", 2],
    ["LOW", 3],
])

const BySeverity = (v1: ExposedSecret, v2: ExposedSecret) => {
    return severityOrder.get(v1.severity) - severityOrder.get(v2.severity)
}

export class ExposedSecretsList extends React.Component<Props> {

    getTableRow = (uid: string) => {
        const {exposedsecrets} = this.props;
        const exposedsecret = exposedsecrets.find(item => item.getId() == uid);

        return (
            <TableRow key={exposedsecret.getId()} nowrap sortItem={exposedsecret}>
                <TableCell className="ruleID">
                    <a target="_blank">{exposedsecret.getId()}</a>
                </TableCell>
                <TableCell className="severity">
                    <Badge className={"Badge severity-" + exposedsecret.severity} small label={exposedsecret.severity}/>
                </TableCell>
                <TableCell className="target">{exposedsecret.target}</TableCell>
                <TableCell className="category">{exposedsecret.category}</TableCell>
                <TableCell className="match">{exposedsecret.match}</TableCell>
            </TableRow>
        );
    }

    render() {
        const {exposedsecrets} = this.props

        if (!ExposedSecret.length) {
            return null;
        }

        const virtual = exposedsecrets.length > 50;
        const sorted = exposedsecrets.sort(BySeverity)

        return (
            <div className="ExposedSecretsList">
                <Table tableId="exposedsecretsTable"
                       selectable
                       virtual={virtual}
                       items={sorted}
                       getTableRow={this.getTableRow}
                >
                    <TableHead>
                        <TableCell className="ruleID">ID</TableCell>
                        <TableCell className="severity">Severity</TableCell>
                        <TableCell className="target">Target</TableCell>
                        <TableCell className="category">Category</TableCell>
                        <TableCell className="match">Match</TableCell>
                    </TableHead>
                    {
                        !virtual && sorted.map((exposedsecret: ExposedSecret) => this.getTableRow(exposedsecret.getId()))
                    }
                </Table>
            </div>
        )
    }

}
