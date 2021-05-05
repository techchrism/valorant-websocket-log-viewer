<template>
    <v-app>
        <v-navigation-drawer
            v-if="ready"
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            :width="500"
            ref="nav"
            app
        >
            <events-list :height="navHeight"/>
        </v-navigation-drawer>

        <v-app-bar app color="primary" dark :clipped-left="$vuetify.breakpoint.lgAndUp">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="ready"></v-app-bar-nav-icon>
            <v-toolbar-title class="headline">
                <span class="font-weight-light">Valorant Websocket Log Viewer</span>
                <v-btn icon href="https://github.com/techchrism/valorant-websocket-log-viewer">
                    <v-icon>mdi-github</v-icon>
                </v-btn>
            </v-toolbar-title>
            <v-spacer/>
            <dark-button/>
        </v-app-bar>

        <v-main>
            <template v-if="!ready">
                <!-- TODO add explanation -->
                <file-dropper/>
            </template>
            <template v-else>
                <h4>Info</h4>
            </template>
        </v-main>
    </v-app>
</template>

<script>
import DarkButton from '@/components/DarkButton';
import FileDropper from '@/components/FileDropper';
import EventsList from '@/components/EventsList';

export default {
    name: 'App',
    components: {
        EventsList,
        FileDropper,
        DarkButton
    },
    computed: {
        ready()
        {
            return this.$store.state.lockData !== null;
        }
    },
    data: () => ({
        drawer: null,
        navHeight: 0
    }),
    mounted()
    {
        this.navHeight = window.innerHeight - 64;
        window.addEventListener('resize', this.resizeEvent);
    },
    destroyed()
    {
        window.removeEventListener('resize', this.resizeEvent);
    },
    methods: {
        resizeEvent()
        {
            this.navHeight = window.innerHeight - 64;
        }
    }
};
</script>

<style>
    html
    {
        overflow-y: auto !important;
    }
</style>
