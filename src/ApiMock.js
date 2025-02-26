export const ApiMock = {
  _propertySubscriptions: {},
  _properties: {},
  _wsSubscriptions: {},

  Properties: {
    Init: async (propertyName, value) => {
      if (!ApiMock._properties[propertyName]) {
        ApiMock._properties[propertyName] = {
          name: propertyName,
          value: value,
        };

        if(!ApiMock._propertySubscriptions[propertyName]){
          ApiMock._propertySubscriptions[propertyName] = [];
        }

        if (ApiMock._propertySubscriptions[propertyName]) {
          ApiMock._propertySubscriptions[propertyName].forEach((x) =>
            x({ name: propertyName, value: value })
          );
        }
      }

      return true;
    },
    InitMany: async (properties) => {
      properties.map(
        async (x) => await ApiMock.Properties.Init(x.name, x.value)
      );
    },
    Get: async (propertyName) => {
      return ApiMock._properties[propertyName];
    },
    GetMany: async (propertyNames) => {
      return propertyNames.map((x) => ApiMock._properties[x]);
    },
    Set: async (propertyName, value) => {
      ApiMock._properties[propertyName] = {
        ...ApiMock._properties[propertyName],
        value: value,
      };

      if (ApiMock._propertySubscriptions[propertyName]) {
        ApiMock._propertySubscriptions[propertyName].forEach((x) => x(value));
      }
    },
    SetMany: async (properties) => {
      return properties.map(
        async (x) => await ApiMock.Properties.Set(x.name, x.value)
      );
    },
    Remove: async (propertyName) => {
      delete ApiMock._properties[propertyName];

      if (ApiMock._propertySubscriptions[propertyName]) {
        ApiMock._propertySubscriptions[propertyName].forEach((x) =>
          x(undefined)
        );
      }

      return true;
    },

    Subscribe: (propertyName, callback) => {
      if (!ApiMock._propertySubscriptions[propertyName]) {
        ApiMock._propertySubscriptions[propertyName] = [];
      }
      ApiMock._propertySubscriptions[propertyName].push(callback);
    },

    Unsubscribe: (propertyName, callback) => {
      ApiMock._propertySubscriptions[propertyName] =
        ApiMock._propertySubscriptions[propertyName].filter(
          (x) => x !== callback
        );
    },
  },

  ClientMediator: {
    sendCommand: (command, data, additionalArgs) => {
      console.warn(
        "ClientMediator.sendCommand ",
        command,
        data,
        additionalArgs
      );
    },
    sendCommandAsync: (command, data, additionalArgs) => {
      console.warn(
        "ClientMediator.sendCommandAsync ",
        command,
        data,
        additionalArgs
      );
    },
    register: (client) => {
      console.warn("ClientMediator.register ", client);
    },
  },

  FireAction: (action, args) => {
    console.warn("FireAction ", action, args);
  },

  SendCustomCommandToServer: (command, data, additionalArgs) => {
    console.warn("SendCustomCommandToServer ", command, data, additionalArgs);

    ApiMock._wsSubscriptions.forEach((x) =>
      x({ command, data, ...additionalArgs })
    );
  },

  RunClientCommand: (commandString) =>
    console.warn("RunClientCommand ", commandString),

  SubscribeWebSocket(callback) {
    const generateUUID = () => {
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    };

    const subscription = generateUUID();
    ApiMock._wsSubscriptions[subscription] = callback;
  },
};

export default ApiMock;
