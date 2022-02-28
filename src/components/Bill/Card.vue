<template>
    <div v-if="loaded">
        <v-card class="pa-2" outlined>
            <v-card-title class="text-h3 mb-2 font-weight-light">
                Cчет {{ bill.id }}
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
                <div class="text-h4 mb-3 font-weight-light">
                    Позиции, добавленные в счет
                </div>
                <div class="text-h6 mb-1 font-weight-light">
                    Поставщик:
                    <router-link class="ml-2" :to="`/user/${manager.id}`">
                        {{ provider.name }}
                    </router-link>
                </div>
                <v-data-table
                    :headers="goodHeaders"
                    :items="goods"
                    dense
                    class="elevation-1 row-pointer"
                    item-key="id"
                >
                    <template v-slot:item.name="{ item }">
                        <td>{{ getGoodById(item.goodID).name }}</td>
                    </template>
                    <template v-slot:item.measure="{ item }">
                        <td>{{ getGoodById(item.goodID).measure }}</td>
                    </template>
                    <template v-slot:item.value="{ item }">
                        <td>{{ item.value }}</td>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "getBills",
            "getBillById",
            "getProjectById",
            "getStatusById",
            "getPositionsByRequestId",
            "getCompanyById",
            "getPayments",
            "getGoodById",
            "getUserById",
        ]),
    },
    data: () => ({
        loaded: false,
        bill: null,
        project: null,
        provider: null,
        manager: null,
        goods: [],

        goodHeaders: [
            { text: "№ п/п", value: "id" },
            { text: "Наименование", value: "name" },
            { text: "Ед.изм", value: "measure" },
            { text: "Количество", value: "value" },
        ],
    }),
    created() {
        Promise.all([
            this.$store.dispatch("loadProjects"),
            this.$store.dispatch("loadBills"),
        ]).then(() => {
            this.bill = this.getBillById(this.$route.params.id);
            this.goods = this.getPositionsByRequestId(this.bill.requestID);
            this.provider = this.getCompanyById(this.bill.companyID);
            this.project = this.getProjectById(this.bill.projectID);
            this.manager = this.getUserById(this.project.authorID);
            console.log(this.project);
            console.log(this.manager);
            console.log(this.bill);
            console.log(this.goods);
            this.loaded = true;
        });
    },
};
</script>
