import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * Realm instance
 */
let Realm: typeof import('realm') | undefined;
if (process.env.CUSTOM_DEV === 'true') {
  Realm = require('realm');
}

/**
 * ChatMessage schema
 */
const ChatMessageSchema = {
  name: 'ChatMessage',
  primaryKey: 'id',
  properties: {
    id: 'string',
    chatId: 'string',
    sender: 'string',
    message: 'string',
    timestamp: 'date',
  },
};

/**
 * Realm context
 */
type RealmContextType = {
  addMessage: (chatId: string, sender: string, message: string) => void;
  getMessages: (chatId: string) => any[];
  deleteChat: (chatId: string) => void;
};

const RealmContext = createContext<RealmContextType | undefined>(undefined);

/**
 * RealmProvider component
 */
export const RealmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [realm, setRealm] = useState<import('realm').Realm | null>(null);

  useEffect(() => {
    if (process.env.CUSTOM_DEV !== 'true') return;

    async function openRealm() {
      try {
        if (Realm) {
          const realmInstance = await Realm.open({ schema: [ChatMessageSchema] });
          setRealm(realmInstance);
        }
      } catch (error) {
        console.error('Error opening Realm:', error);
      }
    }

    openRealm();

    return () => {
      if (realm) realm.close();
    };
  }, []);

  const addMessage = (chatId: string, sender: string, message: string) => {
    if (!realm) return;
    realm.write(() => {
      realm.create('ChatMessage', {
        id: new Date().toISOString(),
        chatId,
        sender,
        message,
        timestamp: new Date(),
      });
    });
  };

  const getMessages = (chatId: string) => {
    if (!realm) return [];
    return Array.from(realm.objects('ChatMessage').filtered('chatId == $0', chatId)); // ✅ Fix applied here
  };

  const deleteChat = (chatId: string) => {
    if (!realm) return;
    realm.write(() => {
      const messages = realm.objects('ChatMessage').filtered('chatId == $0', chatId);
      realm.delete(messages);
    });
  };

  return (
    <RealmContext.Provider value={{ addMessage, getMessages, deleteChat }}>
      {children}
    </RealmContext.Provider>
  );
};

/**
 * useRealmContext hook
 */
export const useRealmContext = (): RealmContextType => {
  const context = useContext(RealmContext);
  if (!context) {
    throw new Error('useRealmContext must be used within a RealmProvider');
  }
  return context;
};
