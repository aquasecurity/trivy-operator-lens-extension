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

export type InfraAssessmentReportData = {
    updateTimestamp: string;
    scanner: Scanner
    summary: Summary
    checks: Check[]
}

export class InfraAssessmentReport extends Renderer.K8sApi.KubeObject {
    static kind = "InfraAssessmentReport"
    static namespaced = true
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/infraassessmentreports"

    report: InfraAssessmentReportData
}
