import Vue from "vue";
import VueRouter from "vue-router";

import ProjectList from "../components/Project/List";
import ProjectCard from "../components/Project/Card";
import ProjectForm from "../components/Project/Form";
import ProjectRequestList from "../components/Project/Request";

import BillForm from "../components/Bill/Form";
import BillList from "../components/Bill/List";

import RequestCard from "../components/Request/Card";
import RequestForm from "../components/Request/Form";
import RequestList from "../components/Request/List";

import PaymentList from "../components/Payment/List";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: ProjectList,
    },
    {
        path: "/project/view/:id",
        name: "projectView",
        component: ProjectCard,
    },
    {
        path: "/project/create",
        name: "projectForm",
        component: ProjectForm,
    },
    {
        path: "/project/:id/request",
        name: "ProjectRequestList",
        component: ProjectRequestList,
    },
    {
        path: "/project/:id/bill",
        name: "ProjectRequestList",
        component: ProjectRequestList,
    },

    {
        path: "/request/view/:id",
        name: "RequestCard",
        component: RequestCard,
    },
    {
        path: "/request/create",
        name: "RequestForm",
        component: RequestForm,
    },
    {
        path: "/request/list/",
        name: "RequestList",
        component: RequestList,
    },

    {
        path: "/bill/create",
        name: "billForm",
        component: BillForm,
    },
    {
        path: "/bill/list",
        name: "BillList",
        component: BillList,
    },

    {
        path: "/payment/list",
        name: "PaymentList",
        component: PaymentList,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
