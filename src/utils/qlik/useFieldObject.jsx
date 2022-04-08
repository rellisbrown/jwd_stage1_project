import React, { useEffect, useCallback } from 'react';

const useFieldObject = (doc, selectionFieldName, setFieldObject) => {
  const getFieldObject = useCallback(async () => {
    const field = await doc.getField({
      qFieldName: selectionFieldName,
      qStateName: '$',
    });
    setFieldObject(field);
  }, [doc, selectionFieldName, setFieldObject]);

  useEffect(() => {
    if (doc) {
      getFieldObject();
    }
  }, [doc, getFieldObject]);
};

export default useFieldObject;
