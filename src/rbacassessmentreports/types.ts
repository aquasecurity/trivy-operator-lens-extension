import {Renderer} from "@k8slens/extensions";
import {Scanner} from "../trivy_operator/types";

export type Summary = {
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
}

export class Check {
    checkID: string;
    title: string;
    description: string;
    message?: string;
    success: boolean;
    severity: string;
    category: string;

    constructor(params: Check) {
        Object.entries(params).forEach(([key, value]) => {
            Object.assign(this, {[key]: value})
        });
    }

    getId() {
        return this.checkID
    }
}

export type ConfigAuditReportData = {
    updateTimestamp: string;
    scanner: Scanner
    summary: Summary
    checks: Check[]
}

export class ClusterRbacAssessmentReport extends Renderer.K8sApi.KubeObject {
    static kind = "ClusterRbacAssessmentReport"
    static namespaced = false
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/clusterrbacassessmentreports"

    report: ConfigAuditReportData

}

export class RbacAssessmentReport extends Renderer.K8sApi.KubeObject {
    static kind = "RbacAssessmentReport"
    static namespaced = true
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/rbacassessmentreports"

    report: ConfigAuditReportData
}
