import {
    EzComponent,
    BindStyleToNumberAppendPx,
    BindValue,
    EventSubject,
} from "@gsilber/webez";
import html from "./graph.component.html";
import css from "./graph.component.css";

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

    increaseWidth() {
        this.width = this.timesCompleted * 10;
    }

    getGraphTitle() {
        return this.habit;
    }

    getTimesCompleted() {
        return this.timesCompleted;
    }

    setTimesCompleted(times: number) {
        this.timesCompleted = times;
    }

    addCompletion() {
        this.timesCompleted++;
    }
    removeCompletion() {
        this.timesCompleted--;
    }
}
