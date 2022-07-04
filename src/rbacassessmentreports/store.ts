import {Renderer} from "@k8slens/extensions";
import {ClusterRbacAssessmentReport, RbacAssessmentReport} from "./types";

export class ClusterApi extends Renderer.K8sApi.KubeApi<ClusterRbacAssessmentReport> {
}

export class Api extends Renderer.K8sApi.KubeApi<RbacAssessmentReport> {
}

export class ClusterStore extends Renderer.K8sApi.KubeObjectStore<ClusterRbacAssessmentReport> {
    api = new ClusterApi({
        objectConstructor: ClusterRbacAssessmentReport
    })
}

export class Store extends Renderer.K8sApi.KubeObjectStore<RbacAssessmentReport> {
    api = new Api({
        objectConstructor: RbacAssessmentReport
    })
}

export const clusterStore = new ClusterStore()
export const store = new Store();

Renderer.K8sApi.apiManager.registerStore(clusterStore);
Renderer.K8sApi.apiManager.registerStore(store);
