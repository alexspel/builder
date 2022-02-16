<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">
                Проект:
                <router-link :to="`/project/view/${project.id}`">
                    {{ project.name }}
                </router-link>
            </h2>
        </v-card-title>
        <v-card-text>
            <div class="mb-4">Комментарий: {{ project.comment }}</div>
            <div class="mb-4">Статус проекта: {{ project.status }}</div>
            <v-data-table :headers="positionHeaders" :items="request.positions">
                <template #item.index="{ item }">
                    {{ request.positions.indexOf(item) + 1 }}
                </template>
                <template v-slot:item.delivered="{ item }">
                    {{ item.status === "Доставлено" ? "ДА" : "НЕТ" }}
                </template>
            </v-data-table>

            <router-link
                style="text-decoration: none; color: inherit"
                to="/request/create"
            >
                <v-btn color="primary">Создать Заявку</v-btn>
            </router-link>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        request: {},
        project: {
            id: null,
            name: null,
            comment: null,
            status: null,
            author: {
                id: null,
                name: null,
            },
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
        var id = +this.$route.params.id;
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/requests.json"
        );
        var requests = await response.json();
        this.request = requests.find((r) => +r.id === id);

        console.log("request");
        console.log(this.request);
        response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/projects.json"
        );
        var allProjects = await response.json();
        this.project = allProjects.find(
            (p) => +p.id === +this.request.project.id
        );
        console.log("project");
        console.log(this.project);
        // this.project.requests = data.filter((x) => x.id == 1);

        // response = await fetch(
        //     "https://raw.githubusercontent.com/alexspel/builder/main/data/users/users.json"
        // );
        // data = await response.json();
        // this.author = data.find((x) => x.id == +id);
    },
};
</script>
