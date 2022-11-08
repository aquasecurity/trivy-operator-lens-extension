import { Renderer } from "@k8slens/extensions";
import React from "react";
import { store } from "./store";
import {InfraAssessmentReport } from "./types";

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
    scanner = "scanner"
}

export class InfraAssessmentReportPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <KubeObjectListLayout
                tableId="InfraAssessmentReportsTable"
                className="InfraAssessmentReport" store={store}
                sortingCallbacks={{
                    [sortBy.name]: (report: InfraAssessmentReport) => report.getName(),
                    [sortBy.namespace]: (report: InfraAssessmentReport) => report.metadata.namespace,
                    [sortBy.critical]: (report: InfraAssessmentReport) => report.report.summary.criticalCount,
                    [sortBy.high]: (report: InfraAssessmentReport) => report.report.summary.highCount,
                    [sortBy.medium]: (report: InfraAssessmentReport) => report.report.summary.mediumCount,
                    [sortBy.low]: (report: InfraAssessmentReport) => report.report.summary.lowCount,
                    [sortBy.scanner]: (report: InfraAssessmentReport) => report.report.scanner.name + " " + report.report.scanner.version,
                }}
                searchFilters={[
                    (report: InfraAssessmentReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ConfigAuditReports"
                renderTableHeader={[
                    { title: "Name", sortBy: sortBy.name },
                    { title: "Namespace", sortBy: sortBy.namespace },
                    { title: "Critical", sortBy: sortBy.critical },
                    { title: "High", sortBy: sortBy.high },
                    { title: "Medium", sortBy: sortBy.medium },
                    { title: "Low", sortBy: sortBy.low },
                    { title: "Scanner", sortBy: sortBy.scanner },

                ]}
                renderTableContents={(report: InfraAssessmentReport) => [
                    <Badge flat expandable={false} key="name" label={report.getName()}
                        tooltip={report.getName()} />,
                    report.metadata.namespace,
                    report.report.summary.criticalCount,
                    report.report.summary.highCount,
                    report.report.summary.mediumCount,
                    report.report.summary.lowCount,
                    report.report.scanner.name + " " + report.report.scanner.version,
                ]}
            />
        )
    }
}
