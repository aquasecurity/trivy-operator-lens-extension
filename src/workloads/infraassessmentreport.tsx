import React from "react";
import {Renderer} from "@k8slens/extensions";
import {store} from "../configauditreports/store";
import {InfraAssessmentReportDetails} from "../infraassessmentreports/details";

/*
 * This component is trying to lookup the ConfigAuditReport associated with the
 * specified Kubernetes workload and then render it.
 */
export class WorkloadInfraAssessmentReports extends React.Component<Renderer.Component.KubeObjectDetailsProps> {

    render() {
        const {object: workload} = this.props;

        const selector = [
            "trivy-operator.resource.kind=" + workload.kind,
            "trivy-operator.resource.name=" + workload.getName(),
            "trivy-operator.resource.namespace=" + workload.getNs()
        ];

        const infraAssessmentReport = store.getByLabel(selector)

        return (
            <div>
                <Renderer.Component.DrawerTitle title="InfraAssessmentReport"/>
                {infraAssessmentReport.length == 0 && <div>N/A</div>}
                {
                    infraAssessmentReport.map((report) => {
                        return (
                            <InfraAssessmentReportDetails object={report}/>
                        );
                    })
                }
            </div>
        )
    }

}

