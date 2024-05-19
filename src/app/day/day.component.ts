import { EzComponent } from "@gsilber/webez";
import html from "./day.component.html";
import css from "./day.component.css";
import { HabitCompletionComponent } from "../habit-completion/habit-completion.component";
import { HabitComponent } from "../habit/habit.component";
/**
 * DayComponent represents a visual component for displaying a day's habits and their completion status.
 * @extends EzComponent
 */
export class DayComponent extends EzComponent {
    private date: string;
    private todaysHabits: HabitCompletionComponent[] = [];

    /**
     * Creates an instance of DayComponent.
     * @param date - The date for this component.
     * @param habits - An array of HabitComponent instances for this day.
     */

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

    /**
     * Adds a habit to today's habits if it doesn't already exist.
     * @param habit - The HabitCompletionComponent to add.
     */
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
    /**
     * Retrieves the habits for today.
     * @returns An array of HabitCompletionComponent instances.
     */

    getTodaysHabits() {
        return this.todaysHabits;
    }
    /**
     * Retrieves the date for this component.
     * @returns The date as a string.
     */
    getDate() {
        return this.date;
    }
}
