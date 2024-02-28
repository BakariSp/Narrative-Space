import "@needle-tools/engine";
import { Behaviour, GameObject, Renderer, serializable, MeshRenderer } from "@needle-tools/engine";
// Import necessary classes from three.js
import { LineBasicMaterial, WireframeGeometry, LineSegments, Mesh, Object3D } from "three";

export class ChangeAllMaterial extends Behaviour {

    @serializable(GameObject)
    my_gameobject?: GameObject;

    private wireframeEnable = false;
    private materialEnable = true;
    private wireframeMaterial = new LineBasicMaterial({color: 0xffffff});

    changeMaterial() {
        const myobj = this.my_gameobject;
        if (myobj) {
            this.processChildren(myobj);
        }
    }

    private processChildren(obj: GameObject) {
        obj.children.forEach(child => {
            // Modify the renderer as needed, for example, toggle visibility
            const renderer = child.getComponent(MeshRenderer);
            if (renderer) {
                renderer.enabled = this.materialEnable;
            }

            // Check and add wireframe if not added yet and wireframe is enabled
            if (child instanceof Mesh && !child.userData.wireframe) {
                const wireframeGeometry = new WireframeGeometry(child.geometry___needle);
                const wireframe = new LineSegments(wireframeGeometry, this.wireframeMaterial);
                child.add(wireframe);
                child.userData.wireframe = wireframe; // Store wireframe for later reference
            }

            if (child.userData.wireframe) {
                child.userData.wireframe.visible = this.wireframeEnable;
            }

            // Recursively process the children of the current child
            if (child.children && child.children.length > 0) {
                this.processChildren(child);
            }
        });
    }

    toggleWireframe() {
        // Toggle wireframe visibility
        this.wireframeEnable = !this.wireframeEnable;
        // Ensure material visibility is the inverse of wireframe visibility
        this.materialEnable = !this.wireframeEnable;

        // Apply changes to the object and its children
        if (this.my_gameobject) {
            this.processChildren(this.my_gameobject);
        }
    }
}
