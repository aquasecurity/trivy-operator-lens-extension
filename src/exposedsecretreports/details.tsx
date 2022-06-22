import "./details.scss"
import {Renderer} from "@k8slens/extensions";
import React from "react";
import {ExposedSecret, ExposedSecretReport} from "./types";
import {ExposedSecretsList} from "./list";

const {
    Component: {
        KubeObjectMeta,
        DrawerItem,
        Badge,
    }
} = Renderer;

export interface ExposedSecretReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<ExposedSecretReport> {

    /*
     * Determines whether to display ObjectMeta section or not.
     * We want to display it in the generic ExposedSecretsListReport view.
     * However, we want to hide it when we list ExposedSecretReports
     * in the WorkloadExposedSecrets details pane.
     */
    showObjectMeta?: boolean
}

export class ExposedSecretReportDetails extends React.Component<ExposedSecretReportDetailsProps> {

    render() {
        const {object: report} = this.props;
        const {report: {secrets: items}} = report;

        const exposedsecrets = items.map((exposedsecret) => new ExposedSecret(exposedsecret))
        if (!report) {
            return null;
        }
        return (
            <div className="ExposedSecretReportDetails">
                {this.props.showObjectMeta &&
                    <KubeObjectMeta object={report}
                                    hideFields={["uid", "resourceVersion", "selfLink"]}/>}

                <DrawerItem name="Container">
                    {report.metadata.labels['trivy-operator.container.name']}
                </DrawerItem>
                <DrawerItem name="Image">
                    {report.getImageRef()}
                </DrawerItem>

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
                <ExposedSecretsList exposedsecrets={exposedsecrets}/>
            </div>
        )
    }
}
