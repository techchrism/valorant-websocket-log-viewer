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
            <div class="d-flex flex-column full-height">
                <v-text-field dense
                              label="Search"
                              append-icon="mdi-magnify"
                              class="ma-3 mt-7"
                              v-model="search"
                              clearable/>
                <events-list :height="eventsHeight" :search="search" ref="eventsList" @selectionChange="selectionChange"/>
            </div>
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
            <template v-if="ready && selection != null">
                <event-info :event="selection"/>
            </template>
        </v-main>
    </v-app>
</template>

<script>
import DarkButton from '@/components/DarkButton';
import FileDropper from '@/components/FileDropper';
import EventsList from '@/components/EventsList';
import EventInfo from '@/components/EventInfo';

export default {
    name: 'App',
    components: {
        EventInfo,
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
        eventsHeight: 0,
        selection: null,
        eventsListResizeObserver: null,
        search: ''
    }),
    updated()
    {
        if(this.$refs.eventsList.$el && this.eventsListResizeObserver === null)
        {
            this.eventsHeight = this.$refs.eventsList.$el.clientHeight;

            this.eventsListResizeObserver = new ResizeObserver(entries =>
            {
                this.eventsHeight = entries[0].contentRect.height;
            });
            this.eventsListResizeObserver.observe(this.$refs.eventsList.$el);
        }
    },
    methods: {
        selectionChange({index, selection})
        {
            this.selection = selection;
        }
    }
};
</script>

<style>
    html
    {
        overflow-y: auto !important;
    }

    .full-height
    {
        height: 100%;
    }
</style>
