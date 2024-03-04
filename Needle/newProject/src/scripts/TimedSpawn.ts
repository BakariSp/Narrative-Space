import { Behaviour, GameObject, LogType, serializeable, showBalloonMessage, WaitForSeconds} from "@needle-tools/engine";
import { Vector3 } from "three";

export class TimedSpawn extends Behaviour {
    @serializeable(GameObject)
    objects?: GameObject[] = [];

    interval: number = 1000;
    max: number = 100;

    private spawned: number = 0;

    // New properties for random movement
    moveRange: number = 5; // Maximum distance the object can move from its original position
    rotationRange: number = 360; // Maximum rotation angle in degrees

    start(): void {
        console.log("time started");
        if (this.objects == null) {
            console.warn("TimedSpawnWithRandomSelection: no objects to spawn");
            showBalloonMessage("TimedSpawnWithRandomSelection: no objects to spawn", LogType.Warn);
            return;
        }

        this.objects.forEach(object => GameObject.setActive(object, false));
        this.startCoroutine(this.spawn())
    }

    awake() {
        if (!this.objects) {
            console.warn("TimedSpawnWithRandomMovement: no object to spawn");
            showBalloonMessage("TimedSpawnWithRandomMovement: no object to spawn", LogType.Warn);
            return;
        }
        this.objects.forEach(object => GameObject.setActive(object, false));
        this.startCoroutine(this.spawn())
    }

    *spawn() {
        while (this.spawned < this.max) {
            // Randomly select an object from the array
            const randomIndex = Math.floor(Math.random() * this.objects.length);
            const selectedObject = this.objects[randomIndex];

            if (!selectedObject) return;

            const instance = GameObject.instantiate(selectedObject);
            GameObject.setActive(instance!, true);

            // Apply random movement and rotation
            this.applyRandomMovement(instance);
            this.applyRandomRotation(instance);

            this.spawned += 1;
            yield WaitForSeconds(this.interval / 1000);
        }
    }

    private applyRandomMovement(instance: GameObject) {
        const randomX = Math.random() * this.moveRange * 2 - this.moveRange;
        const randomY = Math.random() * this.moveRange * 2 - this.moveRange;
        const randomZ = Math.random() * this.moveRange * 2 - this.moveRange;
        instance.worldPosition = instance.transform.position.add(new Vector3(randomX, randomY, randomZ));
    }

    private applyRandomRotation(instance: GameObject) {
        instance.rotateY(Math.random() * this.rotationRange)
    }
}
