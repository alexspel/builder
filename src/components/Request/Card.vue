<template>
    <v-card class="pa-2" outlined v-if="loaded">
        <v-card-title>
            <h2 class="text-h2 mb-4">
                Проект:
                <router-link :to="`/project/view/${project.id}`">
                    {{ project.name }}
                </router-link>
            </h2>
        </v-card-title>
        <v-card-text>
            <div class="mb-4">Комментарий: {{ project.comment }}</div>
            <div class="mb-4">
                Статус проекта: {{ getStatusById(project.statusID).name }}
            </div>
            <div class="mb-4">
                Руководитель проекта: {{ getUserById(project.authorID).name }}
            </div>
            <v-data-table :headers="positionHeaders" :items="goods">
                <template v-slot:item.name="{ item }">
                    {{ getGoodById(item.id).name }}
                </template>
                <template v-slot:item.measure="{ item }">
                    {{ getGoodById(item.id).measure }}
                </template>
                <template v-slot:item.value="{ item }">
                    {{ item.value.toLocaleString() }}
                </template>
                <template v-slot:item.manager="{ item }">
                    {{ getUserById(item.managerID).name }}
                </template>
                <template v-slot:item.date="{ item }">
                    {{ item.date.toLocaleDateString() }}
                </template>
            </v-data-table>

            <router-link
                style="text-decoration: none; color: inherit"
                to="/request/create"
            >
                <v-btn color="primary">Создать Заявку</v-btn>
            </router-link>
        </v-card-text> 
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "getProjectById",
            "getStatusById",
            "getUserById",
            "getCompanyById",
            "getRequestsByProjectId",
            "getPositionsByRequestId",
            "getRequestById",
            "getGoodById",
        ]),
    },
    data: () => ({
        loaded: false,
        request: {},
        project: {},
        goods: [],

        positionHeaders: [
            { text: "№ п/п", value: "id" },
            { text: "Наименование", value: "name" },
            { text: "Ед.изм", value: "measure" },
            { text: "Кол-во", value: "value" },
            { text: "Необходимая дата доставки", value: "date" },
            { text: "Ответственный", value: "manager" },
            { text: "Комментарий", value: "comment" },
            { text: "Доставлено", value: "delivered" },
        ],
    }),
    created() {
        Promise.all([
            this.$store.dispatch("loadGoods"),
            this.$store.dispatch("loadRequests"),
            this.$store.dispatch("loadProjects"),
            this.$store.dispatch("loadCompanies"),
            this.$store.dispatch("loadUsers"),
            this.$store.dispatch(
                "loadRequestsByProjectId",
                this.$route.params.id
            ),
        ]).then(() => {
            this.request = this.getRequestById(this.$route.params.id);
            this.project = this.getProjectById(this.request.projectID);
            this.goods = this.getPositionsByRequestId(this.request.id);
            this.loaded = true;
        });
    },
};
</script>
