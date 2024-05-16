import { describe, expect, test, beforeAll } from "@jest/globals";
import { HabitCompletionComponent } from "./habit-completion.component";
import { bootstrap } from "@gsilber/webez";

describe("HabitCompletionComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<HabitCompletionComponent>(HabitCompletionComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(HabitCompletionComponent);
        });
    });
});
