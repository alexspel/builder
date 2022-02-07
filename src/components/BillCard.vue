<template>
    <div v-if="billLoaded">
        <v-data-table
            headers="headers"
            items="items"
            hide-actions
            class="elevation-1"
            select-all
            show-select
            pagination.sync="pagination"
            item-key="id"
            loading="true"
            search="search"
        >
        </v-data-table>
    </div>
</template>

<script>
export default {
    data: () => ({
        billLoaded: false,
        bill: null,
        headers: [
            { text: "Наименование", value: "name" },
            { text: "Количество", value: "name" },
        ],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/bill.json"
        );
        this.bill = await response.json();
    },
};
</script>
