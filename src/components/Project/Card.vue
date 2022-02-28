<template>
    <v-card class="pa-5">
        <v-row>
            <v-col>
                <v-card-text>
                    <h2 class="text-h2 mb-4">Карточка проекта</h2>
                </v-card-text>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card-text>
                    <div class="text-h5 mb-3">
                        <span class="font-weight-medium mr-2">
                            Название проекта:
                        </span>
                        {{ project.name }}
                    </div>
                    <div class="text-h5 mb-3">
                        <span class="font-weight-medium mr-2">
                            Статус проекта:
                        </span>
                        {{ status.name }}
                    </div>
                    <div class="text-h5 mb-3">
                        <span class="font-weight-medium mr-2">
                            Руководитель проекта:
                        </span>
                        <router-link
                            class="ml-2"
                            :to="`/project/view/${project.id}`"
                        >
                            {{ user.name }}
                        </router-link>
                    </div>
                    <div class="text-h5 mb-3">
                        <div>
                            <span class="font-weight-medium mr-2 mb-3">
                                Контрагент:
                            </span>
                            {{ getCompanyById(1).name }}
                        </div>
                    </div>
                    <div class="text-h5 mb-3">
                        <div>
                            <span class="font-weight-medium mr-2 mb-3">
                                Комментарий:
                            </span>
                            {{ project.comment }}
                        </div>
                    </div>
                </v-card-text>
            </v-col>
            <v-col>
                <div class="text-h5 font-weight-medium" @click="view">
                    Фотографии объекта
                </div>
                <v-carousel v-model="slide">
                    <v-carousel-item v-for="(color, i) in colors" :key="color">
                        <v-sheet :color="color" height="100%" tile>
                            <v-row
                                class="fill-height"
                                align="center"
                                justify="center"
                            >
                                <div class="text-h2">Photo {{ i + 1 }}</div>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <router-link
                    class="ml-2"
                    style="text-decoration: none; color: inherit"
                    :to="`/project/${project.id}/request`"
                >
                    <v-btn color="success" class="mr-4">Заявки</v-btn>
                </router-link>
                <router-link
                    class="ml-2"
                    style="text-decoration: none; color: inherit"
                    :to="`/project/${project.id}/request`"
                >
                    <v-btn color="success" class="mr-4">Счета</v-btn>
                </router-link>
            </v-col>
        </v-row>
    </v-card>
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
        ]),
    },
    methods: {
        view() {
            console.log(this.$store.state);
        },
    },
    data: () => ({
        slide: 0,
        colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
        user: {
            id: null,
            name: null,
        },
        status: {
            id: null,
            name: null,
        },
        project: {
            id: null,
            name: null,
            authorID: { id: null, name: null },
            statusUD: { id: null, name: null },
            contacts: [],
            documents: [],
        },
    }),
    created() {
        Promise.all([
            this.$store.dispatch("loadProjects"),
        ]).then(() => {
            this.project = this.getProjectById(this.$route.params.id);
            this.user = this.getUserById(this.project.authorID);
            this.status = this.getStatusById(this.project.statusID);
            this.loaded = true;
        });
    },
};
</script>
