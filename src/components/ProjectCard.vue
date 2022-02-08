<template>
    <div>
        <v-card class="pa-5">
            <v-row>
                <v-col>
                    <v-card-text>
                        <h2 class="text-h2 mb-4">
                            Карточка проекта {{ project.name }}
                        </h2>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card-text>
                        <div class="text-h5 mb-3">
                            <span class="font-weight-medium"
                                >Статус проекта:</span
                            >
                            {{ project.status }}
                        </div>
                        <div class="text-h5 mb-3" v-if="project.comment">
                            <span class="font-weight-medium">Комментарий:</span>
                            {{ project.comment }}
                        </div>
                        <div class="text-h5 mb-3">
                            <span class="font-weight-medium"> Адрес: </span>
                            {{ project.address }}
                        </div>
                        <div class="text-h5">
                            <span class="font-weight-medium">
                                Информация о контрагенте:
                            </span>
                            {{ project.partner.name }}
                        </div>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title
                                        v-for="contact in project.partner
                                            .contacts"
                                        :key="contact.id"
                                        class="text-h5 mb-3"
                                    >
                                        {{ contact.name }}
                                        {{ contact.email || contact.phone }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <div v-if="project.documents">
                            <span class="text-h5 font-weight-medium">
                                Документы проекта:
                            </span>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            v-for="document in project.documents"
                                            :key="document.id"
                                            class="text-h5 mb-3"
                                        >
                                            <a :href="document.link">{{
                                                document.name
                                            }}</a>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </div>
                    </v-card-text>
                </v-col>
                <v-col>
                    <div class="text-h5 font-weight-medium">
                        Фотографии объекта
                    </div>
                    <v-carousel v-model="slide">
                        <v-carousel-item
                            v-for="(color, i) in colors"
                            :key="color"
                        >
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
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({ 
        slide: 0,
        colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
        project: {
            name: null,
            author: null,
            comment: null,
            status: null,
            address: null,
            documents: [],
            partner: {
                name: null,
                contacts: [],
            },
            contacts: [],
        },
    }),
    async created() {
        var response = await fetch(
            "https://raw.githubusercontent.com/alexspel/builder/billcard/data/projects.json"
        );
        var p = await response.json();  
        this.project = p.find((p) => p.id === +this.$route.params.id);
    },
};
</script>
