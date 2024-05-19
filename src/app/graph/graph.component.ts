import {
    EzComponent,
    BindStyleToNumberAppendPx,
    BindValue,
    EventSubject,
} from "@gsilber/webez";
import html from "./graph.component.html";
import css from "./graph.component.css";

/**
 * GraphComponent represents a visual component for displaying a habit's progress.
 * @extends EzComponent
 */
export class GraphComponent extends EzComponent {
    @BindStyleToNumberAppendPx("bar", "width")
    private width: number = 0;

    @BindValue("name")
    private habit: string;

    private timesCompleted: number = 0;

    removeEvent: EventSubject<string> = new EventSubject<string>();
    constructor(habit: string) {
        super(html, css);
        this.habit = habit;
    }

    /**
     * Updates the width of the progress bar based on timesCompleted.
     */

    increaseWidth() {
        this.width = this.timesCompleted * 10;
    }
    /**
     * Retrieves the title of the graph.
     * @returns The name of the habit.
     */
    getGraphTitle() {
        return this.habit;
    }
    /**
     * Retrieves the number of times the habit has been completed.
     * @returns The number of times completed.
     */
    getTimesCompleted() {
        return this.timesCompleted;
    }
    /**
     * Sets the number of times the habit has been completed.
     * @param times - The number of times to set.
     */
    setTimesCompleted(times: number) {
        this.timesCompleted = times;
    }
    /**
     * Increases the number of times the habit has been completed by one.
     */
    addCompletion() {
        this.timesCompleted++;
    }
    /**
     * Decreases the number of times the habit has been completed by one.
     */
    removeCompletion() {
        this.timesCompleted--;
    }
}
