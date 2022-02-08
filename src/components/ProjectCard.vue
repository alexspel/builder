<template>
    <div>
        <v-card>
            <v-card-text>
                <h2 class="text-h2 mb-4">
                    Карточка проекта {{ project.name }}
                </h2>
                <p v-if="project.comment">Комментарий: {{ project.comment }}</p>
                <p>Статус: {{ project.status }}</p>
                <p>Информация о контрагенте: {{ project.partner.name }}</p>
                <ul>
                    <li
                        v-for="contact in project.partner.contacts"
                        :key="contact.id"
                    >
                        {{ contact.name }} {{ contact.email || contact.phone }}
                    </li>
                </ul>
                <div v-if="project.documents">
                    <div>Документы проекта:</div>
                    <ul>
                        <li
                            v-for="document in project.documents"
                            :key="document.id"
                        >
                            <a :href="document.link">{{ document.name }}</a>
                        </li>
                    </ul>
                </div>
                <div>Адрес: {{ project.address }}</div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        // project: {
        //     name: "Дача",
        //     author: "Иванов И.И.",
        //     comment: null,
        //     status: "В работе",
        //     address: "ул. Ленина, дом 12",
        //     documents: [{ name: "Договор", link: "/project" }],
        //     partnerId: {
        //         name: "ООО Вкусные ватрушки",

        //     },
        //     contacts: [
        //         { id: 1, name: "Исильдур А.В.", email: "ivv@example.ru" },
        //         { id: 2, name: "Леголасов Э.П.", phone: "8-999-987-65-43" },
        //     ],
        // },
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
        // var response = await fetch(
        //     "https://raw.githubusercontent.com/alexspel/builder/dev/data/projects.json"
        // );
        // var p = await response.json();
        // console.log(p);
        // if (p.find((p) => p.id === +this.$route.params.id)) {
        //     this.project = p.find((p) => p.id === +this.$route.params.id);
        // }
        console.log(123);
    },
};
</script>
