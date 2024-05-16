import html from "./main.component.html";
import css from "./main.component.css";
import { EzComponent } from "@gsilber/webez";
import { HabitTrackerComponent } from "./habit-tracker/habit-tracker.component";
/**
 * @description MainComponent is the main component of the app
 * @extends EzComponent
 *
 */
export class MainComponent extends EzComponent {
    private habitTracker: HabitTrackerComponent;
    constructor() {
        super(html, css);
    }
}
