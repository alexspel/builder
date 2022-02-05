<template>
    <div>
        <h2 class="text-h2 mb-4">Создание проекта</h2>
        <v-form>
            <v-text-field label="Название проект" v-model="project.name" />
            <v-select
                label="Статус проекта"
                :items="statuses"
                return-object
                v-model="project.status"
                item-text="name"
            />
            <v-text-field label="Комментарий" v-model="project.comment" />
            <v-text-field
                label="Кем создан"
                v-model="project.author.name"
                readonly
                disabled
            />
            <v-btn v-if="project.id === null" color="primary"> Создать </v-btn>
            <v-btn v-if="project.id !== null" color="primary" class="mr-4">
                Сохранить
            </v-btn>
            <v-btn v-if="project.id !== null" color="error" class="mr-4"
                >Удалить</v-btn
            >
        </v-form>
    </div>
</template>

<script>
export default {
    data: () => ({
        statuses: [],
        project: {
            id: null,
            name: null,
            status: null,
            comment: null,
            author: {
                id: 1,
                name: "Иванов И.И.",
            },
        },
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/main/data/project_statuses.json"
        );
        var data = await response.json();
        this.statuses = data;        
    },
};
</script>

<style lang="scss" scoped></style>
