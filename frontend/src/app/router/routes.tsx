import { ComponentType } from 'react';
import { MainPage } from '../../pages/main/MainPage';
import { categories } from '../../shared/ui/icons/const/categories';
import { CategoryPage } from '../../pages/category/CategoryPage';

interface Route {
    path: string;
    component: ComponentType;
}

const categoryRoutes = Object.keys(categories).map((el) => ({
    path: `/${el}`,
    component: CategoryPage,
}));

export const publicRoutes: Route[] = [
    { path: '/', component: MainPage },
    ...categoryRoutes,
];

export const privateRoutes: Route[] = [];
