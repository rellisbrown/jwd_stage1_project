import React, { useEffect, useCallback } from 'react';

const useSessionObject = (
  doc,
  fieldName,
  sessionObject,
  setSessionObject,
  setSessionObjectLayout
) => {
  const getSessionObject = useCallback(async () => {
    const object = await doc.createSessionObject({
      qInfo: {
        qType: 'selectionsList',
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: [fieldName, 'Reveneue'],
          /* qSortCriterias: [{ qSortByState: 1 }], */
        },
        qShowAlternatives: true,
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 100,
            qHeight: 100,
          },
        ],
      },
    });
    const layout = await object.getLayout({});
    setSessionObject(object);
    setSessionObjectLayout(layout);
  }, [doc, fieldName, setSessionObject, setSessionObjectLayout]);

  const updateCallback = useCallback(async () => {
    let tempLayout = null;

    tempLayout = await sessionObject.getLayout();

    setSessionObjectLayout(tempLayout);
  }, [sessionObject, setSessionObjectLayout]);

  useEffect(() => {
    if (doc && fieldName && !sessionObject) {
      getSessionObject();
    }
    if (sessionObject) {
      sessionObject.on('changed', updateCallback);
    }
    return () => {
      if (sessionObject) {
        sessionObject.removeListener('changed', updateCallback);
      }
    };
  }, [doc, fieldName, sessionObject, getSessionObject, updateCallback]);
};

export default useSessionObject;
