import {Renderer} from "@k8slens/extensions";
import {Scanner} from "../trivy_operator/types";

export class ExposedSecret {
    ruleID: string;
    title?: string;
    target: string;
    category: string;
    match: string;
    severity: string;

    constructor(params: ExposedSecret) {
        Object.entries(params).forEach(([key, value]) => {
            Object.assign(this, {[key]: value})
        });
    }

    getId() {
        return this.ruleID
    }

    getName() {
        return this.title
    }
}

export class ExposedSecretReport extends Renderer.K8sApi.KubeObject {
    static kind = "ExposedSecretReport"
    static namespaced = true
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/exposedsecretreports"

    report: ExposedSecretReportData;

    getImageRef(): string {
        const {artifact, registry} = this.report
        let imageId
        if (artifact.tag && artifact.digest) {
            imageId = ":" + artifact.tag + "@" + artifact.digest
        }
        if (artifact.tag && !artifact.digest) {
            imageId = ":" + artifact.tag
        }
        if (artifact.digest && !artifact.tag) {
            imageId = "@" + artifact.digest
        }

        return registry.server + "/" + artifact.repository + imageId
    };

}

export type ExposedSecretSummary = {
    criticalCount: number;
    highCount: number;
    lowCount: number;
    mediumCount: number;
    noneCount: number;
}

export type ExposedSecretReportData = {
    updateTimestamp: string;
    registry: {
        server: string;
    }
    artifact: {
        repository: string;
        tag?: string;
        digest?: string;
    }
    scanner: Scanner;
    summary: ExposedSecretSummary;
    secrets: ExposedSecret[];
}
