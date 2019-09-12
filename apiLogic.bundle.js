webpackJsonp([6],{502:function(n,e,t){"use strict";function o(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function l(n,e){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?n:e}function a(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(n,e):n.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),t.d(e,"default",function(){return d});var c=t(10),i=t.n(c),s=(t(133),t(200)),u=function(){function n(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),r={usage:t(626),wrap:t(627),build:t(628),mount:t(629),extend:t(630)},d=function(n){function e(){return o(this,e),l(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return a(e,n),u(e,[{key:"render",value:function(){return i.a.createElement("div",{className:"api-scene"},i.a.createElement("h2",null,i.a.createElement("code",null,"logic")),i.a.createElement("p",null,"Once you have initialised a logic with ",i.a.createElement("code",null,"const logic = kea({})"),", there are a few things you can do with it:"),i.a.createElement("h3",null,"logic()"),i.a.createElement("p",null,"By calling just ",i.a.createElement("code",null,"logic(something)"),", we call any of the following methods:"),i.a.createElement(s.default,{className:"javascript"},r.usage),i.a.createElement("h3",null,"logic.wrap()"),i.a.createElement("p",null,"Wrap the logic around a React Component (functional or Class) and give it access to all actions and values"),i.a.createElement(s.default,{className:"javascript"},r.wrap),i.a.createElement("h3",null,"logic.build()"),i.a.createElement("p",null,"Build the logic, but don't yet connect it to Redux"),i.a.createElement("p",null,"Builds are cached on the context, so calling it a on every render is very fast, assuming the key doesn't change."),i.a.createElement(s.default,{className:"javascript"},r.build),i.a.createElement("h3",null,"logic.mount()"),i.a.createElement("p",null,"Mount the logic on Redux, return a function that unmounts"),i.a.createElement("p",null,"Shorthand for ",i.a.createElement("code",null,"logic.build().mount()")),i.a.createElement(s.default,{className:"javascript"},r.mount),i.a.createElement("h3",null,"logic.extend()"),i.a.createElement("p",null,"Add more features to the logic"),i.a.createElement(s.default,{className:"javascript"},r.extend))}}]),e}(c.Component)},626:function(n,e){n.exports="const logic = kea({})\n\nlogic()          --\x3e logic.build()\nlogic(props)     --\x3e logic.build(props)\nlogic(Component) --\x3e logic.wrap(Component)\n"},627:function(n,e){n.exports="const logic = kea({\n  actions: () => ({\n    doSomething: true,\n    doSomethingElse: true,\n  }),\n  reduceres: () => ({\n    firstOne: ['defaultValue'],\n    secondOne: ['defaultValue']\n  })\n})\n\n// with function components\n\nfunction MyComponent ({ firstOne, secondOne, actions: { doSomething, doSomethingElse } }) {\n  // ...\n}\n\nconst ConnectedComponent = logic(MyComponent)\n\n\n// with class components\n\nclass MyClassComponent extends Component {\n  render () {\n    const { firstOne, secondOne } = this.props\n\n    // NB! this.actions is a shorthand for this.props.actions\n    const { doSomething, doSomethingElse } = this.actions\n\n    return <div />\n  }\n}\n\nconst ConnectedClassComponent = logic(MyClassComponent)\n"},628:function(n,e){n.exports="// create a logic\nconst logic = kea({\n  key: props => props.id,\n\n  constants: () => ['SOMETHING'],\n\n  actions: () => ({\n    doSomething: true,\n  }),\n\n  reducers: () => ({\n    myValue: ['yes']\n  })\n})\n\n// get a built copy\nconst builtLogic = logic.build({ id: 10 })\n\n// you may now access all the properties\n// ... keeping in mind it's not yet mounted\n\n// action creator (returns object { type: 'do something', payload: {} })\nbuiltLogic.actionCreators.doSomething()\n\n// bound actions. dispatches the created action automatically\n// probably not useful if the logic is not mounted\nbuiltLogic.actions.doSomething()\n\n// get the contants\nbuildLogic.constants == { SOMETHING: 'SOMETHING' }\n\n// a disconnected selector, will probably throw when called\nbuildLogic.selectors.myValue(state)\n\n// this will throw since the logic is not mounted\nbuildLogic.values.myValue\n"},629:function(n,e){n.exports="const logic = kea({})\n\n// When you call logic.mount(), we actually send it through .build():\nlogic.mount() == logic.build().mount()\n\n// With logic with keys, this is true:\nlogic(props).mount() == logic.build(props).mount()\n\n// In any case, logic.mount() connects this logic to Redux\n// and also mounts all other connected logic.\n// It returns a function, which when called will unmount the logic from the store:\nconst unmount = logic.mount()\n\nlogic.actions.doSomething()\nconsole.log(logic.values.myValue)\n\nunmount()\n\n// Alternatively, pass a callback to execute its contents and unmount automatically\nlogic.mount(builtLogic => {\n  builtLogic.actions.doSomething()\n  console.log(builtLogic.values.myValue)\n})\n\n// The callback can also be async\nlogic.mount(async builtLogic => {\n  const response = await window.fetch('/api/give-me-all-your-data')\n  builtLogic.actions.doSomething(await response.json())\n  console.log(builtLogic.values.myValue)\n})\n"},630:function(n,e){n.exports="// create a logic\nconst logic = kea({\n  actions: () => ({\n    doSomething: true,\n  }),\n\n  reducers: () => ({\n    myValue: ['yes']\n  })\n})\n\nlogic.extend({\n  actions: () => ({\n    doSomethingElse: true,\n  }),\n\n  reducers: () => ({\n    anotherValue: ['no']\n  })\n})\n\n// Now you can use both:\nObject.keys(logic.build().actions) == ['doSomething', 'doSomethingElse']\nObject.keys(logic.build().selectors) == ['myValue', 'anotherValue']\n"}});