<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">Реестр проектов</h2>
        </v-card-title>
        <v-card-text>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Поиск"
                hide-details
                class="mb-4"
            />
            <v-data-table
                :headers="headers"
                :items="projects"
                class="elevation-1"
                item-key="id"
                :search="search"
            >
                <template v-slot:item.name="{ item }">
                    <td>
                        <router-link :to="'/project/view/' + item.id">
                            {{ item.name }}
                        </router-link>
                    </td>
                </template>
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
        </v-card-text>
        <v-card-actions>
            <div class="mt-4">
                <router-link
                    style="text-decoration: none; color: inherit"
                    to="/project/create"
                >
                    <v-btn color="primary">Создать проект</v-btn>
                </router-link>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        search: "",
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
        this.projects = await response.json();
    },
};
</script>
