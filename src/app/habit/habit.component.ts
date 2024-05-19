import {
    EzComponent,
    BindValue,
    BindValueToNumber,
    EventSubject,
    Click,
} from "@gsilber/webez";
import html from "./habit.component.html";
import css from "./habit.component.css";
/**
 * HabitComponent represents a visual component for displaying a specific habit and its attributes.
 * @extends EzComponent
 */
export class HabitComponent extends EzComponent {
    @BindValue("specificTitle")
    private title: string;

    @BindValueToNumber("specificHours")
    private hours: number;

    removeEvent: EventSubject<string> = new EventSubject<string>();
    constructor(title: string, hours: number) {
        super(html, css);

        this.title = title;
        this.hours = hours;
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
     * Removes the habit and triggers the remove event.
     */
    @Click("specific-remove")
    removeHabit() {
        this.removeEvent.next(this.title);
    }
}
