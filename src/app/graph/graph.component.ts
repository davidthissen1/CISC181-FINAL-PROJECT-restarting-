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
    private width: number = 10;

    @BindValue("name")
    private habit: string;

    private onDelete: EventSubject<string> = new EventSubject<string>();

    constructor(habit: string) {
        super(html, css);
        this.habit = habit;
    }

    public increaseWidth(inc: number) {
        this.width += inc;
    }
}
