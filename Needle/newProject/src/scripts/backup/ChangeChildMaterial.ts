import "@needle-tools/engine";
import { Behaviour, GameObject, Renderer, serializable, MeshRenderer } from "@needle-tools/engine";
// Import necessary classes from three.js
import { LineBasicMaterial, WireframeGeometry, LineSegments, Mesh, Object3D } from "three";

export class ChangeChildMaterial extends Behaviour {

    @serializable(GameObject)
    my_gameobject?: GameObject;

    // @serializable(Object3D)
    // my_gameobject?:Object3D;

    // Keep track of the wireframe state
    private wireframeAdded = false;
    private wireframe?: LineSegments;
    private rendererEnabled = true;
    private wireframeMaterial = new LineBasicMaterial({color: 0xffffff});

    changeMaterial() {
        const myobj = this.my_gameobject;
        console.log(myobj);
        if (myobj) {
            myobj.children.forEach(child => {
              const renderer = child.getComponent(MeshRenderer);
              const mesh = child;
              if (!this.wireframeAdded && mesh) {
                const wireframeGeometry = new WireframeGeometry(mesh.geometry___needle);
                const wireframe = new LineSegments(wireframeGeometry, this.wireframeMaterial);

                child.add(wireframe);
              }

              if (renderer && child.children) {
                renderer.enabled = !renderer.enabled;
                child.children.visible = !renderer.__isEnabled;
              }
            })

            this.wireframeAdded = true;
            
            

            // // Toggle the renderer instead of the entire GameObject
            // if(renderer && this.wireframe) {
            //     renderer.enabled = !renderer.enabled;
            //     this.wireframe.visible = !renderer.__isEnabled;
            // }
            
            // Optionally, toggle the wireframe's visibility if you want to switch

        }
    }
}
