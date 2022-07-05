import {Renderer} from "@k8slens/extensions";
import React from "react";
import {clusterStore, store} from "./store";
import {ClusterRbacAssessmentReport, RbacAssessmentReport} from "./types";

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

export class ClusterRbacAssessmentReportPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <KubeObjectListLayout
                tableId="ClusterConfigAuditReportsTable"
                className="ConfigAuditReports" store={clusterStore}
                sortingCallbacks={{
                    [sortBy.name]: (report: ClusterRbacAssessmentReport) => report.getName(),
                    [sortBy.critical]: (report: ClusterRbacAssessmentReport) => report.report.summary.criticalCount,
                    [sortBy.high]: (report: ClusterRbacAssessmentReport) => report.report.summary.highCount,
                    [sortBy.medium]: (report: ClusterRbacAssessmentReport) => report.report.summary.mediumCount,
                    [sortBy.low]: (report: ClusterRbacAssessmentReport) => report.report.summary.lowCount,
                    [sortBy.scanner]: (report: ClusterRbacAssessmentReport) => report.report.scanner.name + " " + report.report.scanner.version,
                }}
                searchFilters={[
                    (report: ClusterRbacAssessmentReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ClusterConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Critical", sortBy: sortBy.critical},
                    {title: "High", sortBy: sortBy.high},
                    {title: "Medium", sortBy: sortBy.medium},
                    {title: "Low", sortBy: sortBy.low},
                    {title: "Scanner", sortBy: sortBy.scanner},
                ]}
                renderTableContents={(report: ClusterRbacAssessmentReport) => [
                    <Badge flat expandable={false} key="name" label={report.getName()}
                           tooltip={report.getName()}/>,
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

export class RbacAssessmentReportPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <KubeObjectListLayout
                tableId="RbacAssessmentReportsTable"
                className="RbacAssessmentReport" store={store}
                sortingCallbacks={{
                    [sortBy.name]: (report: RbacAssessmentReport) => report.getName(),
                    [sortBy.namespace]: (report: RbacAssessmentReport) => report.metadata.namespace,
                    [sortBy.critical]: (report: RbacAssessmentReport) => report.report.summary.criticalCount,
                    [sortBy.high]: (report: RbacAssessmentReport) => report.report.summary.highCount,
                    [sortBy.medium]: (report: RbacAssessmentReport) => report.report.summary.mediumCount,
                    [sortBy.low]: (report: RbacAssessmentReport) => report.report.summary.lowCount,
                    [sortBy.scanner]: (report: RbacAssessmentReport) => report.report.scanner.name + " " + report.report.scanner.version,
                }}
                searchFilters={[
                    (report: RbacAssessmentReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Namespace", sortBy: sortBy.namespace},
                    {title: "Critical", sortBy: sortBy.critical},
                    {title: "High", sortBy: sortBy.high},
                    {title: "Medium", sortBy: sortBy.medium},
                    {title: "Low", sortBy: sortBy.low},
                    {title: "Scanner", sortBy: sortBy.scanner},

                ]}
                renderTableContents={(report: RbacAssessmentReport) => [
                    <Badge flat expandable={false} key="name" label={report.getName()}
                           tooltip={report.getName()}/>,
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
