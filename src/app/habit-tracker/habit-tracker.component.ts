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
/**
 * HabitTrackerComponent represents a visual component for tracking habits over days, weeks, and displaying progress.
 * @extends EzComponent
 */
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
    /**
     * Handles changes to the custom habit title input.
     * @param e - The value event triggered by the input change.
     */
    @Input("custom-habit")
    onHabitTitleChange(e: ValueEvent) {
        this.habitTitle = e.value;
    }
    /**
     * Handles changes to the habit hours input.
     * @param e - The value event triggered by the input change.
     */
    @Input("habit-hours")
    onHabitHoursChange(e: ValueEvent) {
        this.habitHours = +e.value;
    }
    /**
     * Adds a new habit to the tracker.
     * Adds a new habitcompletion to every day
     * Adds a new habitGraph to graphList
     * Subsribes title to remove event
     * Adds graph and habit components to screen
     * @throws error if duplicate habit is added
     */

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
            this.graphList.push(GraphItem);
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

    /**
     * Removes a habit from the tracker.
     * @param target - The title of the habit to be removed.
     */

    removeHabit(target: string) {
        for (let i = 0; i < this.habitList.length; i++) {
            if (this.habitList[i].getHabitTitle() == target) {
                const removedElements = this.habitList.splice(i, 1);
                for (let e of removedElements) {
                    this.removeComponent(e);
                }
            }
        }

        for (let i = 0; i < this.graphList.length; i++) {
            if (this.graphList[i].getGraphTitle() == target) {
                const removedElements = this.graphList.splice(i, 1);
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

    /**
     * Adds a predefined "Sleep" habit to the tracker.
     * Adds a new habit to the tracker.
     * Adds a new habitcompletion to every day
     * Adds a new habitGraph to graphList
     * Subsribes title to remove event
     * Adds graph and habit components to screen
     * @throws error if duplicate habit is added
     */
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
            this.graphList.push(GraphItem);
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

    /**
     * Adds a predefined "Exercise" habit to the tracker.
     * Adds a new habit to the tracker.
     * Adds a new habitcompletion to every day
     * Adds a new habitGraph to graphList
     * Subsribes title to remove event
     * Adds graph and habit components to screen
     * @throws error if duplicate habit is added
     */
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
            this.graphList.push(GraphItem);
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

    /**
     * Adds a predefined "Homework" habit to the tracker.
     * Adds a new habit to the tracker.
     * Adds a new habitcompletion to every day
     * Adds a new habitGraph to graphList
     * Subsribes title to remove event
     * Adds graph and habit components to screen
     * @throws error if duplicate habit is added
     */
    @Click("add-habit-homework")
    newHomeworkHabit() {
        let item: HabitComponent = new HabitComponent("Homework", 15);
        let CompletionItem: HabitCompletionComponent =
            new HabitCompletionComponent("Homework", 15);
        let GraphItem: GraphComponent = new GraphComponent("Homework");
        let checker: boolean = true;

        for (let i = 0; i < this.habitList.length; i++) {
            if (this.habitList[i].getHabitTitle() == item.getHabitTitle()) {
                checker = false;
            }
        }

        if (checker) {
            this.habitList.push(item);
            this.graphList.push(GraphItem);
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

    /**
     * Changes the selected date by a specified number of days.
     * @param day - The number of days to change the date by.
     * adds the day to the Daylist if it is not a duplicate
     */

    private changeDate(day: number) {
        let newDate: Date = new Date(this.date);
        newDate.setDate(newDate.getDate() + day);
        this.date = newDate.toISOString().split("T")[0];
        let dayChecker = false;
        let temporaryDate = new DayComponent(this.date, this.habitList);

        for (let i = 0; i < this.dayList.length; i++) {
            if (this.dayList[i].getDate() == temporaryDate.getDate()) {
                dayChecker = true;
            }
        }
        if (!dayChecker) {
            this.dayList.push(temporaryDate);
        }
    }
    /**changes the day to the next day, removing the current habit completion components
     * then it displays that days habit completion components
     */
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
    /**changes the day to the previous day, removing the current habit completion components
     * then it displays that days habit completion components
     */
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
    /**changes the day to that day of the previous week, removing the current habit completion components
     * then it displays that days habit completion components
     */
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
    /**changes the day to that day of the next week, removing the current habit completion components
     * then it displays that days habit completion components
     */
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

    /*HELPER METHOD TO ADD HABIT-COMPLETION TO DAYCOMPONENT*/
    addHabitToDayList() {
        let newHabit: HabitCompletionComponent = new HabitCompletionComponent(
            this.habitTitle,
            this.habitHours,
        );

        for (let i = 0; i < this.dayList.length; i++) {
            this.dayList[i].addHabit(newHabit);
        }
    }

    /**finds the dayComponent in dayList with the same string as this.date */
    findTodaysDateInDayList() {
        let tempDay = new DayComponent("", this.habitList);
        for (let i = 0; i < this.dayList.length; i++) {
            let currentdate = this.dayList[i].getDate();
            if (currentdate == this.date) {
                tempDay = this.dayList[i];
            }
        }

        return tempDay;
    }

    /**Every 1000 milliseconds the program checks to see if any new habit completions have been added
     * If a new habit completion is found, it adds the component
     * to the screen
     */
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

    /**every 1000 milliseconds the program checks if
     * the times completed variable inside of each graph component has
     * changed, if it has, it updates the graph width
     */
    @Timer(100)
    displayTodaysGraphs() {
        for (let i = 0; i < this.graphList.length; i++) {
            let name = this.graphList[i].getGraphTitle();
            if (
                this.graphList[i].getTimesCompleted() !==
                this.findTimesCompleted(name)
            ) {
                this.graphList[i].setTimesCompleted(
                    this.findTimesCompleted(name),
                );
                this.graphList[i].increaseWidth();
            }
        }
    }
    /**finds how many times each habit has been completed over the course of the days */
    findTimesCompleted(title: string) {
        let count = 0;
        for (let i = 0; i < this.dayList.length; i++) {
            for (let y = 0; y < this.dayList[i].getTodaysHabits().length; y++) {
                if (
                    this.dayList[i].getTodaysHabits()[y].getHabitTitle() ==
                        title &&
                    this.dayList[i].getTodaysHabits()[y].getCompletion()
                ) {
                    count++;
                }
            }
        }
        return count;
    }
    /**changes the timesCompleted variavle to the proper value */
    fixWidths() {
        for (let i = 0; i < this.graphList.length; i++) {
            let name = this.graphList[i].getGraphTitle();
            if (
                this.graphList[i].getTimesCompleted() !==
                this.findTimesCompleted(name)
            ) {
                this.graphList[i].getTimesCompleted() !==
                    this.findTimesCompleted(name);
                this.graphList[i].increaseWidth();
            }
        }
    }
}
