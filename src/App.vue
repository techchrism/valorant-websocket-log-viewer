<template>
    <v-app>
        <v-app-bar app color="primary" dark>
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
            <HelloWorld/>
        </v-main>
    </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import DarkButton from '@/components/DarkButton';

export default {
    name: 'App',

    components: {
        DarkButton,
        HelloWorld
    },

    data: () => ({
        //
    })
};
</script>

<style>
    html
    {
        overflow-y: auto !important;
    }
</style>
