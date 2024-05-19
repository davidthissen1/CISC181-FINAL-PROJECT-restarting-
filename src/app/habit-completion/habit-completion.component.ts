import {
    EzComponent,
    BindValue,
    BindValueToNumber,
    BindCheckedToBoolean,
    Change,
    ValueEvent,
    EventSubject,
} from "@gsilber/webez";
import html from "./habit-completion.component.html";
import css from "./habit-completion.component.css";

/**
 * HabitCompletionComponent represents a visual component for displaying the completion status of a specific habit.
 * @extends EzComponent
 */
export class HabitCompletionComponent extends EzComponent {
    @BindValue("specificTitle")
    private title: string;

    @BindValueToNumber("specificHours")
    private hours: number;

    @BindCheckedToBoolean("specific-checkbox")
    private completed: boolean;
    removeEvent: EventSubject<string> = new EventSubject<string>();

    private timesCompleted: number = 0;

    constructor(title: string, hours: number) {
        super(html, css);
        this.title = title;
        this.hours = hours;
        this.completed = false;
    }

    /**
     * Retrieves the title of the habit.
     * @returns The title of the habit.
     */
    getHabitTitle() {
        return this.title;
    }

    /**
     * Retrieves the number of hours dedicated to the habit.
     * @returns The number of hours.
     */

    getHabitHours() {
        return this.hours;
    }
    /**
     * Retrieves the completion status of the habit.
     * @returns The completion status as a boolean.
     */
    getCompletion(): boolean {
        return this.completed;
    }

    /**
     * Handles the change event for the checkbox, updating the completion status and times completed.
     * @param event - The value event triggered by the checkbox change.
     */
    @Change("specific-checkbox")
    oncheckboxchange(event: ValueEvent) {
        if (event.value === "on") {
            this.completed = true;
            this.timesCompleted++;
            console.log(this.timesCompleted);
        } else {
            this.completed = false;
            this.timesCompleted--;
            console.log(this.timesCompleted);
        }
    }
    /**
     * Marks the habit as completed.
     */
    habitCompleted() {
        this.completed = true;
    }
    /**
     * Marks the habit as not completed.
     */
    habitUnCompleted() {
        this.completed = false;
    }
    /**
     * Triggers the remove event for this habit.
     */
    removeHabit() {
        this.removeEvent.next(this.title);
    }
    /**
     * Retrieves the number of times the habit has been completed.
     * @returns The number of times completed.
     */
    getTimesCompleted() {
        return this.timesCompleted;
    }
}
