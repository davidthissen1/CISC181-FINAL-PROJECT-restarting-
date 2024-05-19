import { EzComponent } from "@gsilber/webez";
import html from "./day.component.html";
import css from "./day.component.css";
import { HabitCompletionComponent } from "../habit-completion/habit-completion.component";
import { HabitComponent } from "../habit/habit.component";

export class DayComponent extends EzComponent {
    private date: string;
    private todaysHabits: HabitCompletionComponent[] = [];

    constructor(date: string, habits: HabitComponent[]) {
        super(html, css);
        this.date = date;
        for (let i = 0; i < habits.length; i++) {
            let tempHabitCompletionItem: HabitCompletionComponent =
                new HabitCompletionComponent(
                    habits[i].getHabitTitle(),
                    habits[i].getHabitHours(),
                );
            this.todaysHabits.push(tempHabitCompletionItem);
        }
    }

    addHabit(habit: HabitCompletionComponent) {
        let checker: boolean = true;

        for (let j = 0; j < this.todaysHabits.length; j++) {
            if (this.todaysHabits[j].getHabitTitle() == habit.getHabitTitle()) {
                checker = false;
            }
        }
        if (checker) {
            let tempHabitCompletionItem: HabitCompletionComponent =
                new HabitCompletionComponent(
                    habit.getHabitTitle(),
                    habit.getHabitHours(),
                );
            this.todaysHabits.push(tempHabitCompletionItem);
        }
    }

    getTodaysHabits() {
        return this.todaysHabits;
    }

    getDate() {
        return this.date;
    }
}
