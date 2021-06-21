<template>
    <v-list-item :key="index" :value="index" class="event-item">
        <v-list-item-content>
            <v-list-item-title>
                {{event.name.replace('OnJsonApiEvent_', '')}}
            </v-list-item-title>
            <v-list-item-subtitle v-if="event.name === 'OnJsonApiEvent_chat_v4_presences'">
                Presence
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <span class="text--secondary">{{hoursmins}}</span>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
    name: 'EventListElement',
    props: {
        index: Number,
        event: Object
    },
    computed: {
        hoursmins()
        {
            const dt = new Date(this.event.time);
            return (dt.getHours() < 10 ? '0' : '') + dt.getHours() + ':' +
                (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
        }
    }
};
</script>

<style scoped>
.event-item
{
    height: 62px;
}
</style>
