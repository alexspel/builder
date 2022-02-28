<template>
    <div v-if="billLoaded">
        <v-card class="pa-2" outlined>
            <v-card-title class="text-h3 mb-2 font-weight-light">
                Создание счета
            </v-card-title>
            <v-card-text>
                <div class="text-h6 mb-1 font-weight-light">
                    Проект:
                    <router-link
                        class="ml-2"
                        :to="`/project/view/${project.id}`"
                    >
                        {{ project.name }}
                    </router-link>
                </div>
                <div class="text-h6 mb-1 font-weight-light">
                    Руководитель:
                    <router-link class="ml-2" :to="`/user/${manager.id}`">
                        {{ manager.name }}
                    </router-link>
                </div>
            </v-card-text>
        </v-card>

        <v-tabs v-model="tab">
            <v-tab>Распределение позиций</v-tab>
            <v-tab>Распределенные позиции</v-tab>
            <v-tab-item :key="0">
                <v-card class="pa-2" outlined>
                    <v-card-title>
                        <div class="text-h6 mb-3 font-weight-light">
                            Нераспределенные позиции
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="searchNotAttachedPositions"
                            append-icon="mdi-magnify"
                            label="Поиск"
                            hide-details
                            class="my-2"
                        />
                        <v-data-table
                            :headers="requestPositionsHeaders"
                            dense
                            :items="notAttachedPositions"
                            class="elevation-1 row-pointer"
                            show-select
                            :search="searchNotAttachedPositions"
                            item-key="id"
                            :loading="!billLoaded"
                            hide-default-footer
                            v-model="notAttachedSelectedPositions"
                        >
                            <template #item.index="{ item }">
                                <td>
                                    {{ notAttachedPositions.indexOf(item) + 1 }}
                                </td>
                            </template>
                            <template v-slot:item.delivered="{ item }">
                                <td>
                                    <v-icon>
                                        {{
                                            item.delivered === true
                                                ? "mdi-checkbox-marked-circle"
                                                : "mdi-cancel"
                                        }}
                                    </v-icon>
                                </td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            :disabled="notAttachedSelectedPositions.length == 0"
                            @click="addPositionsToBill"
                        >
                            Добавить в счет
                        </v-btn>
                    </v-card-actions>
                </v-card>

                <v-card class="pa-2" outlined>
                    <v-card-title>
                        <div class="text-h6 mb-3 font-weight-light">
                            Позиции, добавленные в счет
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-combobox
                            :items="companies"
                            item-text="name"
                            label="Поставщик"
                        />
                        <v-text-field
                            v-model="searchBillPositions"
                            append-icon="mdi-magnify"
                            label="Поиск"
                            hide-details
                            class="mb-4"
                        />
                        <v-data-table
                            :headers="billPositionsHeaders"
                            :items="billPositions"
                            dense
                            class="elevation-1 row-pointer"
                            show-select
                            hide-default-footer
                            :search="searchBillPositions"
                            item-key="id"
                            itemsPerPage="-1"
                        >
                            <template v-slot:top>
                                <v-dialog v-model="dialogEdit" max-width="50%">
                                    <v-card>
                                        <v-card-title>
                                            <span class="text-h5"
                                                >Редактирование</span
                                            >
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                editedBillPosition
                                                                    .position
                                                                    .good.name
                                                            "
                                                            label="Материал (заявка)"
                                                            readonly
                                                        />
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                editedBillPosition
                                                                    .position
                                                                    .value
                                                            "
                                                            :label="
                                                                editFormLabelValue
                                                            "
                                                            readonly
                                                        />
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                editedBillPosition
                                                                    .position
                                                                    .date
                                                            "
                                                            label="Дата поставки (заявка)"
                                                            readonly
                                                        />
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                editedBillPosition.value
                                                            "
                                                            label="Количество (счет)"
                                                            min="0"
                                                            type="number"
                                                            :max="
                                                                editedBillPosition
                                                                    .position
                                                                    .value
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
                                                                    label="Дата доставки (счет)"
                                                                    readonly
                                                                    v-bind="
                                                                        attrs
                                                                    "
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
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                editedBillPosition.price
                                                            "
                                                            min="0"
                                                            type="number"
                                                            label="Цена материла (счет)"
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
                            </template>
                            <template #item.index="{ item }">
                                <td>
                                    {{ billPositions.indexOf(item) + 1 }}
                                </td>
                            </template>
                            <template v-slot:item.value="{ item }">
                                <td
                                    :class="
                                        item.value === null
                                            ? 'red white--text'
                                            : ''
                                    "
                                >
                                    {{
                                        item.value === null
                                            ? "Количество не заполнено"
                                            : item.value
                                    }}
                                </td>
                            </template>
                            <template v-slot:item.date="{ item }">
                                <td
                                    :class="
                                        item.date === null
                                            ? 'red white--text'
                                            : ''
                                    "
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
                                        item.price === null
                                            ? 'red white--text'
                                            : ''
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
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(item)"
                                >
                                    mdi-pencil
                                </v-icon>
                                <v-icon small @click="deleteItem(item)">
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            color="success"
                            :disabled="billPositions.length == 0"
                        >
                            Создать счет
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>

            <v-tab-item :key="1">
                <v-card class="pa-2" outlined>
                    <v-card-title>
                        <div class="text-h6 mb-3 font-weight-light">
                            Распределенные позиции
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="searchAttachedPositions"
                            append-icon="mdi-magnify"
                            label="Поиск"
                            hide-details
                            class="mb-4"
                        />
                        <v-data-table
                            :headers="requestPositionsHeaders"
                            dense
                            hide-default-footer
                            :items="attachedPositions"
                            class="elevation-1 row-pointer"
                            :search="searchAttachedPositions"
                            item-key="id"
                            :loading="!billLoaded"
                        >
                            <template #item.index="{ item }">
                                <td>
                                    {{ attachedPositions.indexOf(item) + 1 }}
                                </td>
                            </template>
                            <template v-slot:item.delivered="{ item }">
                                <td>
                                    <v-icon>
                                        {{
                                            item.delivered === true
                                                ? "mdi-checkbox-marked-circle"
                                                : "mdi-cancel"
                                        }}
                                    </v-icon>
                                </td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "getProjectById",
            "getStatusById",
            "getUserById",
            "getCompanyById",
            "getGoodById",
        ]),
        editFormLabelValue() {
            if (this.editedBillPosition && this.editedBillPosition.position) {
                return (
                    "Требуемое количество, " +
                    this.editedBillPosition.position.good.measure
                );
            }
            return "";
        },
    },
    data: () => ({
        tab: 0,
        billLoaded: false,

        searchAttachedPositions: "",
        searchNotAttachedPositions: "",
        searchBillPositions: "",

        project: { id: null, name: null },
        manager: { id: null, name: null },

        billPositions: [],
        notAttachedSelectedPositions: [],
        notAttachedPositions: [],
        attachedPositions: [],

        dialogEditDateMenuShow: false,
        dialogEdit: false,
        dialogDelete: false,
        editedIndex: -1,

        requestPositions: [],

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
        companies: [],
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
            { text: "Действия", value: "actions", sortable: false },
        ],
        selectedProject: {
            name: "",
            author: {
                id: 1,
                name: "Иванов И.И.",
            },
        },
    }),
    methods: {
        addPositionsToBill() {
            this.notAttachedSelectedPositions.forEach((element) => {
                var addintingItem = Object.assign(
                    {},
                    {
                        position: {
                            good: element.good,
                            value: element.value,
                            date: element.date,
                        },
                        date: element.date,
                        value: element.value,
                        price: 0.0,
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
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },
    created() {
        Promise.all([
            this.$store.dispatch("loadProjects"),
        ]).then(() => {
            this.project = this.getProjectById(this.$route.params.id);
        });
    },
};
</script>
