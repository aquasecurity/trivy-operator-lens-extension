import {Renderer} from "@k8slens/extensions";
import React from "react";
import { ExposedSecretReport} from "./types";
import {store} from "./store";
import {Scanner} from "../trivy_operator/types";

const {
    Component: {
        KubeObjectListLayout,
        Badge,
    }
} = Renderer;

enum sortBy {
    name = "name",
    namespace = "namespace",
    critical = "critical",
    high = "high",
    medium = "medium",
    low = "low",
}

export class ExposedSecretReportPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <KubeObjectListLayout
                tableId="ExposedSecretReportsTable"
                className="ExposedSecretReports" store={store}
                sortingCallbacks={{
                    [sortBy.name]: (report:ExposedSecretReport) => report.getName(),
                    [sortBy.namespace]: (report: ExposedSecretReport) => report.metadata.namespace,
                    [sortBy.critical]: (report: ExposedSecretReport) => report.report.summary.criticalCount,
                    [sortBy.high]: (report: ExposedSecretReport) => report.report.summary.highCount,
                    [sortBy.medium]: (report: ExposedSecretReport) => report.report.summary.mediumCount,
                    [sortBy.low]: (report: ExposedSecretReport) => report.report.summary.lowCount,
                }}
                searchFilters={[
                    (report: ExposedSecretReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ExposedSecretReports"
                renderTableHeader={[
                    {title: "Name", className: "name", sortBy: sortBy.name},
                    {title: "Namespace", className: "namespace", sortBy: sortBy.namespace},
                    {title: "Image", className: "repository"},
                    {title: "Critical", className: "critical", sortBy: sortBy.critical},
                    {title: "High", className: "high", sortBy: sortBy.high},
                    {title: "Medium", className: "medium", sortBy: sortBy.medium},
                    {title: "Low", className: "low", sortBy: sortBy.low},
                    {title: "Scanner", className: "scanner"},
                ]}
                renderTableContents={(report: ExposedSecretReport) => [
                    renderName(report.getName()),
                    report.metadata.namespace,
                    renderImage(report),
                    report.report.summary.criticalCount,
                    report.report.summary.highCount,
                    report.report.summary.mediumCount,
                    report.report.summary.lowCount,
                    renderScanner(report.report.scanner),
                ]}
            />
        )
    }
}

function renderName(name: string) {
    return (
        <Badge flat expandable={false} key="name" label={name} tooltip={name}/>
    )
}

function renderScanner(scanner: Scanner) {
    return scanner.name + " " + scanner.version
}

function renderImage(report: ExposedSecretReport) {
    const imageRef = report.getImageRef()
    return (
        <Badge flat expandable={false} key="imageRef" label={imageRef} tooltip={imageRef}/>
    )
}
