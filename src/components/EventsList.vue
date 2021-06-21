<template>
    <div class="d-flex flex-grow-1">
        <v-list class="no-padding full-width">
            <v-virtual-scroll :items="filteredEvents" :item-height="62" :height="height">
                <template v-slot="{item, index}">
                    <v-list-item-group v-model="model" v-on:change="selectionChange">
                        <event-list-element :index="index" :event="item"/>
                    </v-list-item-group>
                </template>
            </v-virtual-scroll>
        </v-list>
    </div>
</template>

<script>
import EventListElement from '@/components/EventListElement';
export default {
    name: 'EventsList',
    components: {EventListElement},
    props: {
        height: Number,
        search: String
    },
    data: () => ({
        model: null
    }),
    computed: {
        filteredEvents()
        {
            if(this.search)
            {
                return this.$store.state.events.filter(event => event.text.includes(this.search));
            }
            return this.$store.state.events;
        }
    },
    methods: {
        selectionChange(selection)
        {
            this.$emit('selectionChange', {
                index: selection,
                selection: this.filteredEvents[selection]
            });
        }
    }
};
</script>

<style scoped>
    .no-padding
    {
        padding: 0
    }

    .full-width
    {
        width: 100%;
    }
</style>
