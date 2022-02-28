<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">Реестр счетов</h2>
        </v-card-title>
        <!-- show-expand -->
        <v-card-text>
            <v-data-table
                :headers="billListHeaders"
                :items="getBills"
                item-key="id"
                class="blue-grey lighten-5"
                hide-default-footer
            >
                <template v-slot:item.id="{ item }">
                    <td>{{ getBills.indexOf(item) + 1 }}</td>
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
                        <router-link
                            class="mr-4"
                            :to="`/project/view/${item.companyID}`"
                        >
                            {{ getCompanyById(item.companyID).name }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.sum="{ item }">
                    <td>{{ item.id }}</td>
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
            "getBills",
            "getProjectById",
            "getStatusById",
            "getGoodById",
            "getPositionsByRequestId",
            "getCompanyById",
        ]),
        length() {
            return Math.ceil(this.total / this.itemsPerPage);
        },
    },
    methods: {
        sumField() {
            if (this.bills.length <= 0) return 0;
            return this.bills
                .map((bill) =>
                    bill.positions <= 0
                        ? 0
                        : bill.positions
                              .map((bp) => +bp.price * +bp.value)
                              .reduce((x, y) => x + y)
                )
                .reduce((xx, yy) => xx + yy);
        },
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
        expanded: [],
        billListHeaders: [
            { text: "№ п/п", value: "id" },
            { text: "Название", value: "name" },
            { text: "Проект", value: "project" },
            { text: "Контрагент", value: "partner" },
            // { text: "Сумма, руб.", value: "sum" },
        ],
    }),
    mounted() {
        this.$store.dispatch("loadStatuses");
        this.$store.dispatch("loadCompanies");
        this.$store.dispatch("loadUsers");
        this.$store.dispatch("loadProjects");
        this.$store.dispatch("loadBills").then(this.pagination);
    },
};
</script>
