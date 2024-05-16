import { describe, expect, test, beforeAll } from "@jest/globals";
import { HabitTrackerComponent } from "./habit-tracker.component";
import { bootstrap } from "@gsilber/webez";

describe("HabitTrackerComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<HabitTrackerComponent>(HabitTrackerComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(HabitTrackerComponent);
        });
    });
});
