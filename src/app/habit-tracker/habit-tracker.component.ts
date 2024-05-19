import {
    EzComponent,
    BindValue,
    BindValueToNumber,
    Input,
    ValueEvent,
    Click,
    Timer,
} from "@gsilber/webez";
import html from "./habit-tracker.component.html";
import css from "./habit-tracker.component.css";
import { DayComponent } from "../day/day.component";
import { HabitComponent } from "../habit/habit.component";
import { HabitCompletionComponent } from "../habit-completion/habit-completion.component";
import { GraphComponent } from "../graph/graph.component";

export class HabitTrackerComponent extends EzComponent {
    @BindValue("custom-habit")
    private habitTitle: string = "";

    @BindValueToNumber("habit-hours")
    private habitHours: number = 0;

    @BindValue("errors")
    private error: string = "";

    @BindValue("calendar")
    private date: string = "2024-01-01";

    private habitList: HabitComponent[] = [];
    private dayList: DayComponent[] = [];
    private graphList: GraphComponent[] = [];
    private initialDate: string = "";

    constructor() {
        super(html, css);
        let newDate: Date = new Date("2024-01-01");
        let initialDay: DayComponent = new DayComponent(
            newDate.toISOString().split("T")[0],
            this.habitList,
        );
        this.dayList.push(initialDay);
        this.initialDate = initialDay.getDate();
        console.log(this.initialDate);
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
        let CompletionItem: HabitCompletionComponent =
            new HabitCompletionComponent(this.habitTitle, this.habitHours);

        let GraphItem: GraphComponent = new GraphComponent(this.habitTitle);

        let checker: boolean = true;
        for (let i = 0; i < this.habitList.length; i++) {
            if (this.habitList[i].getHabitTitle() == item.getHabitTitle()) {
                checker = false;
            }
        }

        if (checker) {
            this.habitList.push(item);

            this.addComponent(item, "habit-list");
            this.addComponent(GraphItem, "graph");
            this.addHabitToDayList();

            this.error = "";

            item.removeEvent.subscribe((title: string) => {
                this.removeHabit(title);
            });
        } else {
            this.error = "DUPLICATE HABIT: TRY AGAIN";
        }
        for (let i = 0; i < this.dayList.length; i++) {
            this.dayList[i].addHabit(CompletionItem);
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

        for (let i = 0; i < this.dayList.length; i++) {
            for (let j = 0; j < this.dayList[i].getTodaysHabits().length; j++) {
                if (
                    this.dayList[i].getTodaysHabits()[j].getHabitTitle() ==
                    target
                ) {
                    const removedElements = this.dayList[i]
                        .getTodaysHabits()
                        .splice(j, 1);
                    for (let e of removedElements) {
                        this.removeComponent(e);
                    }
                }
            }
        }
    }

    /* method for adding habits*/
    @Click("add-habit-sleep")
    newSleepHabit() {
        let item: HabitComponent = new HabitComponent("Sleep", 8);
        let CompletionItem: HabitCompletionComponent =
            new HabitCompletionComponent("Sleep", 8);
        let checker: boolean = true;
        let GraphItem: GraphComponent = new GraphComponent("Sleep");
        for (let i = 0; i < this.habitList.length; i++) {
            if (this.habitList[i].getHabitTitle() == item.getHabitTitle()) {
                checker = false;
            }
        }

        if (checker) {
            this.habitList.push(item);
            this.addComponent(item, "habit-list");
            this.addComponent(GraphItem, "graph");

            this.error = "";

            item.removeEvent.subscribe((title: string) => {
                this.removeHabit(title);
            });
        } else {
            this.error = "DUPLICATE HABIT: TRY AGAIN";
        }

        for (let i = 0; i < this.dayList.length; i++) {
            this.dayList[i].addHabit(CompletionItem);
        }
    }

    /* method for adding habits*/
    @Click("add-habit-exercise")
    newExerciseHabit() {
        let item: HabitComponent = new HabitComponent("Exercise", 10);
        let CompletionItem: HabitCompletionComponent =
            new HabitCompletionComponent("Exercise", 10);
        let GraphItem: GraphComponent = new GraphComponent("Exercise");
        let checker: boolean = true;
        for (let i = 0; i < this.habitList.length; i++) {
            if (this.habitList[i].getHabitTitle() == item.getHabitTitle()) {
                checker = false;
            }
        }

        if (checker) {
            this.habitList.push(item);
            this.addComponent(item, "habit-list");
            this.addComponent(GraphItem, "graph");
            this.error = "";

            item.removeEvent.subscribe((title: string) => {
                this.removeHabit(title);
            });
        } else {
            this.error = "DUPLICATE HABIT: TRY AGAIN";
        }

        for (let i = 0; i < this.dayList.length; i++) {
            this.dayList[i].addHabit(CompletionItem);
        }
    }

    /* method for adding habits*/
    @Click("add-habit-homework")
    newHomeworkHabit() {
        let item: HabitComponent = new HabitComponent("Homework", 15);
        let CompletionItem: HabitCompletionComponent =
            new HabitCompletionComponent("Homework", 15);
        let GraphItem: GraphComponent = new GraphComponent("Exercise");
        let checker: boolean = true;

        for (let i = 0; i < this.habitList.length; i++) {
            if (this.habitList[i].getHabitTitle() == item.getHabitTitle()) {
                checker = false;
            }
        }

        if (checker) {
            this.habitList.push(item);
            this.addComponent(item, "habit-list");
            this.addComponent(GraphItem, "graph");

            this.error = "";

            item.removeEvent.subscribe((title: string) => {
                this.removeHabit(title);
            });
        } else {
            this.error = "DUPLICATE HABIT: TRY AGAIN";
        }

        for (let i = 0; i < this.dayList.length; i++) {
            this.dayList[i].addHabit(CompletionItem);
        }
    }

    /* date + tracker code starts here*/

    private changeDate(day: number) {
        let newDate: Date = new Date(this.date);
        newDate.setDate(newDate.getDate() + day);
        this.date = newDate.toISOString().split("T")[0];
        let dayChecker = false;
        let temporaryDate = new DayComponent(this.date, this.habitList);

        console.log(temporaryDate.getDate());

        for (let i = 0; i < this.dayList.length; i++) {
            if (this.dayList[i].getDate() == temporaryDate.getDate()) {
                dayChecker = true;
            }
        }
        if (!dayChecker) {
            this.dayList.push(temporaryDate);
        }

        console.log(this.dayList);
        console.log(this.dayList[1].getDate());
        console.log(this.dayList[1].getTodaysHabits()[0].getHabitTitle());
    }

    @Click("next-day")
    OnNextDayClick() {
        this.changeDate(1);
        for (let i = 0; i < this.dayList.length; i++) {
            if (this.dayList[i].getDate() !== this.date) {
                this.dayList[i].getTodaysHabits().forEach((habit) => {
                    this.removeComponent(habit);
                });
            }
        }
    }
    @Input("calendar")
    onDateChange(e: ValueEvent) {
        this.date = e.value;
    }

    @Click("previous-day")
    OnPreviousDayClick() {
        this.changeDate(-1);
        for (let i = 0; i < this.dayList.length; i++) {
            if (this.dayList[i].getDate() !== this.date) {
                this.dayList[i].getTodaysHabits().forEach((habit) => {
                    this.removeComponent(habit);
                });
            }
        }
    }
    @Click("previous-week")
    OnPreviousWeekClick() {
        this.changeDate(-7);
        for (let i = 0; i < this.dayList.length; i++) {
            if (this.dayList[i].getDate() !== this.date) {
                this.dayList[i].getTodaysHabits().forEach((habit) => {
                    this.removeComponent(habit);
                });
            }
        }
    }
    @Click("next-week")
    OnNextWeekClick() {
        this.changeDate(7);
        for (let i = 0; i < this.dayList.length; i++) {
            if (this.dayList[i].getDate() !== this.date) {
                this.dayList[i].getTodaysHabits().forEach((habit) => {
                    this.removeComponent(habit);
                });
            }
        }
    }

    /*MAKE HELPER METHOD TO ADD HABIT-COMPLETION TO DAY*/
    addHabitToDayList() {
        let newHabit: HabitCompletionComponent = new HabitCompletionComponent(
            this.habitTitle,
            this.habitHours,
        );

        for (let i = 0; i < this.dayList.length; i++) {
            this.dayList[i].addHabit(newHabit);
        }
    }

    findTodaysDateInDayList() {
        let tempDay = new DayComponent("", this.habitList);
        for (let i = 0; i < this.dayList.length; i++) {
            let currentdate = this.dayList[i].getDate();
            if (currentdate == this.date) {
                tempDay = this.dayList[i];
            }
        }
        console.log("today");
        /*       console.log(tempDay.getDate());
        console.log(tempDay.getTodaysHabits()[0].getHabitTitle());
*/
        return tempDay;
    }
    @Timer(1000)
    displayTodaysHabits() {
        let todaysDate: DayComponent = this.findTodaysDateInDayList();
        let todaysHabits: HabitCompletionComponent[] =
            todaysDate.getTodaysHabits();
        for (let i = 0; i < todaysHabits.length; i++) {
            let habit = todaysHabits[i];
            this.addComponent(habit, "TodaysHabits");
        }
    }
}
