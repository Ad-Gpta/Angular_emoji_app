import { Routes } from "@angular/router";
import { App } from "./app/app";
import { ScorePage } from "./app/score-page/score-page";
import { Game } from "./app/game/game";

const routeConfig: Routes = [
    {
        path: '',
        component: App,
        title: 'Login page',
    },
    {
        path: 'game',
        component: Game,
        title: 'Game page',
    },
    {
        path: 'score',
        component: ScorePage,
        title: 'Score Page',
    },
];

export default routeConfig;