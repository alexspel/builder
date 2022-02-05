<template>
    <div>
        <v-form>
            <v-row>
                <v-col>
                    <v-menu
                        v-model="showCalendar"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="Дата"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            />
                        </template>
                        <v-date-picker
                            v-model="date"
                            @input="showCalendar = false"
                        />
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field name="amount" label="Сумма" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-select
                        :items="statuses"
                        v-model="status"
                        label="Статус"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="success">Сохранить</v-btn>
                    <v-btn color="warning">Удалить</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
export default {
    data: () => ({
        showCalendar: false,
        status: "Не оплачен",
        statuses: ["Не оплачен", "Отсрочка"],
    }),
};
</script>
