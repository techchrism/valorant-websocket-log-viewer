<template>
    <div class="full-height">
        <v-list class="no-padding">
            <v-virtual-scroll :items="$store.state.events" :item-height="62" :height="height">
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
        height: Number
    },
    data: () => ({
        model: null
    }),
    methods: {
        selectionChange(selection)
        {
            this.$emit('selectionChange', selection);
        }
    }
};
</script>

<style scoped>
    .no-padding
    {
        padding: 0
    }

    .full-height
    {
        height: 100%;
    }
</style>
