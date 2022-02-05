<template>
    <div>
        <h2 class="text-h2 mb-4">Заявки для согласования</h2>
        <div
            v-for="request in requests"
            :key="request.id"
            class="my-4 pb-4"
            style="border-bottom: 1px solid #ccc"
        >
            <div class="mb-1">
                <div>
                    <b>Заявка №{{ request.id }}</b>
                </div>
                <b>Проект:</b> {{ request.project.name }};
                <b>Статус проекта:</b>
                {{ request.project.status }}
            </div>
            <h5 class="text-h5 mb-2">Перечень позиций:</h5>
            <v-data-table :headers="positionHeaders" :items="request.positions">
                <template #item.index="{ item }">
                    {{ request.positions.indexOf(item) + 1 }}
                </template>
            </v-data-table>
            <v-btn color="primary" class="mr-4">Согласовать</v-btn>
            <v-btn color="error" class="mr-4">Отклонить</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        requests: [],
        positionHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Наименование", value: "good.name" },
            { text: "Кол-во", value: "value" },
            { text: "Ед.изм", value: "good.measure" },
            { text: "Необходимая дата доставки", value: "date" },
            { text: "Комментарий", value: "comment" },
            { text: "Ответственный", value: "manager.name" },
        ],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/main/data/requests.json"
        );
        var data = await response.json();
        this.requests = data;
    },
};
</script>
