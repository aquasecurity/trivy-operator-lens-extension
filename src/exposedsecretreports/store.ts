import {Renderer} from "@k8slens/extensions";
import {ExposedSecretReport} from "./types";

export class Api extends Renderer.K8sApi.KubeApi<ExposedSecretReport> {
}

export class Store extends Renderer.K8sApi.KubeObjectStore<ExposedSecretReport> {
    api = new Api({
        objectConstructor: ExposedSecretReport
    })
}

export const store = new Store();

Renderer.K8sApi.apiManager.registerStore(store);