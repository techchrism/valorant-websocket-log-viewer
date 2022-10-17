<template>
    <v-list-item :key="index" :value="index" class="event-item">
        <v-list-item-content>
            <v-list-item-title>
                {{event.name.replace('OnJsonApiEvent_', '')}}
            </v-list-item-title>
            <v-list-item-subtitle v-if="presenceData">
                {{presenceData.playerName}}
                <span v-if="presenceData.party.players.length > 1"> + {{presenceData.party.players.length - 1}}</span>
                <span v-if="presenceData.status"> {{presenceData.status}}</span>
                <span v-if="presenceData.map">, {{presenceData.map}}</span>
                <span v-if="presenceData.mode">, {{presenceData.mode}}</span>
                <span v-if="presenceData.map">, {{presenceData.allyScore}} - {{presenceData.enemyScore}}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="chatData">
                {{chatData.name}}: {{chatData.body}}
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
            const inputDate = this.event.time || (this.presence?.time || this.event.data.data.timestamp);
            if(!inputDate)
            {
                return '?';
            }
            const dt = new Date(inputDate);
            return (dt.getHours() < 10 ? '0' : '') + dt.getHours() + ':' +
                (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
        },
        chatData()
        {
            if(this.event.data.data && Array.isArray(this.event.data.data.messages) && this.event.data.data.messages.length === 1)
            {
                const message = this.event.data.data.messages[0];
                return {
                    body: message.body,
                    name: message['game_name']
                };
            }
            return null;
        },
        presence()
        {
            if(this.event.data.data && Array.isArray(this.event.data.data.presences) &&
                this.event.data.data.presences.length === 1 && this.event.data.data.presences[0].private)
            {
                return this.event.data.data.presences[0];
            }
            return null;
        },
        presenceData()
        {
            if(this.presence)
            {
                const partyId = this.presence.private.partyId;
                const playerName = this.presence['game_name'];
                const party = this.$store.state.parties.find(party => party.id === partyId);

                const status = {
                    'INGAME': 'in game',
                    'MENUS': 'in menus',
                    'PREGAME': 'pre-game'
                }[this.presence.private['sessionLoopState']];
                const map = {
                    '/Game/Maps/Ascent/Ascent': 'Ascent',
                    '/Game/Maps/Bonsai/Bonsai': 'Split',
                    '/Game/Maps/Duality/Duality': 'Bind',
                    '/Game/Maps/Foxtrot/Foxtrot': 'Breeze',
                    '/Game/Maps/Port/Port': 'Icebox',
                    '/Game/Maps/Poveglia/Range': 'The Range',
                    '/Game/Maps/Triad/Triad': 'Haven'
                }[this.presence.private['matchMap']];

                return {
                    playerName,
                    party,
                    status,
                    map,
                    mode: this.presence.private['queueId'],
                    allyScore: this.presence.private['partyOwnerMatchScoreAllyTeam'],
                    enemyScore: this.presence.private['partyOwnerMatchScoreEnemyTeam']
                }
            }
            return null;
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
