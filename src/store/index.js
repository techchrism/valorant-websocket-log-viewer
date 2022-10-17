import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function processEvent(eventName, eventData) {
    let event = {
        name: eventName,
        data: eventData
    };
    event.original = event.data;
    if(event.data.data && Array.isArray(event.data.data.presences))
    {
        event.data.data.presences = event.data.data.presences.map(presence =>
        {
            if(presence.private)
            {
                presence.private = JSON.parse(presence.private.startsWith('{') ? presence.private : atob(presence.private));
            }
            return presence;
        });
    }

    if(event.data.data && typeof event.data.data.payload === 'string' && event.data.data.payload.startsWith('{'))
    {
        event.data.data.payload = JSON.parse(event.data.data.payload);
    }
    event.text = JSON.stringify(event.data);

    return event;
}

function extractParties(events)
{
    const parties = [];
    for(const event of events)
    {
        if(!Array.isArray(event.data?.data?.presences)) continue;
        for(const presence of event.data.data.presences)
        {
            if(!presence.private) continue;
            const existingParty = parties.find(party => party.id === presence.private.partyId);
            const playerName = presence['game_name'] + '#' + presence['game_tag'];
            if(existingParty)
            {
                if(!existingParty.players.includes(playerName))
                {
                    existingParty.players.push(playerName);
                }
            }
            else
            {
                parties.push({
                    id: presence.private.partyId,
                    players: [playerName]
                });
            }
        }
    }
    return parties;
}

export default new Vuex.Store({
    state: {
        lockData: null,
        sessionData: null,
        helpData: null,
        parties: null,
        events: []
    },
    mutations: {
        setLockData(state, lockData)
        {
            state.lockData = lockData;
        },
        setSessionData(state, sessionData)
        {
            state.sessionData = sessionData;
        },
        setHelpData(state, helpData)
        {
            state.helpData = helpData;
        },
        setEvents(state, events)
        {
            state.events = events;
        },
        setParties(state, parties)
        {
            state.parties = parties;
        },
        clearData(state)
        {
            state.lockData = null;
            state.sessionData = null;
            state.events = [];
        }
    },
    actions: {
        async parseTxt(context, {file})
        {
            let text;
            try
            {
                text = await file.text();
            }
            catch(e)
            {
                throw 'Could not read text file';
            }

            if(text.startsWith('['))
            {
                const eventsJson = JSON.parse(text);
                const processedEvents = eventsJson.map(event => processEvent(event.event, event.data));

                context.commit('setLockData', {});
                context.commit('setSessionData', {});
                context.commit('setHelpData', {});
                context.commit('setParties', extractParties(processedEvents));
                context.commit('setEvents', processedEvents);
            }
            else
            {
                const lines = text.split('\n').filter(line => line.length > 0);
                if(lines.length < 3)
                {
                    throw 'Not enough lines in file';
                }

                const timestampRegex = /(\d+) (.*)/;
                const [lockdata, session, help] = lines.splice(0, 3).map(l => JSON.parse(l));

                const events = lines.filter(l => l.length > 0).map(l =>
                {
                    const [,timestr, text] = timestampRegex.exec(l);
                    if(text.length === 0) return null;
                    const [, eventName, eventData] = JSON.parse(text);
                    const event = processEvent(eventName, eventData);
                    event.time = Number(timestr);
                    return event;
                }).filter(e => e !== null);

                context.commit('setLockData', lockdata);
                context.commit('setSessionData', session);
                context.commit('setHelpData', help);
                context.commit('setParties', extractParties(events));
                context.commit('setEvents', events);
            }
        }
    },
    modules: {}
});
