import "./details.scss";
import {Renderer} from "@k8slens/extensions";
import React from "react";
import {Check, InfraAssessmentReport} from "./types";
import {ChecksList} from "./checks-list";

const {
    Component: {
        KubeObjectMeta,
        DrawerItem,
        Badge,
    }
} = Renderer;


export interface InfraAssessmentReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<InfraAssessmentReport> {

    /*
     * Determines whether to display ObjectMeta section or not.
     * We want to display it in the generic InfraAssessmentReport view.
     * However, we want to hide it when we show InfraAssessmentRepor
     * in the Role InfraAssessmentReport details pane.
     */
    showObjectMeta?: boolean
}

export class InfraAssessmentReportDetails extends React.Component<InfraAssessmentReportDetailsProps> {

    render() {
        const {object: report} = this.props;
        const {report: {checks: items}} = report;

        const checks = items.map((check: Check) => new Check(check))

        if (!report) return null;
        const summary = report.report.summary;
        return (
            <div className="InfraAssessmentReportDetails">
                {this.props.showObjectMeta &&
                    <KubeObjectMeta
                        object={report}
                        hideFields={["uid", "resourceVersion", "selfLink"]}/>}
                <DrawerItem name="Summary" className="summary" labelsOnly>
                    <Badge className="Badge theme-critical"
                           label={report.report.summary.criticalCount}
                           tooltip="Critical"/>
                    <Badge className="Badge theme-high"
                           label={report.report.summary.highCount}
                           tooltip="High"/>
                    <Badge className="Badge theme-medium"
                           label={report.report.summary.mediumCount}
                           tooltip="Medium"/>
                    <Badge className="Badge theme-low"
                           label={report.report.summary.lowCount}
                           tooltip="Low"/>
                </DrawerItem>
                <ChecksList checks={checks}/>
            </div>
        )
    }
}
