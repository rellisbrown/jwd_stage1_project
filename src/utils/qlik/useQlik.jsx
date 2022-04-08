import React, { useEffect, useCallback } from 'react';
import QlikConnector from './qlikConnector';

const useQlik = (global, setGlobal, setDoc, setError, qlikConfig) => {
  const getQlik = useCallback(async () => {
    let qGlobal;
    let qDoc;

    try {
      const res = await QlikConnector(qlikConfig);
      qGlobal = res.qGlobal;
      qDoc = res.qDoc;
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setGlobal(qGlobal);
    setDoc(qDoc);
  }, [setDoc, setError, setGlobal, qlikConfig]);

  useEffect(() => {
    if (global === undefined) {
      getQlik();
    }
  }, [global, getQlik]);
};

export default useQlik;
