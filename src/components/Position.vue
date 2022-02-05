<template>
    <div>
        <v-row>
            <v-col>
                <h5 class="text-h5">Новая позиция</h5>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select
                    name="name"
                    :items="goods"
                    v-model="position.good"
                    item-text="name"
                    label="Наименование"
                    @change="onNameChange($event)"
                    return-object
                />
            </v-col>
            <v-col>
                <v-text-field
                    v-model="position.value"
                    name="value"
                    :label="nameLabel"
                    type="number"
                />
            </v-col>
            <v-col>
                <v-menu
                    v-model="dateShow"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="position.date"
                            label="Необходимая дата доставки"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        />
                    </template>
                    <v-date-picker
                        v-model="position.date"
                        @input="dateShow = false"
                        locale="ru-ru"
                        :weekday-format="getCustomDay"
                    />
                </v-menu>
            </v-col>
            <v-col>
                <v-text-field
                    v-model="position.comment"
                    label="Комментарий"
                    name="comment"
                    textarea
                />
            </v-col>
            <v-col>
                <v-select
                    name="manager"
                    :items="managers"
                    v-model="position.manager"
                    label="Ответственный"
                >
                </v-select>
            </v-col>
        </v-row>
        <v-row align-content-end>
            <v-col>
                <v-btn
                    color="primary"
                    class="mr-4"
                    :disabled="!isFormValid"
                    @click="onSubmit()"
                    x-small
                >
                    Добавить
                </v-btn>
                <v-btn color="error" @click="clearForm()" x-small
                    >Очистить</v-btn
                >
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    methods: {
        clearForm() {
            this.position = this.defaultPosition;
        },
        onSubmit() {
            this.$emit("position-add", this.position);
            if (this.clearOnSubmit) {
                this.clearForm();
            }
        },
        onNameChange() {
            this.nameLabel = `Количество, ${this.position.good.measure}`;
        },
        getCustomDay(date) {
            const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            let i = new Date(date).getDay(date);
            return daysOfWeek[i];
        },
    },
    data: () => ({
        dateShow: false,
        clearOnSubmit: false,
        nameLabel: "Количество", 
        goods: [
            { id: 1, name: "Проволока тонкая", measure: "метров" },
            { id: 2, name: "Проволока толстая", measure: "метров" },
            { id: 3, name: "Фанера", measure: "листов" },
        ],
        managers: ["Петров П.П.", "Иванов И.И.", "Сидоров В.В."],
        defaultPosition: {
            good: {
                name: null,
                measure: null,
            },
            name: "",
            date: "",
            value: 10,
            comment: "",
            manager: "Петров П.П.",
        },
        position: {
            good: {
                name: null,
                measure: null,
            },
            date: "2021-11-11",
            value: 10,
            comment: "Что-то такое",
            manager: "Петров П.П.",
        },
    }),
    computed: {
        isFormValid() {
            return (
                this.goods.indexOf(this.position.good) != -1 &&
                this.position.value * 1 > 0
            );
        },
    },
};
</script>
