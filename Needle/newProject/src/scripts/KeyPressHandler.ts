import { ChangeAllMaterial } from "./ChangeAllMaterials.js"; // Adjust the import path as necessary
import { EventsManager } from "./EventsManager.js";




class KeyPressHandler {
    private changeAllMaterialInstance: ChangeAllMaterial;
    private eventsManager: EventsManager;
    // private eventsManager: EventsManager;


    constructor(changeAllMaterialInstance: ChangeAllMaterial, eventsManager: EventsManager) {
        this.changeAllMaterialInstance = changeAllMaterialInstance;
        this.eventsManager = eventsManager;
        this.initializeKeyPressEvents();
    }

    private initializeKeyPressEvents(): void {
        window.addEventListener('keydown', (event: KeyboardEvent) => this.handleKeyPress(event));
    }

    private handleKeyPress(event: KeyboardEvent): void {
        switch (event.key) {
            case '1': case '5':
                // Call changeMaterial function
                this.eventsManager.applyPointsMaterial();
                console.log('Material changed');
                break;
            case '2': case '4':
                // Toggle wireframe visibility
                this.eventsManager.applyWireframeMaterial();
                console.log('Wireframe toggled');
                break;
            case '3': case '8':
                // Toggle points display
                this.eventsManager.changeMaterial();
                console.log('Points display toggled');
                break;
            case '0': case '7': case '9': case '6':
                this.eventsManager.changeCamera();
                console.log('camera changed');

            default:
                // Key not associated with a function
                console.log('Key pressed does not correspond to a defined action.');
                break;
        }
    }
}

export { KeyPressHandler };
