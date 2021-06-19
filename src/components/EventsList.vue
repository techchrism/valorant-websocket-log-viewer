<template>
    <div>
        <v-virtual-scroll :items="$store.state.events" :item-height="50" :height="height">
            <template v-slot:default="{item}">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{item.name.replace('OnJsonApiEvent_', '')}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-virtual-scroll>
    </div>
</template>

<script>
export default {
    name: 'EventsList',
    props: {
        height: Number
    }
};
</script>

<style scoped>

</style>
