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
                            <span class="font-weight-medium mr-2">
                                Название проекта:
                            </span>
                            {{ project.name }}
                        </div>
                        <div class="text-h5 mb-3">
                            <span class="font-weight-medium mr-2">
                                Статус проекта:
                            </span>
                            {{ project.status }}
                        </div>
                        <div class="text-h5 mb-3">
                            <span class="font-weight-medium mr-2">
                                Руководитель проекта:
                            </span>
                            <a :href="`/user/view/${project.author.id}`">{{
                                project.author.name
                            }}</a>
                        </div>
                        <div class="text-h5 mb-3">
                            <div>
                                <span class="font-weight-medium mr-2 mb-3">
                                    Контрагент:
                                </span>
                                {{ project.partner.name }}
                            </div>
                            <div
                                v-if="
                                    project.partner.contacts &&
                                    project.partner.contacts.length > 0
                                "
                            >
                                <div class="font-weight-medium">
                                    Контакты контрагента:
                                </div>
                                <ul style="list-style: none" class="pl-3">
                                    <li
                                        v-for="contact in project.partner
                                            .contacts"
                                        :key="contact.id"
                                        class="mb-0"
                                    >
                                        {{ contact.name }}
                                        {{ contact.email || contact.phone }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            v-if="
                                project.documents &&
                                project.documents.length > 0
                            "
                            class="text-h5 mb-3"
                        >
                            <div class="font-weight-medium">
                                Документы проекта:
                            </div>
                            <ul style="list-style: none" class="pl-3">
                                <li
                                    v-for="document in project.documents"
                                    :key="document.id"
                                    class="mb-0"
                                >
                                    <a :href="document.link">
                                        {{ document.name }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="text-h5 mb-3">
                            <span class="font-weight-medium"> Адрес: </span>
                            {{ project.address }}
                        </div>
                        <div
                            v-if="
                                project.contacts && project.contacts.length > 0
                            "
                            class="text-h5 mb-3"
                        >
                            <div class="font-weight-medium">
                                Контакты на объекте:
                            </div>
                            <ul style="list-style: none" class="pl-3">
                                <li
                                    v-for="contact in project.contacts"
                                    :key="contact.id"
                                    class="mb-0"
                                >
                                    {{ contact.name }}
                                </li>
                            </ul>
                        </div>
                        <div class="text-h5 mb-3" v-if="project.comment">
                            <span class="font-weight-medium mr-2">
                                Комментарий:
                            </span>
                            <p>{{ project.comment }}</p>
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
            author: { id: null, name: null },
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
