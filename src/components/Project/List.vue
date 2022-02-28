<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">Реестр проектов</h2>
        </v-card-title>
        <v-card-text v-if="loaded">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Поиск"
                hide-details
                class="mb-4"
            />
            <v-data-table
                :headers="headers"
                :items="getProjects"
                class="elevation-1"
                item-key="id"
                :search="search"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
            >
                <template v-slot:item.name="{ item }">
                    <td>
                        <router-link :to="'/project/view/' + item.id">
                            {{ item.name }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.status="{ item }">
                    <td>{{ getStatusById(item.statusID).name }}</td>
                </template>
                <template v-slot:item.author="{ item }">
                    <td>{{ getUserById(item.authorID).name }}</td>
                </template>
                <template v-slot:item.partner="{ item }">
                    <td>Ссылка на контрагента {{ item.id }}</td>
                </template>
                <template v-slot:item.links="{ item }">
                    <v-btn
                        class="mx-4"
                        color="success"
                        :to="`/project/${item.id}/request`"
                    >
                        Заявки
                    </v-btn>
                    <v-btn
                        class="mx-4"
                        color="success"
                        :to="`/project/${item.id}/bill`"
                    >
                        Счета
                    </v-btn>
                </template>
            </v-data-table>
            <v-pagination v-if="total > itemsPerPage" v-model="page" :length="length" @input="next" />
        </v-card-text>
        <v-card-actions>
            <div class="mt-4">
                <router-link
                    style="text-decoration: none; color: inherit"
                    to="/project/create"
                >
                    <v-btn color="primary">Создать проект</v-btn>
                </router-link>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters([
            "getUsers",
            "getProjects",
            "getStatusById",
            "getCompanyById",
            "getUserById", 
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
        search: "",
        loaded: false,
        // projects: [],
        headers: [
            { text: "ID", value: "id" },
            { text: "Название проекта", value: "name" },
            { text: "Статус", value: "status" },
            { text: "Автор", value: "author" },
            { text: "Контрагент", value: "partner" },
            { text: "", value: "links" },
        ],
    }),
    created() {
        this.$store.dispatch("loadUsers");
        this.$store.dispatch("loadCompanies");
        this.$store.dispatch("loadStatuses");
        this.$store.dispatch("loadProjects").then(this.applyingPagination);
    },
};
</script>
