import {Renderer} from "@k8slens/extensions";
import React from "react"
import {ClusterVulnerabilityReportPage, VulnerabilityReportPage} from "./src/vulnerabilityreports/page";
import {ClusterVulnerabilityReport, VulnerabilityReport} from "./src/vulnerabilityreports/types";
import {
    ClusterVulnerabilityReportDetails,
    ClusterVulnerabilityReportDetailsProps,
    VulnerabilityReportDetails,
    VulnerabilityReportDetailsProps
} from "./src/vulnerabilityreports/details";
import {TRIVY_OPERATOR_API_VERSION} from "./src/trivy_operator/constants";
import {ClusterConfigAuditReport, ConfigAuditReport} from "./src/configauditreports/types";
import {ClusterConfigAuditReportPage, ConfigAuditReportPage} from "./src/configauditreports/page";
import {
    ClusterConfigAuditReportDetails,
    ClusterConfigAuditReportDetailsProps,
    ConfigAuditReportDetails,
    ConfigAuditReportDetailsProps
} from "./src/configauditreports/details";
import {WorkloadConfigAuditReports} from "./src/workloads/configauditreports";
import {WorkloadVulnerabilityReports} from "./src/workloads/vulnerabilityreports";

export function CertificateIcon(props: Renderer.Component.IconProps) {
    return <Renderer.Component.Icon {...props} material="security"/>
}

export default class trivyOperatorExtension extends Renderer.LensExtension {

    clusterPages = [
        {
            id: "vulnerabilityreports",
            components: {
                Page: () => <VulnerabilityReportPage extension={this}/>,
            }
        },
        {
            id: "configauditreports",
            components: {
                Page: () => <ConfigAuditReportPage extension={this}/>,
            }
        }
    ]

    clusterPageMenus = [
        {
            id: "trivy-operator",
            title: "trivy-operator",
            components: {
                Icon: CertificateIcon
            }
        },
        {
            parentId: "trivy-operator",
            target: {pageId: "vulnerabilityreports"},
            title: "VulnerabilityReports",
            components: {
                Icon: CertificateIcon
            }
        },
        {
            parentId: "trivy-operator",
            target: {pageId: "configauditreports"},
            title: "ConfigAuditReports",
            components: {
                Icon: CertificateIcon
            }
        },
        {
            parentId: "trivy-operator",
            target: {pageId: "clustervulnerabilityreports"},
            title: "ClusterVulnerabilityReports",
            components: {
                Icon: CertificateIcon
            }
        },
        {
            parentId: "trivy-operator",
            target: {pageId: "clusterconfigauditreports"},
            title: "ClusterConfigAuditReports",
            components: {
                Icon: CertificateIcon
            }
        }
    ]

    kubeObjectDetailItems = [
        {
            kind: "Pod",
            apiVersions: ["v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <WorkloadConfigAuditReports {...props} />
                        <WorkloadVulnerabilityReports {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: "Deployment",
            apiVersions: ["apps/v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <WorkloadConfigAuditReports {...props} />
                        <WorkloadVulnerabilityReports {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: "DaemonSet",
            apiVersions: ["apps/v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <WorkloadConfigAuditReports {...props} />
                        <WorkloadVulnerabilityReports {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: "StatefulSet",
            apiVersions: ["apps/v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <WorkloadConfigAuditReports {...props} />
                        <WorkloadVulnerabilityReports {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: "ReplicaSet",
            apiVersions: ["apps/v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <WorkloadConfigAuditReports {...props} />
                        <WorkloadVulnerabilityReports {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: VulnerabilityReport.kind,
            apiVersions: [TRIVY_OPERATOR_API_VERSION],
            components: {
                Details: (props: VulnerabilityReportDetailsProps) => <VulnerabilityReportDetails
                    showObjectMeta={true} {...props} />
            }
        },
        {
            kind: ClusterVulnerabilityReport.kind,
            apiVersions: [TRIVY_OPERATOR_API_VERSION],
            components: {
                Details: (props: ClusterVulnerabilityReportDetailsProps) => <ClusterVulnerabilityReportDetails
                    showObjectMeta {...props} />
            }
        },
        {
            kind: ConfigAuditReport.kind,
            apiVersions: [TRIVY_OPERATOR_API_VERSION],
            components: {
                Details: (props: ConfigAuditReportDetailsProps) => <ConfigAuditReportDetails
                    showObjectMeta {...props} />
            }
        },
        {
            kind: ClusterConfigAuditReport.kind,
            apiVersions: [TRIVY_OPERATOR_API_VERSION],
            components: {
                Details: (props: ClusterConfigAuditReportDetailsProps) => <ClusterConfigAuditReportDetails
                    showObjectMeta {...props} />
            }
        },
    ]

}
