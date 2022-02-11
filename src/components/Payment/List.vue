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
            >
                <template v-slot:item.project="{ item }">
                    <td>
                        <router-link :to="`/project/view/${item.project}`">
                            {{ getItemById(item.project, projects) }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.bill="{ item }">
                    <td>
                        <router-link :to="`/bill/view/${item.bill}`">
                            Счет
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.partner="{ item }">
                    <td>
                        <router-link :to="`/company/view/${item.partner}`">
                            {{ getItemById(item.partner, companies) }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.amount="{ item }">
                    <td>{{ item.amount.toLocaleString() }}</td>
                </template>
            </v-data-table>
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
export default {
    methods: {
        getItemById(id, arr) {
            var p = arr.find((p) => +p.id == +id);
            if (p) {
                return p.name;
            }
            return id;
        },
    },
    data: () => ({
        bills: [],
        companies: [],
        payments: [],
        paymentHeaders: [
            { text: "Номер заявки", value: "id" },
            { text: "Проект", value: "project" },
            { text: "Счет", value: "bill" },
            { text: "Контрагент", value: "partner" },
            { text: "Дата", value: "date" },
            { text: "Сумма, руб.", value: "amount" },
            { text: "Статус", value: "status" },
        ],
        projects: [],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/payments.json"
        );
        this.payments = await response.json();

        response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/projects.json"
        );
        this.projects = await response.json();

        response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/bills.json"
        );
        this.bills = await response.json();

        response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/companies.json"
        );
        this.companies = await response.json();
    },
};
</script>
