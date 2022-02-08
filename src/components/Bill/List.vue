<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">Реестр счетов</h2>
        </v-card-title>
        <v-card-text>
            <v-data-table :headers="billListHeaders" :items="bills">
                <template v-slot:item.project="{ item }">
                    <td>
                        <router-link
                            class="mr-4"
                            :to="'/project/view/' + item.project.id"
                        >
                            {{ item.project.name }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.partner="{ item }">
                    <td>
                        {{ item.partner.name }}
                    </td>
                </template>
                <template v-slot:item.sum="{ item }">
                    <td>
                        {{
                            item.positions
                                .map((p) => +p.value * +p.price)
                                .reduce((p, c) => p + c)
                        }}
                    </td>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    methods: {},
    data: () => ({
        company: { id: null, name: "" },
        companies: [],
        bills: [],
        billListHeaders: [
            { text: "Номер счета", value: "id" },
            { text: "Проект", value: "project" },
            { text: "Контрагент", value: "partner" },
            { text: "Сумма, руб.", value: "sum" },
        ],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/main/data/companies.json"
        );
        this.companies = await response.json();

        response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/bills.json"
        );
        this.bills = await response.json();
        this.bills.forEach((bill) => {
            var idx = this.bills.indexOf(bill);
            this.bills[idx].partner =
                this.companies.find((c) => +c.id === +bill.id) || this.company;
        });
        console.log(this.bills);
    },
};
</script>
