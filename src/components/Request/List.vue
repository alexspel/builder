<template>
    <v-card class="pa-2" outlined>
        <v-card-title>
            <h2 class="text-h2 mb-4">Реестр счетов</h2>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="billListHeaders"
                :items="bills"
                :expanded.sync="expanded"
                show-expand
                item-key="id"
                class="blue-grey lighten-5"
            >
                <template v-slot:item.project="{ item }">
                    <td>
                        <router-link
                            class="mr-4"
                            :to="'/project/view/' + item.project.id"
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
    </v-card>
</template>

<script>
export default {
    data: () => ({
        requests: [],
        async created() {
            var response = await fetch(
                "https://raw.githubusercontent.com/alexspel/builder/billcard/data/requests.json"
            );
            this.requests = await response.json();
        },
    }),
};
</script>
