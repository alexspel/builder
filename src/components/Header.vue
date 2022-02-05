<template>
    <v-container class="pt-8">
        <router-link
            style="text-decoration: none; color: inherit"
            class="mr-4"
            to="/"
        >
            <v-btn color="success">Home</v-btn>
        </router-link>
        <router-link
            style="text-decoration: none; color: inherit"
            class="mr-4"
            to="/project"
        >
            <v-btn color="default">Мои проекты</v-btn>
        </router-link>
        <router-link
            style="text-decoration: none; color: inherit"
            class="mr-4"
            to="/request/agreement"
        >
            <v-btn color="default">Согласование заявок</v-btn>
        </router-link> 
    </v-container>
</template>
