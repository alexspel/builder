<template>
    <div>
        <v-card class="pa-2" outlined>
            <v-card-text>
                <h2 class="text-h2 mb-4">Создание заявки</h2>
                <v-combobox
                    label="Выберите проект"
                    :items="projects"
                    item-text="name"
                    return-object
                />

                <v-text-field
                    label="Названеи заявки"
                    v-model="requestName" 
                />

                <v-text-field
                    label="Статус заявки"
                    v-model="requestStatus"
                    disabled
                    readonly
                />

                <v-data-table
                    :headers="positionHeaders"
                    :items="positions"
                    dense
                    class="elevation-1 row-pointer"
                    :search="search"
                    item-key="id"
                >
                    <template v-slot:top>
                        <div class="d-flex justify-space-between">
                            <span class="text-h5 mb-4"
                                >Позиции заявки</span
                            >
                            <div>
                                <v-dialog
                                    v-model="dialogEdit"
                                    max-width="700px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="primary"
                                            class="mb-4"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            Добавить позицию
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="text-h5">{{
                                                editedIndex === -1
                                                    ? "Cоздание"
                                                    : "Редактирование"
                                            }}</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                        <v-combobox
                                                            :items="goods"
                                                            item-text="name"
                                                            label="Выберите позицию"
                                                            v-model="
                                                                selectedGood
                                                            "
                                                            @change="
                                                                onChangeGood(
                                                                    $event
                                                                )
                                                            "
                                                        />
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                editedPosition.value
                                                            "
                                                            :label="nameLabel"
                                                            type="number"
                                                        />
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                        <v-menu
                                                            v-model="dateShow"
                                                            :close-on-content-click="
                                                                false
                                                            "
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="auto"
                                                        >
                                                            <template
                                                                v-slot:activator="{
                                                                    on,
                                                                    attrs,
                                                                }"
                                                            >
                                                                <v-text-field
                                                                    v-model="
                                                                        editedPosition.date
                                                                    "
                                                                    label="Необходимая дата доставки"
                                                                    readonly
                                                                    v-bind="
                                                                        attrs
                                                                    "
                                                                    v-on="on"
                                                                />
                                                            </template>
                                                            <v-date-picker
                                                                v-model="
                                                                    editedPosition.date
                                                                "
                                                                @input="
                                                                    dateShow = false
                                                                "
                                                                locale="ru-ru"
                                                                :weekday-format="
                                                                    getCustomDay
                                                                "
                                                            />
                                                        </v-menu>
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                editedPosition.comment
                                                            "
                                                            label="Комментарий"
                                                            name="comment"
                                                            textarea
                                                        />
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                        <v-select
                                                            name="manager"
                                                            :items="managers"
                                                            v-model="
                                                                selectedManager
                                                            "
                                                            return-object
                                                            item-text="name"
                                                            label="Ответственный"
                                                        />
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                color="blue darken-1"
                                                text
                                                @click="save"
                                            >
                                                Сохранить
                                            </v-btn>
                                            <v-btn
                                                color="blue darken-1"
                                                text
                                                @click="close"
                                            >
                                                Отмена
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog
                                    v-model="dialogDelete"
                                    max-width="300px"
                                >
                                    <v-card>
                                        <v-card-title class="text-h5"
                                            >Удалить?</v-card-title
                                        >
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                color="blue darken-1"
                                                text
                                                outlined
                                                @click="deleteItemConfirm"
                                                >Да</v-btn
                                            >
                                            <v-btn
                                                color="blue darken-1"
                                                text
                                                outlined
                                                @click="closeDelete"
                                                >Отмена</v-btn
                                            >
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </div>
                    </template>
                    <template #item.index="{ item }">
                        {{ positions.indexOf(item) + 1 }}
                    </template>

                    <template v-slot:item.value="{ item }">
                        <td
                            :class="
                                item.value === null ? 'red white--text' : ''
                            "
                        >
                            {{
                                item.value === null
                                    ? "Количество не заполнено"
                                    : +item.value
                            }}
                        </td>
                    </template>
                    <template v-slot:item.date="{ item }">
                        <td
                            :class="item.date === null ? 'red white--text' : ''"
                        >
                            {{
                                item.date === null
                                    ? "Дата не заполнена"
                                    : item.date
                            }}
                        </td>
                    </template>
                    <template v-slot:item.price="{ item }">
                        <td
                            :class="
                                item.price === null ? 'red white--text' : ''
                            "
                        >
                            {{
                                item.price === null
                                    ? "Цена не заполнена"
                                    : +item.price
                            }}
                        </td>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" :disabled="positions.length == 0">
                    Сформировать заявку
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    methods: {
        editItem(item) {
            this.editedIndex = this.positions.indexOf(item);
            this.editedPosition = Object.assign({}, item);
            this.dialogEdit = true;
        },

        deleteItem(item) {
            this.editedIndex = this.positions.indexOf(item);
            this.editedPosition = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.positions.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialogEdit = false;
            this.$nextTick(() => {
                this.editedPosition = Object.assign({}, this.defaultPosition);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedPosition = Object.assign({}, this.defaultPosition);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(
                    this.positions[this.editedIndex],
                    Object.assign(this.editedPosition, {
                        good: this.selectedGood,
                        manager: this.selectedManager,
                    })
                );
            } else {
                this.positions.push(
                    Object.assign(this.editedPosition, {
                        good: this.selectedGood,
                        manager: this.selectedManager,
                    })
                );
            }
            this.close();
        },

        getCustomDay(date) {
            const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            let i = new Date(date).getDay(date);
            return daysOfWeek[i];
        },
        onChangeGood() {
            this.nameLabel = `Количество, ${this.selectedGood.measure}`;
        },
    },
    computed: {
        isFormValid: function () {
            return this.positions.length > 0 && this.name !== "";
        },
    },
    data: () => ({
        dateShow: false,
        search: "",
        addPositionForm: false,
        projects: [],
        selectedGood: {
            id: null,
            name: null,
            measure: null,
        },
        selectedManager: {
            id: null,
            name: null,
        },
        nameLabel: "Количество",
        requestName: null,
        requestStatus: "В работе",
        positions: [],
        dialogEditDateMenuShow: false,
        dialogEdit: false,
        dialogDelete: false,
        editedIndex: -1,
        selectedProject: {
            id: null,
            name: null,
        },
        defaultPosition: {
            good: {
                id: null,
                name: null,
                measure: null,
            },
            value: 0,
            date: null,
            comment: null,
            manager: {
                id: null,
                name: null,
            },
        },
        editedPosition: {
            good: {
                id: null,
                name: null,
                measure: null,
            },
            value: 0,
            date: null,
            comment: null,
            manager: {
                id: null,
                name: null,
            },
        },
        goods: [
            { id: 1, name: "Проволока тонкая", measure: "метров" },
            { id: 3, name: "Фанера", measure: "листов" },
            { id: 4, name: "Бетон", measure: "м3" },
            { id: 2, name: "Проволока толстая", measure: "метров" },
        ],
        positionHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Наименование", value: "good.name" },
            { text: "Кол-во", value: "value" },
            { text: "Ед.изм.", value: "good.measure" },
            { text: "Необходимая дата поставки", value: "date" },
            { text: "Комментарий", value: "comment" },
            { text: "Ответственный", value: "manager.name" },
            { text: "Действия", value: "actions", sortable: false },
        ],
        managers: [
            { id: 1, name: "Иванов И.И." },
            { id: 2, name: "Петров П.П." },
            { id: 3, name: "Сидоров В.В." },
        ],
    }),
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },
    async created() {
        // var response = await fetch(
        //     "https://raw.githubusercontent.com/alexspel/builder/main/data/request_statuses.json"
        // );
        // this.statuses = await response.json();

        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/projects.json"
        );
        this.projects = await response.json();
    },
};
</script>
