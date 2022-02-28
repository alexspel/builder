<template>
    <v-card class="pa-2" outlined v-if="loaded">
        <v-card-title>
            <h2 class="text-h2 mb-4">Реестр заявок проекта</h2>
        </v-card-title>
        <v-card-text>
            <div class="text-h5 mb-4">Название проекта: {{ project.name }}</div>
            <div class="text-h5 mb-4">
                Контрагент: {{ getCompanyById(1).name }}
            </div>
            <div class="text-h5 mb-4">Заявки проекта:</div>
            <v-data-table
                :headers="requestHeaders"
                :items="getRequests"
                :expanded.sync="expanded"
                show-expand
                item-key="id"
                class="blue-grey lighten-5"
            >
                <template v-slot:item.index="{ item }">
                    <td>
                        {{ getRequests.indexOf(item) + 1 }}
                    </td>
                </template>
                <template v-slot:item.request="{ item }">
                    <td>
                        <router-link
                            class="mr-4"
                            :to="`/request/view/${item.projectID}`"
                        >
                            {{ item.name }}
                        </router-link>
                    </td>
                </template>
                <template v-slot:item.positions="{ item }">
                    <td>
                        {{ getPositionsByRequestId(item.id).length }}
                    </td>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" style="padding: 0">
                        <v-data-table
                            :items="getPositionsByRequestId(item.id)"
                            :headers="positionHeaders"
                        >
                            <template v-slot:item.index="{ item }">
                                <td>
                                    {{
                                        getPositionsByRequestId(
                                            item.requestID
                                        ).indexOf(item) + 1
                                    }}
                                </td>
                            </template>
                            <template v-slot:item.good="{ item }">
                                <td>
                                    {{ getGoodById(item.goodID).name }}
                                </td>
                            </template>
                            <template v-slot:item.measure="{ item }">
                                <td>
                                    {{ getGoodById(item.goodID).measure }}
                                </td>
                            </template>
                            <template v-slot:item.date="{ item }">
                                <td>
                                    {{
                                        new Date(item.date).toLocaleDateString()
                                    }}
                                </td>
                            </template>
                            <template v-slot:item.manager="{ item }">
                                <td>
                                    {{ getUserById(item.managerID).name }}
                                </td>
                            </template>
                        </v-data-table>
                    </td>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "getRequests",
            "getProjectById",
            "getStatusById",
            "getUserById",
            "getGoodById",
            "getCompanyById",
            "getPositionsByRequestId",
        ]),
    },
    data: () => ({
        loaded: false,
        project: { id: null, name: null },
        expanded: [],
        requests: [],
        requestHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Название заявки", value: "request" },
            { text: "Количество позиций", value: "positions" },
        ],
        positionHeaders: [
            { text: "№ п/п", value: "index" },
            { text: "Наименование", value: "good" },
            { text: "Кол-во", value: "value" },
            { text: "Ед.изм", value: "measure" },
            { text: "Необходимая дата доставки", value: "date" },
            { text: "Комментарий", value: "comment" },
            { text: "Ответственный", value: "manager" },
            { text: "Доставлено", value: "delivered" },
        ],
    }),
    created() {
        Promise.all([
            this.$store.dispatch("loadProjects"),
            this.$store.dispatch(
                "loadRequestsByProjectId",
                this.$route.params.id
            ),
        ]).then(() => {
            this.project = this.getProjectById(this.$route.params.id);
            this.loaded = true;
        });
    },
};
</script>
