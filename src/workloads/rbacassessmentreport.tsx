import React from "react";
import {Renderer} from "@k8slens/extensions";
import {store} from "../configauditreports/store";
import {RbacAssessmentReportDetails} from "../rbacassessmentreports/details";

/*
 * This component is trying to lookup the ConfigAuditReport associated with the
 * specified Kubernetes workload and then render it.
 */
export class WorkloadRbacAssessmentReports extends React.Component<Renderer.Component.KubeObjectDetailsProps> {

    render() {
        const {object: workload} = this.props;

        const selector = [
            "trivy-operator.resource.kind=" + workload.kind,
            "trivy-operator.resource.name=" + workload.getName(),
            "trivy-operator.resource.namespace=" + workload.getNs()
        ];

        const rbacAssessmentReport = store.getByLabel(selector)

        return (
            <div>
                <Renderer.Component.DrawerTitle title="RbacAssessmentReport"/>
                {rbacAssessmentReport.length == 0 && <div>N/A</div>}
                {
                    rbacAssessmentReport.map((report) => {
                        return (
                            <RbacAssessmentReportDetails object={report}/>
                        );
                    })
                }
            </div>
        )
    }

}


/*
 * This component is trying to lookup the ConfigAuditReport associated with the
 * specified Kubernetes workload and then render it.
 */
export class WorkloadClusterRbacAssessmentReports extends React.Component<Renderer.Component.KubeObjectDetailsProps> {

    render() {
        const {object: workload} = this.props;

        const selector = [
            "trivy-operator.resource.kind=" + workload.kind,
            "trivy-operator.resource.name=" + workload.getName(),
            "trivy-operator.resource.namespace=" + workload.getNs()
        ];

        const rbacAssessmentReport = store.getByLabel(selector)

        return (
            <div>
                <Renderer.Component.DrawerTitle title="RbacAssessmentReport"/>
                {rbacAssessmentReport.length == 0 && <div>N/A</div>}
                {
                    rbacAssessmentReport.map((report) => {
                        return (
                            <RbacAssessmentReportDetails object={report}/>
                        );
                    })
                }
            </div>
        )
    }

}
