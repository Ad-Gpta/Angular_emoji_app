import { Routes } from '@angular/router';
import { App } from "./app";
import { ScorePage } from "./score-page/score-page";
import { Game } from "./game/game";
import { Login } from './login/login';

export const routes: Routes = [
    {
        path: '',
        component: Login,
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
