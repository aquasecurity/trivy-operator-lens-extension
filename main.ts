import { Main } from "@k8slens/extensions";

export default class TrivyOperatorExtensionMain extends Main.LensExtension {
  onActivate() {
    console.log('trivy-operator extension activated');
  }

  onDeactivate() {
    console.log('trivy-operator extension de-activated');
  }
}
