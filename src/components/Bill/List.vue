<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">Реестр счетов</h2>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="billListHeaders"
                :items="bills"
                :expanded.sync="expanded"
                show-expand
                item-key="id"
                class="blue-grey lighten-5"
            >
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
                                .toLocaleString()
                        }}
                    </td>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" style="padding: 0">
                        <v-data-table
                            :items="item.positions"
                            :headers="positionHeaders"
                        >
                        </v-data-table>
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
        expanded: [],
        company: { id: null, name: "" },
        companies: [],
        bills: [],
        billListHeaders: [
            { text: "Номер счета", value: "id" },
            { text: "Проект", value: "project" },
            { text: "Контрагент", value: "partner" },
            { text: "Сумма, руб.", value: "sum" },
        ],
        positionHeaders: [
            { text: "Наименование", value: "good.name" },
            { text: "Количество", value: "value" },
            { text: "Ед.изм", value: "good.measure" },
            { text: "Дата поставки", value: "date" },
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
