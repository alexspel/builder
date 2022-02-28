<template>
    <v-app>
        <Header />
        <v-main>
            <v-container class="pt-5">
                <router-view class="view" tag="button"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Header from "./components/Header.vue";
export default {
    components: {
        Header,
    },
};
</script>
