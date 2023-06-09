// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'clipboard';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: string) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (args: string) => void) {
      const subscription = (_event: IpcRendererEvent, args: string) =>
        func(args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
