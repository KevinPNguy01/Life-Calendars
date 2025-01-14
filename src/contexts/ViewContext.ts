import { createContext } from "react";

export type ViewContextType = {
    views: {
        strava: boolean;
        leetcode: boolean;
        github: boolean;
    };
    setView: (view: keyof ViewContextType["views"] | "all", value: boolean) => void;
};

export const ViewContext = createContext<ViewContextType>({
    views: {
        strava: true,
        leetcode: true,
        github: true
    },
    setView: () => {}
});