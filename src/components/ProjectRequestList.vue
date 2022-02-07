<template>
    <div>
        <h2 class="text-h2 mb-4">Проект: {{ project.name }}</h2>
        <div class="mb-4">Комментарий: {{ project.comment }}</div>
        <div class="mb-4">Статус проекта: {{ project.status }}</div>
        <div v-for="(request, index) in project.requests" :key="request">
            <div class="text-h4 mb-2">Заявка №{{ index + 1 }}</div>
            <div class="text-h4 mb-2">{{ request.name }}</div>
            <v-data-table :headers="positionHeaders" :items="request.positions">
                <template #item.index="{ item }">
                    {{ request.positions.indexOf(item) + 1 }}
                </template>
                <template v-slot:item.delivered="{ item }">
                    {{ item.status === "Доставлено" ? "ДА" : "НЕТ" }}
                </template>
            </v-data-table>
        </div>

        <router-link
            style="text-decoration: none; color: inherit"
            to="/request/create"
        >
            <v-btn color="primary" small>Создать Заявку</v-btn>
        </router-link>
    </div>
</template>

<script>
export default {
    data: () => ({
        project: {
            id: 1,
            name: "Дача",
            comment: "Дача генерала",
            status: "В работе",
            author: null,
            requests: [],
        },
        positionHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Наименование", value: "good.name" },
            { text: "Кол-во", value: "value" },
            { text: "Ед.изм", value: "good.measure" },
            { text: "Необходимая дата доставки", value: "date" },
            { text: "Комментарий", value: "comment" },
            { text: "Ответственный", value: "manager.name" },
            { text: "Доставлено", value: "delivered" },
        ],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/main/data/requests.json"
        );
        var data = await response.json();
        this.project.requests = data.filter((x) => x.project.id == 1);

        response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/main/data/users/users.json"
        );
        data = await response.json();
        this.author = data.find((x) => x.id == 1);
    },
};
</script>
