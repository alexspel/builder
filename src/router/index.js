import Vue from "vue";
import VueRouter from "vue-router";
import Project from "../components/Project";
import ProjectList from "../components/Project/List";
import ProjectRequestList from "../components/ProjectRequestList";
import ProjectBillList from "../components/ProjectBillList";
import Request from "../components/Request";
import RequestsAgreement from "../components/RequestsAgreement";
import BillAgreement from "../components/BillAgreement";
import BillCard from "../components/BillCard";
import ProjectCard from "../components/ProjectCard";
import BillList from "../components/Bill/List";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: ProjectList,
    },
    {
        path: "/project",
        name: "projects",
        component: ProjectList,
    },
    {
        path: "/project/view/:id",
        name: "project",
        component: ProjectCard,
    },
    {
        path: "/project/create",
        name: "project/create",
        component: Project,
    },
    {
        path: "/project/request/:id",
        name: "projects/request",
        component: ProjectRequestList,
    },
    {
        path: "/project/bill/:id",
        name: "projects/bill",
        component: ProjectBillList,
    },
    {
        path: "/request/create",
        name: "request/create",
        component: Request,
    },
    {
        path: "/request/agreement",
        name: "request/agreement",
        component: RequestsAgreement,
    },
    {
        path: "/bill/agreement",
        name: "bill/agreement",
        component: BillAgreement,
    },
    {
        path: "/bill",
        name: "bill",
        component: BillCard,
    },
    {
        path: "/bill/list",
        name: "bill/list",
        component: BillList,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
