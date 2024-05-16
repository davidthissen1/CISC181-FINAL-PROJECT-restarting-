import {
    EzComponent,
    BindValue,
    BindValueToNumber,
    Input,
    ValueEvent,
    Click,
} from "@gsilber/webez";
import html from "./habit-tracker.component.html";
import css from "./habit-tracker.component.css";
import { DayComponent } from "../day/day.component";
import { HabitComponent } from "../habit/habit.component";
import { HabitCompletionComponent } from "../habit-completion/habit-completion.component";

export class HabitTrackerComponent extends EzComponent {
    @BindValue("custom-habit")
    private habitTitle: string = "";

    @BindValueToNumber("habit-hours")
    private habitHours: number = 0;

    @BindValue("errors")
    private error: string = "";

    private habitList: HabitComponent[] = [];
    private dayList: DayComponent[] = [];

    constructor() {
        super(html, css);
    }

    @Input("custom-habit")
    onHabitTitleChange(e: ValueEvent) {
        this.habitTitle = e.value;
    }

    @Input("habit-hours")
    onHabitHoursChange(e: ValueEvent) {
        this.habitHours = +e.value;
    }

    /* method for adding habits*/
    @Click("add-habit")
    newHabit() {
        let item: HabitComponent = new HabitComponent(
            this.habitTitle,
            this.habitHours,
        );
        let checker: boolean = true;
        for (let i = 0; i < this.habitList.length; i++) {
            if (this.habitList[i].getHabitTitle() == item.getHabitTitle()) {
                checker = false;
            }
        }

        if (checker) {
            this.habitList.push(item);
            this.addComponent(item, "habit-list");

            console.log(this.dayList);
            this.error = "";
            this.habitList.push(item);
            item.removeEvent.subscribe((title: string) => {
                this.removeHabit(title);
            });
        } else {
            this.error = "DUPLICATE HABIT: TRY AGAIN";
        }
    }

    /*method for removing habits*/

    removeHabit(target: string) {
        for (let i = 0; i < this.habitList.length; i++) {
            if (this.habitList[i].getHabitTitle() == target) {
                const removedElements = this.habitList.splice(i, 1);
                for (let e of removedElements) {
                    this.removeComponent(e);
                }
            }
        }
    }

    /* date + tracker code starts here*/

    @BindValue("calendar")
    private date: string = "2024-01-01";

    private changeDate(day: number) {
        let newDate: Date = new Date(this.date);
        newDate.setDate(newDate.getDate() + day);
        this.date = newDate.toISOString().split("T")[0];
    }

    @Click("next-day")
    OnNextDayClick() {
        this.changeDate(1);
    }
    @Input("calendar")
    onDateChange(e: ValueEvent) {
        this.date = e.value;
    }

    @Click("previous-day")
    OnPreviousDayClick() {
        this.changeDate(-1);
    }
    @Click("previous-week")
    OnPreviousWeekClick() {
        this.changeDate(-7);
    }
    @Click("next-week")
    OnNextWeekClick() {
        this.changeDate(7);
    }
}
