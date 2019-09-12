webpackJsonp([10],{508:function(e,n,t){"use strict";function a(){return i.a.createElement("div",null,i.a.createElement("div",{className:"description"},i.a.createElement("h2",null,"Listeners"),i.a.createElement("p",null,"Please help write this section or read more about ",i.a.createElement("a",{href:"https://github.com/keajs/kea-listeners"},"kea-listeners on github"),"!"),i.a.createElement("h2",null,"Installation"),i.a.createElement("p",null,"First install the ",i.a.createElement("a",{href:"https://github.com/keajs/kea-listeners"},i.a.createElement("code",null,"kea-listeners"))," package:"),i.a.createElement(r.default,{className:"bash"},l.install),i.a.createElement("p",null,"Then install the plugin:"),i.a.createElement(r.default,{className:"javascript"},l.import),i.a.createElement("h2",null,"Sample usage"),i.a.createElement(r.default,{className:"bash"},l.usage)))}Object.defineProperty(n,"__esModule",{value:!0}),n.default=a;var s=t(10),i=t.n(s),r=t(200),l={usage:t(644),import:t(645),install:t(646)}},644:function(e,n){e.exports="kea({\n  // ...\n\n  listeners: ({ actions, values, store, sharedListeners }) => ({\n    // action that conditionally calls another action\n    [actions.openUrl]: ({ url }) => {\n      // get the value from the reducer 'url'\n      const currentUrl = values.url\n\n      if (url !== currentUrl) {\n        actions.reallyOpenTheUrl(url)\n      }\n    },\n\n    // listen to any redux action type, not just ones defined in this logic\n    'LOCATION_CHANGE': (payload) => {\n      // do something with the regular redux action\n      console.log(payload)\n      store.dispatch({\n        type: 'REDUX_ACTION',\n        payload: { redux: 'cool' }\n      })\n    },\n\n    // two listeners with one shared action\n    [actions.anotherAction]: sharedListeners.sharedActionListener,\n    [actions.yetAnotherAction]: sharedListeners.sharedActionListener,\n\n    // Debounce for 300ms before making an API call\n    // Break if this action was called again while we were sleeping\n    [actions.debouncedFetchResults]: async ({ username }, breapoint) => {\n      // If the same action gets called again while this waits, we will throw an exception\n      // and catch it immediately, effectively cancelling the operation.\n      await breakpoint(300)\n\n      // Make an API call\n      const user = await API.fetchUser(username)\n\n      // if during the previous fetch this action was called again, then break here\n      breakpoint()\n\n      // save the result\n      actions.userReceived(user)\n    },\n\n    // you can also pass an array of functions\n    [actions.oneActionMultipleListeners]: [\n      (payload, breakpoint, action) => { /* ... */ },\n      sharedListeners.doSomething,\n      sharedListeners.logAction\n    ]\n  }),\n\n  // if multiple actions must trigger similar code, use sharedListeners\n  sharedListeners: ({ actions, values, store }) => ({\n    // all listeners and sharedListeners also get a third parameter:\n    // - action = the full dispatched action\n    sharedActionListener: function (payload, breakpoint, action) {\n      if (action.type === actions.anotherAction.toString()) {\n        // handle this case separately\n      }\n      // do something common for both\n      console.log(action)\n    }\n  })\n})\n"},645:function(e,n){e.exports="import listenersPlugin from 'kea-listeners'\nimport { resetContext } from 'kea'\n\nresetContext({\n  createStore: true,\n  plugins: [ listenersPlugin ]\n})\n"},646:function(e,n){e.exports="# if you're using yarn\nyarn add kea-listeners\n\n# if you're using npm\nnpm install --save kea-listeners\n"}});