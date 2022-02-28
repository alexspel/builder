// import dependency to handle HTTP request to our back end
import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";

//load Vuex
Vue.use(Vuex);

//to handle state
const state = {
    bills: [],
    companies: [],
    statuses: [],
    projects: [],
    posts: [],
    categories: [
        { id: 1, name: "Категория 1" },
        { id: 2, name: "Категория 2" },
        { id: 3, name: "Категория 3" },
        { id: 4, name: "Категория 4" },
        { id: 5, name: "Категория 5" },
    ],
    goods: [
        { id: 1, name: "Товар 1", measure: "measure 1" },
        { id: 2, name: "Товар 2", measure: "measure 2" },
        { id: 3, name: "Товар 3", measure: "measure 3" },
        { id: 4, name: "Товар 4", measure: "measure 4" },
        { id: 5, name: "Товар 5", measure: "measure 5" },
    ],
    requestPositions: [
        {
            id: 1,
            goodID: 1,
            requestID: 1,
            value: 10,
            date: new Date(),
            comment: "",
            managerID: 1,
            statusID: 1,
        },
        {
            id: 2,
            goodID: 2,
            requestID: 1,
            value: 20,
            date: new Date(),
            comment: "",
            managerID: 1,
            statusID: 2,
        },
        {
            id: 3,
            goodID: 3,
            requestID: 1,
            value: 30,
            date: new Date(),
            comment: "",
            managerID: 1,
            statusID: 3,
        },
        {
            id: 4,
            goodID: 1,
            requestID: 2,
            value: 10,
            date: new Date(),
            comment: "",
            managerID: 2,
            statusID: 1,
        },
        {
            id: 5,
            goodID: 2,
            requestID: 2,
            value: 20,
            date: new Date(),
            comment: "",
            managerID: 2,
            statusID: 2,
        },
        {
            id: 6,
            goodID: 3,
            requestID: 2,
            value: 30,
            date: new Date(),
            comment: "",
            managerID: 2,
            statusID: 3,
        },
        {
            id: 7,
            goodID: 1,
            requestID: 4,
            value: 30,
            date: new Date(),
            comment: "",
            managerID: 1,
            statusID: 1,
        },
        {
            id: 8,
            goodID: 2,
            requestID: 4,
            value: 30,
            date: new Date(),
            comment: "",
            managerID: 1,
            statusID: 2,
        },
        {
            id: 9,
            goodID: 3,
            requestID: 4,
            value: 30,
            date: new Date(),
            comment: "",
            managerID: 1,
            statusID: 3,
        },
        {
            id: 7,
            goodID: 1,
            requestID: 3,
            value: 30,
            date: new Date(),
            comment: "",
            managerID: 1,
            statusID: 1,
        },
        {
            id: 8,
            goodID: 2,
            requestID: 3,
            value: 30,
            date: new Date(),
            comment: "",
            managerID: 1,
            statusID: 2,
        },
    ],
    requests: [],
    users: [
        { id: 1, name: "Иванов И.И." },
        { id: 2, name: "Петров П.П." },
        { id: 3, name: "Сидоров В.В." },
        { id: 4, name: "Ivanov I.I." },
        { id: 5, name: "Petrov V.V." },
    ],
    documentTypes: [
        { id: 1, name: "Смета" },
        { id: 2, name: "Договор" },
        { id: 3, name: "Проект" },
    ],
    payments: [
        {
            id: 1,
            billID: 1,
            projectID: 1,
            payDate: "2022-03-04",
            sumVal: 100.2,
            statusID: 1,
        },
        {
            id: 2,
            billID: 1,
            projectID: 1,
            payDate: "2022-05-06",
            sumVal: 240.2,
            statusID: 1,
        },
        {
            id: 3,
            billID: 1,
            projectID: 1,
            payDate: "2022-07-08",
            sumVal: 456.2,
            statusID: 1,
        },
        {
            id: 4,
            billID: 2,
            projectID: 1,
            payDate: "2022-07-08",
            sumVal: 456.2,
            statusID: 1,
        },
    ],
};

const getters = {
    getBills: (state) => state.bills,
    getUsers: (state) => state.users,
    getCategories: (state) => state.categories,
    getCompanies: (state) => state.companies,
    getGoods: (state) => state.goods,
    getPayments: (state) => state.payments,
    getProjects: (state) => state.projects,
    getRequests: (state) => state.requests,
    getStatuses: (state) => state.statuses,
    getDocumentTypes: (state) => state.documentTypes,

    getBillsByProjectId: (state) => (id) => {
        return state.bills.filter((b) => +b.projectID === +id);
    },

    getBillById: (state) => (id) => {
        let bill = state.bills.find((u) => +u.id === +id);
        if (bill) {
            return bill;
        }
        return {
            id: null,
            name: null,
        };
    },
    getCompanyById: (state) => (id) => {
        let company = state.companies.find((u) => +u.id === +id);
        if (company) {
            return company;
        }
        return {
            id: null,
            name: null,
        };
    },
    getGoodById: (state) => (id) => {
        let good = state.goods.find((u) => +u.id === +id);
        if (good) {
            return good;
        }
        return {
            id: null,
            name: null,
        };
    },

    getPaymentsByBillId: (state) => (id) => {
        return state.payments.filter((p) => +p.billID === +id);
    },

    getPositionsByRequestId: (state) => (id) => {
        return state.requestPositions.filter((p) => +p.requestID === +id);
    },

    getProjectById: (state) => (id) => {
        let project = state.projects.find((u) => +u.id === +id);
        if (project) {
            return state.projects[0];
            // return project;
        }
        return {
            id: null,
            name: null,
            comment: null,
            statusID: null,
            authorID: null,
        };
    },

    getRequestById: (state) => (id) => {
        let request = state.requests.find((u) => +u.id === +id);
        if (request) {
            return request;
        }
        return {};
    },

    getRequestsByProjectId: (state) => (id) => {
        return state.requests.filter((r) => +r.projectID === +id);
    },

    getStatusById: (state) => (id) => {
        let status = state.statuses.find((u) => +u.id === +id);
        if (state.statuses.length > 0) {
            return status;
        }
        return {
            id: null,
            name: null,
        };
    },

    getUserById: (state) => (id) => {
        let user = state.users.find((u) => +u.id === +id);
        if (user) {
            return user;
        }
        return {
            id: null,
            name: null,
        };
    },

    getBillCost: () => (id) => {
        return +id * 0;
    },
    getPagination: (state) => {
        return state.pagination;
    },
};

const actions = {
    loadPaymentById: (context, id) => {
        return new Promise((res) => {
            setTimeout(() => {
                res(state.payments.find((p) => +p.id === +id));
            }, 1000);
            context;
        });
    },

    loadRequests: (context, page = 1) => {
        return new Promise((res) => {
            axios
                .get(`/v1/request/list?page=${page}`)
                .then((response) => {
                    var pagination = {
                        page: response.data.requests.current_page,
                        perPage: response.data.requests.per_page,
                        total: response.data.requests.total,
                    };
                    context.commit("SET_REQUESTS", response.data.requests.data);
                    res(pagination);
                });
        });
    },

    loadRequestsByProjectId: (context, projectID, page = 1) => {
        return new Promise((res) => {
            axios
                .get(
                    `/api/v1/project/${projectID}/requests?page=${page}`
                )
                .then((response) => {
                    var pagination = {
                        page: response.data.requests.current_page,
                        perPage: response.data.requests.per_page,
                        total: response.data.requests.total,
                    };
                    context.commit("SET_REQUESTS", response.data.requests.data);
                    res(pagination);
                });
        });
    },

    loadProjects: (context, page = 1) => {
        return new Promise((res) => {
            axios
                .get(`/api/v1/project/list?page=${page}`)
                .then((response) => {
                    var pagination = {
                        page: response.data.projects.current_page,
                        perPage: response.data.projects.per_page,
                        total: response.data.projects.total,
                    };
                    context.commit("SET_PROJECTS", response.data.projects.data);
                    res(pagination);
                });
        });
    },

    loadStatuses: (context) => {
        return new Promise((res) => {
            axios.get(`/api/v1/info`).then((response) => {
                context.commit("SET_STATUSES", response.data.statuses.project);
                res(response.data);
            });
        });
    },

    loadUsers: () => {},

    loadBills: (context, page = 1) => {
        return new Promise((res) => {
            axios
                .get(`/api/v1/bill/list?page=${page}`)
                .then((response) => {
                    var pagination = {
                        page: response.data.bills.current_page,
                        perPage: response.data.bills.per_page,
                        total: response.data.bills.total,
                    };
                    context.commit("SET_BILLS", response.data.bills.data);
                    res(pagination);
                });
        });
    },

    loadGoods: () => {
        new Promise((res) => {
            axios.get(`http://194.67.119.86:8080`).then(() => {
                res();
            });
        });
    },
    loadPayments: () => {
        return new Promise((res) => {
            axios
                .get(`http://194.67.119.86:8080`)
                .then(() => {
                    var pagination = {
                        page: 1,
                        perPage: 25,
                        total: 10
                    };
                    // context.commit("SET_REQUESTS", response.data.requests.data);
                    res(pagination);
                });
        });
    },
    loadCompanies: (context) => {
        return new Promise((res) => {
            axios
                .get(
                    "https://raw.githubusercontent.com/alexspel/builder/main/data/companies.json"
                )
                .then((response) => {
                    context.commit("SET_COMPANIES", response.data);
                    res();
                });
        });
    },

    saveProject: (context, project, err) => {
        axios
            .post("http://194.67.119.86/api/v1/project/add", project)
            .then((result) => {
                context.commit("ADD_PROJECT", result.project);
            })
            .catch((e) => err(e, project));
    },

    saveRequest: (context, payload, err) => {
        axios
            .post("http://194.67.119.86/api/v1/request/add", payload.request)
            .then((result) => {
                context.commit("ADD_REQUEST", result.request);
            })
            .catch((e) => err(e, payload));
    },
};

const mutations = {
    SET_STATUSES(state, statuses) {
        state.statuses = statuses;
    },
    SET_PROJECTS(state, projects) {
        state.projects = projects;
    },
    ADD_PROJECT(state, project) {
        state.projects.push(project);
    },
    SET_BILLS(state, bills) {
        state.bills = bills;
    },
    ADD_BILL(state, bill) {
        state.bill.push(bill);
    },
    SET_PROJECT_STATUSES(state, statuses) {
        state.statuses = statuses;
    },
    SET_USERS(state, users) {
        state.users = users;
    },
    ADD_REQUEST(state, request) {
        state.requests.push(request);
    },
    SET_REQUESTS(state, requests) {
        state.requests = requests;
    },
    SET_COMPANIES(state, companies) {
        state.companies = companies;
    },
    SET_PAGINATION(state, pagination) {
        state.pagination = pagination;
    },
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});
