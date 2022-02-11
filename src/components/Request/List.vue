<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">Реестр заявок</h2>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="requestHeaders"
                :items="requests"
                :expanded.sync="expanded"
                show-expand
                item-key="id"
                class="blue-grey lighten-5"
            >
                <template #item.index="{ item }">
                    <td>{{ requests.indexOf(item) + 1 }}</td>
                </template>
                <template v-slot:item.name="{ item }">
                    <td>
                        <router-link
                            class="mr-4"
                            :to="`/request/view/${item.id}`"
                        >
                            {{ item.name }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.project="{ item }">
                    <td>
                        <router-link
                            class="mr-4"
                            :to="`/project/view/${item.project.id}`"
                        >
                            {{ item.project.name }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.partner="{ item }">
                    <td>
                        {{ item.partner.name }}
                    </td>
                </template>
                <template v-slot:item.positions="{ item }">
                    <td>
                        {{ item.positions.length }}
                    </td>
                </template>
                <template v-slot:item.sum="{ item }">
                    <td>
                        {{
                            item.positions
                                .map((p) => +p.value * +p.price)
                                .reduce((p, c) => p + c)
                                .toLocaleString()
                        }}
                    </td>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" style="padding: 0">
                        <v-data-table
                            :items="item.positions"
                            :headers="positionHeaders"
                        >
                        </v-data-table>
                    </td>
                </template>
                <template slot="body.append">
                    <tr class="pink--text">
                        <th class="title"></th>
                        <th class="title">Итого</th>
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title">{{ sumField("protein") }}</th>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
        <v-card-actions class="pa-4">
            <router-link
                style="text-decoration: none; color: inherit"
                to="/request/create"
            >
                <v-btn color="primary">Создать Заявку</v-btn>
            </router-link>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    methods: {
        sumField() {
            return 0;
        },
    },
    data: () => ({
        requestHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Название заявки", value: "name" },
            { text: "Проект", value: "project" },
            { text: "Количество позиций", value: "positions" },
        ],
        positionHeaders: [
            { text: "Наименование", value: "good.name" },
            { text: "Количество", value: "value" },
            { text: "Цена за ед, руб", value: "price" },
            { text: "Ед.изм", value: "good.measure" },
            { text: "Требуемая дата поставки", value: "date" },
            { text: "Планируемая дата поставки", value: "deliveryPlan" },
            { text: "Фактическая дата поставки", value: "deliveryFact" },
            { text: "Статус", value: "status" },
        ],
        expanded: [],
        requests: [],
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/requests.json"
        );
        this.requests = await response.json();
        console.log(this.requests);
    },
};
</script>
