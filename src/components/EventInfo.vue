<template>
    <div class="ma-5">
        <h1>{{event.name}}</h1>
        <h3 v-if="eventHelp">{{eventHelp}}</h3>
        <v-divider class="ma-5"/>
        <v-card class="mt-5">
            <v-card-title>Info</v-card-title>
            <v-card-text>
                <strong>Received time:</strong> {{event.time}} ({{timeFormatted}})<br>
                <template v-if="eventTimestamp">
                    <strong>Time delta:</strong> {{event.time - eventTimestamp}}ms<br>
                </template>

            </v-card-text>
        </v-card>
        <v-card class="mt-5" v-if="party">
            <v-card-title>Party</v-card-title>
            <v-card-text>
                <strong>ID:</strong> {{party.id}}<br>
                <strong>Members:</strong><br>
                <ul>
                    <li v-for="player of party.players" :key="player">{{player}}</li>
                </ul>
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
        },
        presence()
        {
            if(this.event.data.data && Array.isArray(this.event.data.data.presences) &&
                this.event.data.data.presences.length === 1)
            {
                return this.event.data.data.presences[0];
            }
            return null;
        },
        eventTimestamp()
        {
            if(this.presence)
            {
                return this.presence.time;
            }
            else if(this.event.data.data && this.event.data.data.timestamp)
            {
                return this.event.data.data.timestamp;
            }
            return null;
        },
        party()
        {
            if(this.presence && this.presence.private)
            {
                return this.$store.state.parties.find(party => party.id === this.presence.private.partyId);
            }
            return null;
        }
    }
};
</script>

<style scoped>

</style>
