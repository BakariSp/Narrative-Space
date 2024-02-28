import "@needle-tools/engine";
import { Behaviour, InputEvents, serializable, EventList } from "@needle-tools/engine";

export class EventsManager extends Behaviour
{
    @serializable(EventList)
    applyPointsMaterialEvent? : EventList;

    @serializable(EventList)
    applyWireframeMaterialEvent? : EventList;

    @serializable(EventList)
    changeMaterialEvent? : EventList;

    @serializable(EventList)
    changeCameraEvent? : EventList;

    // update(){
        
        
    //     if(this.context.input.getKeyPressed()){
    //       var value = this.context.input.getKeyPressed()
    //       console.log(this.context.input)
    //     }
    // }

    applyPointsMaterial() {
      this.applyPointsMaterialEvent?.invoke();
    }

    applyWireframeMaterial() {
      this.applyWireframeMaterialEvent?.invoke();
    }

    changeMaterial() {
      this.changeMaterialEvent?.invoke();
    }

    changeCamera() {
      this.changeCameraEvent?.invoke();
    }
}