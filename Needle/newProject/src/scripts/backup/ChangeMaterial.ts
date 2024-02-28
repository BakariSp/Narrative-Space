import "@needle-tools/engine";
import { Behaviour, GameObject, Renderer, serializable, MeshRenderer } from "@needle-tools/engine";
// Import necessary classes from three.js
import { LineBasicMaterial, WireframeGeometry, LineSegments, Mesh } from "three";

export class ChangeMaterial extends Behaviour {

    @serializable(GameObject)
    my_gameobject?: GameObject;

    // Keep track of the wireframe state
    private wireframeAdded = false;
    private wireframe?: LineSegments;

    changeMaterial() {
        const myobj = this.my_gameobject;
        console.log(myobj);
        if (myobj) {
            const renderer = myobj.getComponent(MeshRenderer);
            const mesh = renderer?.gameObject;
            console.log(renderer)
            if (mesh && !this.wireframeAdded) {
                // Convert the existing geometry to a wireframe geometry
                const wireframeGeometry = new WireframeGeometry(mesh.geometry___needle);
                // Create a LineBasicMaterial with white color
                const wireframeMaterial = new LineBasicMaterial({color: 0xffffff});
                // Create a line segments object to display the wireframe
                this.wireframe = new LineSegments(wireframeGeometry, wireframeMaterial);
                
                // Add the wireframe to the GameObject
                myobj.add(this.wireframe);
                this.wireframeAdded = true;
            }


            // Toggle the renderer instead of the entire GameObject
            if(renderer && this.wireframe) {
                renderer.enabled = !renderer.enabled;
                this.wireframe.visible = !renderer.__isEnabled;
            }
            
            // Optionally, toggle the wireframe's visibility if you want to switch

        }
    }
}
