import {Renderer} from "@k8slens/extensions";
import React from "react";
import {store} from "../exposedsecretreports/store";
import {ExposedSecretReportDetails} from "../exposedsecretreports/details";
import {ExposedSecretReport} from "../exposedsecretreports/types";

// This component is trying to lookup the exposedsecretreports associated with the
// specified Kubernetes workload and then render those reports.
export class WorkloadExposedSecretReports extends React.Component<Renderer.Component.KubeObjectDetailsProps> {

    render() {
        const {object: workload} = this.props;

        const selector = [
            "trivy-operator.resource.kind=" + workload.kind,
            "trivy-operator.resource.name=" + workload.getName(),
            "trivy-operator.resource.namespace=" + workload.getNs()
        ];

        const exposedSecretReports = store.getByLabel(selector)

        return (
            <div>
                <Renderer.Component.DrawerTitle title="ExposedSecretReports"/>
                {exposedSecretReports.length == 0 && <div>N/A</div>}
                {
                    exposedSecretReports.map((report: ExposedSecretReport) => {
                        return (
                            <ExposedSecretReportDetails object={report}/>
                        );
                    })
                }
            </div>
        )
    }
}
