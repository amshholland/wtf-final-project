import React from "react";
import { render, screen } from "@testing-library/react";
import getTimeDiff from "../utils/getTimeDiff";

describe("time diff function", () => {

    test('time display works for last day', () => {
        const currentTimestamp = Math.round(new Date().getTime() / 1000);
        let result = getTimeDiff(1624399122, 1624431759);
        expect(result).toBe("9.066666666666666 hours ago");
    });

    test('time display works for last month', () => {
        const currentTimestamp = Math.round(new Date().getTime() / 1000);
        let result = getTimeDiff(1622249122, 1624431759);
        expect(result).toBe("25 days ago");
    });

    test('time display works for last week', () => {
        const currentTimestamp = Math.round(new Date().getTime() / 1000);
        let result = getTimeDiff(1624029122, 1624431759);
        expect(result).toBe("5 days ago");
    });

    test('time display works for impossible 0 case', () => {
        const currentTimestamp = Math.round(new Date().getTime() / 1000);
        let result = getTimeDiff(1624431759, 1624431759);
        expect(result).toBe("0 hours ago");
    });

    test('time display works for long time ago', () => {
        const currentTimestamp = Math.round(new Date().getTime() / 1000);
        let result = getTimeDiff(10000000, 1624431759);
        expect(result).toBe("18686 days ago");
    });

    test('time display works for time traveler', () => {
        const currentTimestamp = Math.round(new Date().getTime() / 1000);
        let result = getTimeDiff(1625500000, 1624431759);
        expect(result).toBe("-296.73333333333335 hours ago");
    });
});


// 1582409091
// 1579993543
// 1622979157
// 1624112859