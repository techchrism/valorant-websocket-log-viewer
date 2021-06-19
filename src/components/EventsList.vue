<template>
    <div>
        <v-list class="no-padding">
            <v-virtual-scroll :items="$store.state.events" :item-height="50" :height="height">
                <template v-slot="{item, index}">
                    <v-list-item-group v-model="model" v-on:change="selectionChange">
                        <v-list-item :key="index" :value="index">
                            <v-list-item-content>
                                <v-list-item-title>{{item.name.replace('OnJsonApiEvent_', '')}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </template>
            </v-virtual-scroll>
        </v-list>
    </div>
</template>

<script>
export default {
    name: 'EventsList',
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
</style>
