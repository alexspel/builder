<template>
    <div v-if="bills.length > 0">
        <h2 class="text-h2 mb-4">Счета проекта</h2>
        <div class="mb-4">Проект: {{ bills[0].project.name }}</div>
        <div class="mb-4">Статус проекта: {{ bills[0].project.status }}</div>
        <v-data-table :headers="headers" :items="bills[0].positions">
            <template #item.index="{ item }">
                {{ bills[0].positions.indexOf(item) + 1 }}
            </template>
            <template v-slot:item.delivered="{ item }">
                {{ item.delivered === true ? "ДА" : "НЕТ" }}
            </template>
        </v-data-table>

        <router-link
            style="text-decoration: none; color: inherit"
            class="mr-4"
            to="/bill"
        >
            <v-btn color="primary"> Создать счет</v-btn>
        </router-link>
    </div>
</template>
<script>
export default {
    data: () => ({
        headers: [
            { text: "№ п/п", value: "index" },
            { text: "Наименование", value: "good.name" },
            { text: "Кол-во", value: "value" },
            { text: "Ед.изм.", value: "good.measure" },
            { text: "Необходимая дата поставки", value: "date" },
            { text: "Комментарий", value: "comment" },
            { text: "Ответственный", value: "manager.name" },
            { text: "№ счет", value: "id" },
            {
                text: "Планируемая дата поставки",
                value: "deliveryPlan",
            },
            { text: "Доставлено", value: "delivered" },
        ],
        bills: [],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/main/data/bills.json"
        );
        var data = await response.json();
        this.bills = data.filter((x) => x.id == 1);
    },
};
</script>
