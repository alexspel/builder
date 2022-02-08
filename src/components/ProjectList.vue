<template>
    <div>
        <h2 class="text-h2 mb-4">Мои проекты</h2>
        <v-data-table
            :headers="headers"
            :items="projects" 
            class="elevation-1"
            item-key="id"
            loading="true"
        >
            <template v-slot:item.links="{ item }">
                <v-btn
                    class="mx-4"
                    color="success"
                    :to="'/project/request/' + item.id"
                >
                    Заявки
                </v-btn>
                <v-btn
                    class="mx-4"
                    color="success"
                    :to="'/project/bill/' + item.id"
                >
                    Счета
                </v-btn>
            </template>
        </v-data-table>
        <div class="mt-4">
            <router-link
                style="text-decoration: none; color: inherit"
                to="/project/create"
            >
                <v-btn color="primary" small>Создать проект</v-btn>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        projects: [],
        headers: [
            { text: "ID", value: "id" },
            { text: "Название проекта", value: "name" },
            { text: "Статус", value: "status" },
            { text: "Автор", value: "author.name" },
            { text: "", value: "links" },
        ],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/projects.json"
        );
        var data = await response.json();
        this.projects = data;
    },
};
</script>
