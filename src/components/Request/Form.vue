<template>
    <div>
        <v-card class="pa-2" outlined>
            <v-card-text>
                <h2 class="text-h2 mb-4">Создание заявки</h2>
                <v-combobox
                    label="Выберите проект"
                    :items="getProjects"
                    v-model="requestProject"
                    item-text="name"
                    return-object
                />

                <v-text-field label="Названеи заявки" v-model="requestName" />
                <v-combobox
                    label="Статус заявки"
                    :items="getProjects"
                    v-model="requestStatus"
                    disabled
                    item-text="name"
                    readonly
                    return-object
                />

                <v-data-table
                    :headers="positionHeaders"
                    :items="requestPositions"
                    dense
                    class="elevation-1 row-pointer"
                    item-key="id"
                >
                    <template v-slot:top>
                        <div class="d-flex justify-space-between">
                            <span class="text-h5 mb-4">Позиции заявки</span>
                            <div>
                                <v-dialog
                                    v-model="positionDialog"
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
                                            <span class="text-h5">
                                                {{
                                                    positionEditedIndex === -1
                                                        ? "Cоздание"
                                                        : "Редактирование"
                                                }}
                                            </span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="6"
                                                    >
                                                        <v-list dense>
                                                            <v-subheader>
                                                                Категории
                                                                товаров
                                                            </v-subheader>
                                                            <v-list-item-group
                                                                v-model="
                                                                    positionCategory
                                                                "
                                                                color="primary"
                                                            >
                                                                <v-list-item
                                                                    v-for="(
                                                                        item, i
                                                                    ) in getCategories"
                                                                    :key="i"
                                                                >
                                                                    <v-list-item-content>
                                                                        <v-list-item-title
                                                                            v-text="
                                                                                item.name
                                                                            "
                                                                        ></v-list-item-title>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                            </v-list-item-group>
                                                        </v-list>
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="6"
                                                    >
                                                        <v-combobox
                                                            :items="getGoods"
                                                            item-text="name"
                                                            label="Выберите позицию"
                                                            v-model="
                                                                positionGood
                                                            "
                                                            return-object
                                                        />
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="6"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                positionValue
                                                            "
                                                            :label="nameLabel"
                                                            type="number"
                                                        />
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="6"
                                                    >
                                                        <v-menu
                                                            v-model="
                                                                positionDateDialog
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
                                                                        positionDate
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
                                                                    positionDate
                                                                "
                                                                @input="
                                                                    positionDateDialog = false
                                                                "
                                                                locale="ru-ru"
                                                                :weekday-format="
                                                                    getCustomDay
                                                                "
                                                            />
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="6"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                positionComment
                                                            "
                                                            label="Комментарий"
                                                            name="comment"
                                                            textarea
                                                        />
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="6"
                                                    >
                                                        <v-select
                                                            name="manager"
                                                            :items="getUsers"
                                                            v-model="
                                                                positionManager
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
                                            >
                                                Да
                                            </v-btn>
                                            <v-btn
                                                color="blue darken-1"
                                                text
                                                outlined
                                                @click="closeDelete"
                                            >
                                                Отмена
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </div>
                    </template>
                    <template #item.index="{ item }">
                        {{ requestPositions.indexOf(item) + 1 }}
                    </template>
                    <template v-slot:item.value="{ item }">
                        <td :class="+item.value === 0 ? 'red white--text' : ''">
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
                                    : new Date(item.date).toLocaleDateString()
                            }}
                        </td>
                    </template>
                    <template v-slot:item.good="{ item }">
                        <td>
                            {{ item.good.name }}
                        </td>
                    </template>
                    <template v-slot:item.measure="{ item }">
                        <td>
                            {{ item.good.measure }}
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
                <v-btn
                    color="success"
                    :disabled="requestPositions.length == 0 && !true"
                    @click="saveRequest"
                >
                    Сформировать заявку
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters([
            "getCategories",
            "getUsers",
            "getGoods",
            "getProjects",
            "getGoodById",
            "getStatusById",
            "getCompanyById",
            "getUserById",
            "getProjectById",
            "getPositionsByRequestId",
        ]),
    },
    methods: {
        view() {
            console.log(this.$store.state.projects);
        },
        editItem(item) {
            this.editedIndex = this.requestPositions.indexOf(item);
            this.positionCategory = item.category;
            this.positionGood = item.good;
            this.positionValue = item.value;
            this.positionDate = item.date;
            this.positionComment = item.comment;
            this.positionManager = item.manager;
        },

        deleteItem(item) {
            this.editedIndex = this.requestPositions.indexOf(item);
            this.editedPosition = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.requestPositions.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.positionDialog = false;
            this.$nextTick(() => {
                this.editedPosition = Object.assign({}, this.defaultPosition);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedIndex = -1;
                this.positionCategory = this.defaultCategory;
                this.positionGood = this.defaultGood;
                this.positionValue = null;
                this.positionDate = null;
                this.positionComment = null;
                this.positionManager = this.defaultManger;
            });
        },

        save() {
            var position = Object.assign(
                {},
                {
                    category: this.positionCategory,
                    good: this.positionGood,
                    value: this.positionValue,
                    manager: this.positionManager,
                    comment: this.positionComment,
                    date: this.positionDate,
                }
            );
            if (this.editedIndex > -1) {
                Object.assign(
                    this.requestPositions[this.editedIndex],
                    position
                );
            } else {
                this.requestPositions.push(position);
            }

            this.close();
        },
        saveRequest() {
            this.$store.dispatch("saveRequest", {
                request: {
                    name: this.requestName,
                    projectID: this.requestProject.id,
                    statusID: this.requestStatus.id,
                    authorID: 1,
                },
            });
        },

        getCustomDay(date) {
            const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            let i = new Date(date).getDay(date);
            return daysOfWeek[i];
        },
        onChangeGood() {
            this.nameLabel = `Количество, ${this.positionGood.measure}`;
        },
    },
    data: () => ({
        requestProject: {
            id: null,
            name: null,
        },
        requestName: null,
        requestStatus: {
            id: null,
            name: null,
        },
        requestPositions: [],

        positionGood: {
            id: null,
            name: null,
        },
        positionCategory: { id: null, name: null },
        positionValue: 0,
        positionDate: null,
        positionComment: null,
        positionManager: {
            id: null,
            name: null,
        },
        positionEditedIndex: -1,
        positionDateDialog: false,

        positionDialog: false,

        dialogDelete: false,
        nameLabel: "Количество",

        defaultCategory: { id: null, name: null },
        defaultGood: { id: null, name: null },
        defaultManger: { id: null, name: null },

        positionHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Наименование", value: "good" },
            { text: "Кол-во", value: "value" },
            { text: "Ед.изм.", value: "measure" },
            { text: "Необходимая дата поставки", value: "date" },
            { text: "Комментарий", value: "comment" },
            { text: "Ответственный", value: "manager.name" },
            { text: "Действия", value: "actions", sortable: false },
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
    created() {
        this.$store.dispatch("loadProjects");
        this.$store.dispatch("loadStatuses");
        this.$store.dispatch("loadGoods");
        this.$store.dispatch("loadUsers");
        this.requestStatus = this.getStatusById(1);
    },
};
</script>
