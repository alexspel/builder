import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
    vuetify,
    store,
    router,
    render: (h) => h(App),
    created: function () {
        Promise.all([
            this.$store.dispatch("loadStatuses").then(() => {
                console.log("statuses loaded");
            }),
            this.$store.dispatch("loadCompanies").then(() => {
                console.log("companies loaded");
            }),
            this.$store.dispatch("loadUsers").then(() => {
                console.log("users loaded");
            }),
            this.$store.dispatch("loadGoods").then(() => {
                console.log("goods loaded");
            }),
        ]);
    },
}).$mount("#app");
