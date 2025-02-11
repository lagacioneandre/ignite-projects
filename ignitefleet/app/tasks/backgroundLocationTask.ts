import * as TaskManager from 'expo-task-manager';
import { startLocationUpdatesAsync, Accuracy, hasStartedLocationUpdatesAsync, stopLocationUpdatesAsync } from 'expo-location';

export const BACKGROUND_TASK_NAME = 'location-tracking';

TaskManager.defineTask(BACKGROUND_TASK_NAME, ({ data, error}: any) => {
    try {
        if (error) throw (error);
        const { coords, timestamp } = data.locations[0];
        const currentLocation = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            timestamp,
        };
    } catch (error) {
        console.log(error);
    }
});

export async function startLocatioTask() {
    try {
        const hasStarted = await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME);
        if (hasStarted) await stopLocationTask();
        await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
            accuracy: Accuracy.Highest,
            distanceInterval: 1,
            timeInterval: 1000,
        });
    } catch (error) {
        console.log(error);
    }
}

export async function stopLocationTask() {
    try {
        const hasStarted = await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME);
        if (hasStarted) await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME);
    } catch (error) {
        console.log(error);
    }
}
