import {
    EzComponent,
    BindValue,
    BindValueToNumber,
    EventSubject,
    Click,
} from "@gsilber/webez";
import html from "./habit.component.html";
import css from "./habit.component.css";

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

    /*method to get habit title*/
    getHabitTitle() {
        return this.title;
    }

    /*method to get habit hours*/

    getHabitHours() {
        return this.hours;
    }

    @Click("specific-remove")
    removeHabit() {
        this.removeEvent.next(this.title);
    }
}
