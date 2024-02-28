import { Behaviour, serializable } from "@needle-tools/engine"
import { ChangeAllMaterial } from "./ChangeAllMaterials"; 
import { KeyPressHandler } from "./KeyPressHandler";
import { EventsManager } from "./EventsManager";

export class SceneInitializer extends Behaviour {

    @serializable(EventsManager)
    events?: EventsManager;

    start() {
      console.log(this.scene)
      const changeAllMaterialInstance = new ChangeAllMaterial();
      if (this.events) {
        const keyPressHandler = new KeyPressHandler(changeAllMaterialInstance, this.events);
      }
      
    }
}