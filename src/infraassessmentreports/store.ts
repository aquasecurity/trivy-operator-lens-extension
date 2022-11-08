import { Renderer } from "@k8slens/extensions";
import { InfraAssessmentReport } from "./types";


export class Api extends Renderer.K8sApi.KubeApi<InfraAssessmentReport> {
}

export class Store extends Renderer.K8sApi.KubeObjectStore<InfraAssessmentReport> {
    api = new Api({
        objectConstructor: InfraAssessmentReport
    })
}

export const store = new Store();
Renderer.K8sApi.apiManager.registerStore(store);
