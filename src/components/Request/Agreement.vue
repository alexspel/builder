<template>
    <div>
        <v-card class="pa-2" outlined>
            <v-card-title>
                <h2 class="text-h2 mb-4">Заявки для согласования</h2>
            </v-card-title>
        </v-card>
        <div v-for="request in requests" :key="request.id" class="my-2">
            <v-card class="pa-2" outlined>
                <v-card-text>
                    <div class="mb-1 text-h5">
                        <div>
                            <b>Заявка №{{ request.id }}</b>
                        </div>
                        <div>
                            <b>Проект:</b>
                            <a
                                class="ml-1"
                                :href="`/project/view/${request.project.id}`"
                            >
                                {{ request.project.name }}
                            </a>
                        </div>
                        <div>
                            <b>Статус проекта:</b> {{ request.project.status }}
                        </div>
                    </div>
                    <div class="mb-1 text-h5">Перечень позиций:</div>
                    <v-data-table
                        :headers="positionHeaders"
                        :items="request.positions"
                    >
                        <template #item.index="{ item }">
                            {{ request.positions.indexOf(item) + 1 }}
                        </template>
                    </v-data-table> 
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" class="mr-4" @click="dialog = true"
                        >Решение</v-btn
                    >
                </v-card-actions>
            </v-card>
        </div>
        <v-dialog
            v-model="dialog"
            scrollable
            persistent
            max-width="500px"
            transition="dialog-transition"
        >
            <v-card>
                <v-card-title primary-title> Решение по заявке </v-card-title>
                <v-card-text>
                    <v-textarea
                        label="Комментарий"
                        :value="comment"
                        textarea
                        solo
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" class="mr-4" @click="dialog = false"
                        >Согласовать</v-btn
                    >
                    <v-btn color="error" class="mr-4">Отклонить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        requests: [],
        comment: "",
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
        this.requests = await response.json();
    },
};
</script>
