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
    /**
     * The HabitTrackerComponent instance
     */

    private habitTracker: HabitTrackerComponent;
    constructor() {
        super(html, css);

        this.habitTracker = new HabitTrackerComponent();
        this.addComponent(this.habitTracker, "habit-tracker");
    }
}
