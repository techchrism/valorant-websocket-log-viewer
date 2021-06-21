<template>
    <div class="ma-5">
        <h1>{{event.name}}</h1>
        <h3 v-if="eventHelp">{{eventHelp}}</h3>
        <v-divider class="ma-5"/>
        <v-card class="mt-5">
            <v-card-title>Info</v-card-title>
            <v-card-text>
                <strong>Time:</strong> {{event.time}} ({{timeFormatted}})
            </v-card-text>
        </v-card>
        <v-card class="mt-5">
            <v-card-title>JSON Data</v-card-title>
            <v-card-text>
                <pre>{{dataFormatted}}</pre>
            </v-card-text>
        </v-card>
        <v-card v-if="event.private" class="mt-5">
            <v-card-title>Private Data</v-card-title>
            <v-card-text>
                <pre>{{JSON.stringify(event.private, null, 4)}}</pre>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'EventInfo',
    props: {
        event: Object
    },
    computed: {
        dataFormatted()
        {
            return JSON.stringify(this.event.data, null, 4);
        },
        eventHelp()
        {
            return this.$store.state.helpData[this.event.name];
        },
        timeFormatted()
        {
            return (new Date(this.event.time)).toString();
        }
    }
};
</script>

<style scoped>

</style>
