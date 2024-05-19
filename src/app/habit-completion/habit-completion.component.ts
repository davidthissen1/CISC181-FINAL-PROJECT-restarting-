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

    /*method to get habit title*/
    getHabitTitle() {
        return this.title;
    }

    /*method to get habit hours*/

    getHabitHours() {
        return this.hours;
    }

    getCompletion(): boolean {
        return this.completed;
    }

    /*attempting to make checkboxes turn off*/
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

    habitCompleted() {
        this.completed = true;
    }
    habitUnCompleted() {
        this.completed = false;
    }

    removeHabit() {
        this.removeEvent.next(this.title);
    }

    getTimesCompleted() {
        return this.timesCompleted;
    }
}
