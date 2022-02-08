<template>
    <div v-if="billLoaded">
        <v-card class="pa-2" outlined>
            <v-card-title>
                <h4 class="text-h4">Создание счета</h4>
            </v-card-title>
            <v-card-text>
                <div class="d-flex text-h4">
                    Проект:
                    <router-link
                        class="mr-4"
                        :to="'/project/view/' + project.id"
                    >
                        {{ project.name }}
                    </router-link>
                </div>
                <br />
                <div>
                    Руководитель:
                    <router-link class="mr-4" :to="'/user/' + manager.id"
                        >{{ manager.name }}
                    </router-link>
                </div>
                <br />
                <span class="mb-4">Требуемые позиции</span>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Поиск"
                    hide-details
                    class="mb-4"
                />
                <v-data-table
                    :headers="requestPositionsHeaders"
                    dense
                    :items="bill.positions"
                    class="elevation-1 row-pointer"
                    show-select
                    :search="search"
                    item-key="id"
                    :loading="!billLoaded"
                    v-model="selectedPositions"
                >
                    <template #item.index="{ item }">
                        <td>{{ bill.positions.indexOf(item) + 1 }}</td>
                    </template>
                    <template v-slot:item.delivered="{ item }">
                        <v-icon>{{
                            item.delivered === true || item.id == 1
                                ? "mdi-checkbox-marked-circle"
                                : "mdi-cancel"
                        }}</v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="primary"
                    :disabled="selectedPositions.length == 0"
                    @click="addPositionsToBill"
                >
                    Добавить в счет
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card class="pa-2" outlined>
            <v-card-text>
                <v-combobox
                    :items="companies"
                    item-text="name"
                    label="Выберите поставщика"
                />
                <span class="mb-4">Позиции, добавленные в счет</span>
                <v-data-table
                    :headers="billPositionsHeaders"
                    :items="billPositions"
                    dense
                    class="elevation-1 row-pointer"
                    show-select
                    :search="search"
                    item-key="id"
                >
                    <template v-slot:top>
                        <v-dialog v-model="dialogEdit">
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">Редактирование</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="
                                                        editedBillPosition
                                                            .position.good.name
                                                    "
                                                    label="Требуемый материал"
                                                    readonly
                                                    disabled
                                                />
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="
                                                        editedBillPosition
                                                            .position.value
                                                    "
                                                    :label="editFormLabelValue"
                                                    readonly
                                                    disabled
                                                />
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="
                                                        editedBillPosition
                                                            .position.date
                                                    "
                                                    label="Требуемая дата поставки"
                                                    readonly
                                                    disabled
                                                />
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="
                                                        editedBillPosition.value
                                                    "
                                                    label="Количество материла в счете"
                                                    min="0"
                                                    type="number"
                                                    :max="
                                                        editedBillPosition
                                                            .position.value
                                                    "
                                                />
                                            </v-col>
                                            <v-col>
                                                <v-menu
                                                    v-model="
                                                        dialogEditDateMenuShow
                                                    "
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
                                                                editedBillPosition.date
                                                            "
                                                            label="Необходимая дата доставки"
                                                            readonly
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        />
                                                    </template>
                                                    <v-date-picker
                                                        v-model="
                                                            editedBillPosition.date
                                                        "
                                                        @input="
                                                            dialogEditDateMenuShow = false
                                                        "
                                                        locale="ru-ru"
                                                        :weekday-format="
                                                            getCustomDay
                                                        "
                                                    />
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="
                                                        editedBillPosition.price
                                                    "
                                                    min="0"
                                                    type="number"
                                                    label="Цена материла в счете"
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
                        <v-dialog v-model="dialogDelete" max-width="300px">
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
                    </template>
                    <template #item.index="{ item }">
                        <td>
                            {{ billPositions.indexOf(item) + 1 }}
                        </td>
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
                                    : item.date
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
                                    : item.price
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
                <v-btn color="success" :disabled="billPositions.length == 0">
                    Создать счет
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        billLoaded: false,
        search: "",
        project: null,
        manager: null,
        billPositions: [],
        selectedPositions: [],
        dialogEditDateMenuShow: false,
        dialogEdit: false,
        dialogDelete: false,
        editedIndex: -1,
        defaultBillPosition: {
            position: {
                good: {
                    name: null,
                    measure: null,
                },
                value: null,
                date: null,
            },
            date: null,
            value: null,
            price: null,
        },
        editedBillPosition: {
            position: {
                good: {
                    name: null,
                    measure: null,
                },
                value: null,
                date: null,
            },
            date: null,
            value: null,
            price: null,
        },
        companies: [
            {
                id: 1,
                name: "Мир фанеры",
            },
            {
                id: 2,
                name: "Арматура inc",
            },
            {
                id: 3,
                name: 'ООО "Мир дверей"',
            },
        ],
        requestPositionsHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Наименование", value: "good.name" },
            { text: "Количество", value: "value" },
            { text: "Ед.изм", value: "good.measure" },
            { text: "Дата поставки", value: "date" },
            { text: "Доставлено", value: "delivered", width: "auto" },
        ],
        billPositionsHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Наименование", value: "position.good.name" },
            { text: "Ед.изм", value: "position.good.measure" },
            { text: "Колчество (заявка)", value: "position.value" },
            { text: "Дата поставки (заявка)", value: "position.date" },
            { text: "Количество (счет)", value: "value" },
            { text: "Дата поставки (счет)", value: "date" },
            { text: "Цена (счет)", value: "price" },
            { text: "Actions", value: "actions", sortable: false },
        ],
    }),
    methods: {
        addPositionsToBill() {
            this.selectedPositions.forEach((element) => {
                var addintingItem = Object.assign(
                    {},
                    {
                        position: {
                            good: element.good,
                            value: element.value,
                            date: element.date,
                        },
                        date: null,
                        value: null,
                        price: null,
                    }
                );
                this.billPositions.push(addintingItem);
            });
        },
        editItem(item) {
            this.editedIndex = this.billPositions.indexOf(item);
            this.editedBillPosition = Object.assign({}, item);
            this.dialogEdit = true;
        },

        deleteItem(item) {
            this.editedIndex = this.billPositions.indexOf(item);
            this.editedBillPosition = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.billPositions.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialogEdit = false;
            this.$nextTick(() => {
                this.editedBillPosition = Object.assign(
                    {},
                    this.defaultBillPosition
                );
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedBillPosition = Object.assign(
                    {},
                    this.defaultBillPosition
                );
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(
                    this.billPositions[this.editedIndex],
                    this.editedBillPosition
                );
            } else {
                this.billPositions.push(this.editedBillPosition);
            }
            this.close();
        },

        getCustomDay(date) {
            const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            let i = new Date(date).getDay(date);
            return daysOfWeek[i];
        },
    },
    computed: {
        editFormLabelValue() {
            if (this.editedBillPosition && this.editedBillPosition.position) {
                return (
                    "Количество, " +
                    this.editedBillPosition.position.good.measure
                );
            }
            return "";
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/bill.json"
        );
        this.bill = await response.json();

        response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/dev/data/projects.json"
        );
        var projects = await response.json();
        this.project = projects.find((p) => p.id == this.bill.id);

        response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/dev/data/users/users.json"
        );
        var users = await response.json();
        this.manager = users.find((p) => p.id == this.project.authorId);

        this.billLoaded = true;
    },
};
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
    cursor: pointer;
}
.link:hover {
    text-color: blue;
}
</style>
