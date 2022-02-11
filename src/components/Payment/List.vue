<template>
    <div>
        <v-data-table
            :headers="paymentHeaders"
            :items="items"
            hide-actions
            class="elevation-1"
            pagination.sync="pagination"
            item-key="id"
        >
            <template v-slop:item.project="{ item }">
                <td>
                    <a :href="`/project/view/${item.id}`"> Проект </a>
                </td>
            </template>
            <template v-slop:item.bill="{ item }">
                <td>
                    <a :href="`/bill/view/${item.id}`"> Счет </a>
                </td>
            </template>
            <template v-slop:item.partner="{ item }">
                <td>
                    <a :href="`/company/view/${item.id}`">Контрагент </a>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data: () => ({
        payments: [],
        paymentHeaders: [
            { text: "Номер заявки", value: "id" },
            { text: "Проект", value: "project" },
            { text: "Счет", value: "bill" },
            { text: "Сумма", value: "amount" },
            { text: "Контрагент", value: "partner" },
            { text: "Дата", value: "date" },
            { text: "Статус", value: "status" },
        ],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/payments.json"
        );
        this.payments = await response.json();
    },
};
</script>
