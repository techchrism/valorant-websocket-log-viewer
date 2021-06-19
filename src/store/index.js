import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lockData: null,
        sessionData: null,
        helpData: null,
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
            
            const lines = text.split('\n').filter(line => line.length > 0);
            if(lines.length < 3)
            {
                throw 'Not enough lines in file';
            }
            
            const [lockdata, session, help] = lines.splice(0, 3).map(l => JSON.parse(l));
            const events = lines.filter(l => l.length > 0).map(l =>
            {
                let event = {};
                [, event.name, event.data] = JSON.parse(l);
                return event;
            });
            
            context.commit('setLockData', lockdata);
            context.commit('setSessionData', session);
            context.commit('setHelpData', help);
            context.commit('setEvents', events);
        }
    },
    modules: {}
});
