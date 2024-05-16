import { describe, expect, test, beforeAll } from "@jest/globals";
import { HabitComponent } from "./habit.component";
import { bootstrap } from "@gsilber/webez";

describe("HabitComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<HabitComponent>(HabitComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(HabitComponent);
        });
    });
});
