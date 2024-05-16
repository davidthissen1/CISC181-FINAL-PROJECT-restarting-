import { describe, expect, test, beforeAll } from "@jest/globals";
import { DayComponent } from "./day.component";
import { bootstrap } from "@gsilber/webez";

describe("DayComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<DayComponent>(DayComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(DayComponent);
        });
    });
});
