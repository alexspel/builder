<template>
    <v-card>
        <v-card-title class="text-h4"> Реестр платежей </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="paymentHeaders"
                :items="payments"
                class="elevation-1"
                pagination.sync="pagination"
                item-key="id"
                hide-default-footer
            >
                <template v-slot:item.id="{ item }">
                    <td>
                        <router-link :to="`/payment/view/${item.id}`">
                            {{ item.id }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.project="{ item }">
                    <td>
                        <router-link :to="`/project/view/${item.project}`">
                            {{ item.projectID }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.bill="{ item }">
                    <td>
                        <router-link :to="`/bill/view/${item.billID}`">
                            Счет
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.date="{ item }">
                    <td>
                        {{ new Date(item.payDate).toLocaleDateString() }}
                    </td>
                </template>
                <template v-slot:item.sum="{ item }">
                    <td>
                        {{ item.sumVal.toLocaleString() }}
                    </td>
                </template>
                <template v-slot:item.status="{ item }">
                    <td>
                        {{ getStatusById(item.statusID).name }}
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
                to="/payment/create"
            >
                <v-btn color="primary">Создать платеж</v-btn>
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
            "getPositionsByRequestId",
            "getCompanyById",
            "getPayments",
        ]),
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
        payments: [],
        paymentHeaders: [
            { text: "ID платежа", value: "id" },
            { text: "Счет", value: "bill" },
            { text: "Проект", value: "project" },
            { text: "Дата платежа", value: "date" },
            { text: "Сумма платежа", value: "sum" },
            { text: "Статус", value: "status" },
        ],
        projects: [],
    }),
    created() {
        Promise.all([
            this.$store.dispatch("loadBills"),
            this.$store.dispatch("loadProjects"),
            this.$store.dispatch("loadPayments"),
        ])
            .then((e) => {
                this.applyingPagination(e);
            })
            .then(() => {
                this.payments = this.getPayments;
            });
    },
};
</script>
