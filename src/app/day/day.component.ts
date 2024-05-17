import { EzComponent } from "@gsilber/webez";
import html from "./day.component.html";
import css from "./day.component.css";
import { HabitCompletionComponent } from "../habit-completion/habit-completion.component";

export class DayComponent extends EzComponent {
    private date: string;
    private todaysHabits: HabitCompletionComponent[] = [];

    constructor(date: string) {
        super(html, css);
        this.date = date;
    }

    addHabit(habit: HabitCompletionComponent) {
        this.todaysHabits.push(habit);
    }

    getTodaysHabits() {
        return this.todaysHabits;
    }

    getDate() {
        return this.date;
    }
}
