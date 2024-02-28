import "@needle-tools/engine";
import { Behaviour, serializable, Camera, GameObject, LookAtConstraint, OrbitControls } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";

export class ChangeCameraPosition extends Behaviour {

  @serializable(Camera)
  my_camera?: Camera;

  @serializable(GameObject)
  camera_target?: GameObject;

  @serializable(GameObject)
  new_target?: GameObject[];

  private objectIndex = 1;

  // @serializable(Ma)

  private newPos = new Vector3(0, 2, -10);
  private oldPos = new Vector3(0, 2, 2.5);

  
  start () {
    console.log(this.scene);

    if (this.camera_target) {
      console.log(this.camera_target.worldPosition);
    }
    
  }

  changePosition () {
    // if (this.my_camera) {
    //   // console.log(this.my_camera);

    //   // Example: Setting the camera position to x=0, y=2, z=5
    //   this.my_camera.gameObject.worldPosition = this.newPos;
    // }

    if (this.my_camera && this.camera_target && this.new_target) {
      // this.camera_target.worldPosition = this.newTarget;
      // console.log(this.new_target)

      const orbit = this.my_camera?.gameObject.getComponent(OrbitControls);
      console.log(orbit);
      // orbit?.worldRotation.EnableRotate = true;

      const sceneObject = this.new_target[this.objectIndex];
      for (var i = 0; i < this.new_target.length; i++) {
        this.new_target[i].activeSelf = false;
      }
      sceneObject.activeSelf = true;
      orbit?.setLookTargetPosition(this.new_target[this.objectIndex])

      if (this.new_target[this.objectIndex].name == 'scene4') {
        console.log(this.new_target[this.objectIndex])
        this.my_camera.gameObject.worldPosition = this.newPos;
      } else {
        this.my_camera.gameObject.worldPosition = this.oldPos;
      }
      
      this.objectIndex ++;

      if (this.objectIndex >= this.new_target.length) {
        this.objectIndex = this.objectIndex % this.new_target.length;
      }
    }
  }
  
}