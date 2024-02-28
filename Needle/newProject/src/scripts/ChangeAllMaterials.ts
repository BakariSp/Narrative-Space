import "@needle-tools/engine";
import { Behaviour, GameObject, Renderer, serializable, MeshRenderer } from "@needle-tools/engine";
// Import necessary classes from three.js
import { LineBasicMaterial, WireframeGeometry, LineSegments, Mesh, Object3D, PointsMaterial, Points } from "three";
import { KeyPressHandler } from "./KeyPressHandler";
import { EventsManager } from "./EventsManager";

export class ChangeAllMaterial extends Behaviour {

    @serializable(GameObject)
    my_gameobject?: GameObject;

    private eventsManager = EventsManager;

    private wireframeEnable = false;
    private materialEnable = true;
    private displayPoints = false; // New flag for point display toggle

    private wireframeMaterial = new LineBasicMaterial({ color: 0xffffff });
    private pointsMaterial = new PointsMaterial({ color: 0xffffff, size: 0.01 }); // Customize the color and size as needed

    

    private processChildren(obj: GameObject) {
        obj.children.forEach(child => {
            const renderer = child.getComponent(MeshRenderer);
            if (renderer) {
                renderer.enabled = this.materialEnable;
            }

            // Handle wireframe
            if (this.wireframeEnable && child instanceof Mesh && !child.userData.wireframe) {
                const wireframeGeometry = new WireframeGeometry(child.geometry___needle);
                const wireframe = new LineSegments(wireframeGeometry, this.wireframeMaterial);
                child.add(wireframe);
                child.userData.wireframe = wireframe; // Store wireframe for later reference
            }

            if (child.userData.wireframe) {
                child.userData.wireframe.visible = this.wireframeEnable;
            }

            // Handle points display
            if (this.displayPoints && child instanceof Mesh && !child.userData.points) {
                const points = new Points(child.geometry___needle, this.pointsMaterial);
                child.add(points);
                child.userData.points = points; // Store points for later reference
            }

            if (child.userData.points) {
                child.userData.points.visible = this.displayPoints;
            }

            // Recursively process children
            if (child.children && child.children.length > 0) {
                this.processChildren(child);
            }
        });
    }

    changeMaterial() {
        this.wireframeEnable = false;
        this.materialEnable = true;
        this.displayPoints = false;

        const myobj = this.my_gameobject;
        if (myobj) {
            this.processChildren(myobj);
        }
    }

    toggleWireframe() {
        this.wireframeEnable = true;
        this.materialEnable = false;
        this.displayPoints = false; // Update logic to consider points display

        if (this.my_gameobject) {
            this.processChildren(this.my_gameobject);
        }
    }

    togglePointsDisplay() {
        this.wireframeEnable = false;
        this.materialEnable = false;
        this.displayPoints = true;

        if (this.my_gameobject) {
            this.processChildren(this.my_gameobject);
        }
    }
}
