<template>
    <div>
        <h2 class="text-h2 mb-4">Создание заявки</h2>
        <v-form>
            <h3 class="mb-4 font-weight-regular">
                Проект: {{ request.project.name }}
            </h3>
            <v-text-field
                name="requestName"
                label="Название заявки"
                v-model="request.name"
            />
            <v-select
                :items="statuses"
                v-model="request.status"
                label="Статус заявки"
            />
            <Position class="my-4" @position-add="addPosition" />
            <div v-if="request.positions.length > 0">
                <h5 class="text-h5">Добавленные позиций</h5>
                <v-data-table
                    :headers="positionHeaders"
                    :items="request.positions"
                >
                    <template #item.index="{ item }">
                        {{ request.positions.indexOf(item) + 1 }}
                    </template>
                </v-data-table>
            </div>
            <div v-else>Список позиций пуст</div>
            <v-text-field
                v-model="request.author.name"
                name="author"
                label="Автор заявки"
                readonly
                disabled
            />
            <v-btn :disabled="!isFormValid" color="primary" small
                >Сформировать заявку</v-btn
            >
        </v-form>
    </div>
</template>

<script>
import Position from "./Position";
export default {
    methods: {
        addPosition(position) {
            this.request.positions.push({
                id: this.request.positions.length + 1,
                ...position,
            });
        },
    },
    components: {
        Position,
    },
    computed: {
        isFormValid: function () {
            return (
                this.request.positions.length > 0 && this.request.name !== ""
            );
        },
    },
    data: () => ({
        addPositionForm: false,
        statuses: [],
        request: {
            id: null,
            name: null,
            project: {
                id: 1,
                name: "Дача",
                status: "В работе",
            },
            author: {
                id: 1,
                name: "Иванов И.И.",
            },
            status: "Новая",
            positions: [],
        },
        positionHeaders: [
            {
                text: "№ п/п",
                value: "index",
            },
            {
                text: "Наименование",
                value: "good.name",
            },
            {
                text: "Кол-во",
                value: "value",
            },
            {
                text: "Ед.изм.",
                value: "good.measure",
            },
            {
                text: "Необходимая дата поставки",
                value: "date",
            },
            {
                text: "Комментарий",
                value: "comment",
            },
            {
                text: "Ответственный",
                value: "manager",
            },
        ],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/main/data/request_statuses.json"
        );
        var data = await response.json();
        this.statuses = data;

        // response = await fetch(
        //     "https://raw.githubusercontent.com/alexspel/builder/main/data/users/users.json"
        // );
        // data = await response.json();
        // this.author = data.find((x) => x.id == 1);
    },
};
</script>
