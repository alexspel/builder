<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">
                Реестр счетов проекта
                <router-link :to="`/project/view/${project.id}`">
                    {{ project.name }}
                </router-link>
            </h2>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="requestHeaders"
                :items="bills"
                item-key="id"
                class="blue-grey lighten-5"
            >
                <template #item.index="{ item }">
                    <td>
                        {{
                            getBillsByProjectId(item.projectID).indexOf(item) +
                            1
                        }}
                    </td>
                </template>
                <template v-slot:item.name="{ item }">
                    <td>
                        <router-link class="mr-4" :to="`/bill/view/${item.id}`">
                            {{ item.name }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.project="{ item }">
                    <td>
                        <router-link
                            class="mr-4"
                            :to="`/project/view/${item.projectID}`"
                        >
                            {{ getProjectById(item.projectID).name }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.partner="{ item }">
                    <td>
                        {{ getCompanyById(item.companyID).name }}
                    </td>
                </template>
                <template v-slot:item.positions="{ item }">
                    <td>
                        {{ item.id }}
                    </td>
                </template>
                <template v-slot:item.sum="{ item }">
                    <td>
                        {{ item.id }}
                    </td>
                </template>
            </v-data-table>
        </v-card-text>
        <v-card-actions class="pa-4">
            <router-link
                style="text-decoration: none; color: inherit"
                to="/bill/create"
            >
                <v-btn color="primary">Создать счет</v-btn>
            </router-link>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "getRequests",
            "getProjectById",
            "getStatusById",
            "getUserById",
            "getGoodById",
            "getCompanyById",
            "getPositionsByRequestId",
            "getBillCost",
            "getBillsByProjectId",
        ]),
    },
    methods: {
        view() {
            console.log(this.$store.state);
        },
    },
    data: () => ({
        project: {
            id: null,
            name: null,
        },
        expanded: [],
        requests: [],
        bills: [],
        requestHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Счет", value: "name" },
            { text: "Проект", value: "project" },
            { text: "Количество позиций", value: "positions" },
            { text: "Контрагент", value: "partner" },
        ],
        positionHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Наименование", value: "good.name" },
            { text: "Кол-во", value: "value" },
            { text: "Ед.изм", value: "good.measure" },
            { text: "Необходимая дата доставки", value: "date" },
            { text: "Комментарий", value: "comment" },
            { text: "Ответственный", value: "manager.name" },
            { text: "Доставлено", value: "delivered" },
        ],
    }),
    created() {
        this.$store.dispatch("loadProjects");
        this.$store.dispatch("loadGoods");
        this.$store.dispatch("loadBills");
        this.$store.dispatch("loadStatuses");
        this.$store.dispatch("loadUsers");
        this.$store.dispatch("loadCompanies");
        this.project = this.getProjectById(this.$route.params.id);
        this.$store.dispatch("loadRequestsByProjectId", this.$route.params.id);
        this.bills = this.getBillsByProjectId(this.$route.params.id);
    },
};
</script>
