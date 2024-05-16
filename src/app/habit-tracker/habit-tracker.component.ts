import { EzComponent } from "@gsilber/webez";
import html from "./habit-tracker.component.html";
import css from "./habit-tracker.component.css";

export class HabitTrackerComponent extends EzComponent {
    constructor() {
        super(html, css);
    }
}
