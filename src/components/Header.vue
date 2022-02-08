<template>
    <v-container class="pt-8">
        <router-link
            style="text-decoration: none; color: inherit"
            class="mr-4"
            to="/"
        >
            <v-btn color="primary">Реестр проектов</v-btn>
        </router-link>
        <router-link
            style="text-decoration: none; color: inherit"
            class="mr-4"
            to="/request/agreement"
        >
            <v-btn color="secondary">Согласование заявок</v-btn>
        </router-link>
        <router-link
            style="text-decoration: none; color: inherit"
            class="mr-4"
            to="/bill/list"
        >
            <v-btn color="secondary">Реестр счетов</v-btn>
        </router-link>
        <!-- <router-link
            style="text-decoration: none; color: inherit"
            class="mr-4"
            to="/project/view/1"
        >
            <v-btn color="default">Карточка проекта</v-btn>
        </router-link> -->
        <!-- <router-link
            style="text-decoration: none; color: inherit"
            class="mr-4"
            to="/bill"
        >
            <v-btn color="default">Согласование заявок</v-btn>
        </router-link> -->
    </v-container>
</template>
