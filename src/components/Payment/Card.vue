<template>
    <v-card>
        <v-card-title primary-title class="text-h4">
            Карточка счета №{{ bill.id }}
        </v-card-title>
        <v-card-text>
            <div v-for="(v, i) in Object.keys(bill)" :key="i">
                {{ v }}: {{ bill[v] }}
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "getBills",
            "getProjectById",
            "getStatusById",
            "getPositionsByRequestId",
            "getCompanyById",
        ]),
    },
    methods: {
        applyData(d) {
            console.log(d);
            this.bill = d;
        },
    },
    data: () => ({
        bill: null,
    }),
    created() {
        Promise.all([
            this.$store.dispatch("loadPaymentById", this.$route.params.id),
        ]).then(this.applyData);
    },
};
</script>
