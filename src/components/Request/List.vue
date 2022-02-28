<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">Реестр заявок</h2>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="requestHeaders"
                :items="getRequests"
                show-expand
                item-key="id"
                class="blue-grey lighten-5"
                hide-default-footer
                v-if="loaded"
            >
                <template #item.index="{ item }">
                    <td>{{ getRequests.indexOf(item) + 1 }}</td>
                </template>
                <template v-slot:item.name="{ item }">
                    <td>
                        <router-link
                            class="mr-4"
                            :to="`/request/view/${item.id}`"
                        >
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
                <template v-slot:item.positions="{ item }">
                    <td>
                        {{ getPositionsByRequestId(item.id).length }}
                    </td>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" style="padding: 0">
                        <v-data-table
                            hide-default-footer
                            :items="getPositionsByRequestId(item.id)"
                            :headers="positionHeaders"
                        >
                            <template #item.index="{ item }">
                                <td>{{ getRequests.indexOf(item) + 1 }}</td>
                            </template>
                            <template v-slot:item.good="{ item }">
                                <td>
                                    {{ getGoodById(item.goodID).name }}
                                </td>
                            </template>
                            <template v-slot:item.measure="{ item }">
                                <td>
                                    {{ getGoodById(item.goodID).measure }}
                                </td>
                            </template>
                            <template v-slot:item.status="{ item }">
                                <td>
                                    {{ getStatusById(item.statusID).name }}
                                </td>
                            </template>
                            <template v-slot:item.date="{ item }">
                                <td>
                                    {{
                                        new Date(item.date).toLocaleDateString()
                                    }}
                                </td>
                            </template>
                            <template v-slot:item.manager="{ item }">
                                <td>
                                    {{ getUserById(item.managerID).name }}
                                </td>
                            </template>
                        </v-data-table>
                    </td>
                </template>
            </v-data-table>
            <v-pagination
                v-if="total > itemsPerPage"
                v-model="page"
                :length="length"
                @input="next"
            />
        </v-card-text>
        <v-card-actions class="pa-4">
            <router-link
                style="text-decoration: none; color: inherit"
                to="/request/create"
            >
                <v-btn color="primary">Создать Заявку</v-btn>
            </router-link>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters([
            "getUsers",
            "getRequests",
            "getProjects",
            "getGoodById",
            "getStatusById",
            "getCompanyById",
            "getUserById",
            "getProjectById",
            "getPositionsByRequestId",
        ]),
        length() {
            return Math.ceil(this.total / this.itemsPerPage);
        },
    },
    methods: {
        next(page) {
            this.$store.dispatch("loadProjects", page, this.applyingPagination);
        },
        applyingPagination(a) {
            this.page = a.page;
            this.itemsPerPage = a.perPage;
            this.total = a.total;
            this.loaded = true;
        },
    },
    data: () => ({
        page: 1,
        itemsPerPage: 1,
        total: 1,
        loaded: false,
        requestHeaders: [
            { text: "ID", value: "id" },
            { text: "Название заявки", value: "name" },
            { text: "Проект", value: "project" },
            { text: "Количество позиций", value: "positions" },
        ],
        positionHeaders: [
            { text: "ID", value: "id" },
            { text: "Наименование", value: "good" },
            { text: "Количество", value: "value" },
            { text: "Ед.изм", value: "measure" },
            { text: "Статус", value: "status" },
            { text: "Ответственный", value: "manager" },
            { text: "Доставлено", value: "delivered" },
        ],
    }),

    created() {
        Promise.all([
            this.$store.dispatch("loadProjects"),
            this.$store.dispatch("loadRequests"),
        ]).then(this.applyingPagination);
    },
};
</script>
