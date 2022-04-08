import { useEffect, useCallback, useContext, useState } from 'react';
import { QlikContext } from './qlikContext';

const useChartObject = ({ objectId, qPagesArray }) => {
  const { doc } = useContext(QlikContext);
  const [chartObject, setChartObject] = useState();
  const [chartLayout, setChartLayout] = useState();
  const [chartHCData, setChartHCData] = useState([]);
  const getChartObject = useCallback(async () => {
    const object = await doc.getObject(objectId);

    let layout = null;
    if (setChartLayout) {
      layout = await object.getLayout({});
    }

    let hyperCubeData = null;
    if (setChartHCData) {
      hyperCubeData = await object.getHyperCubeData({
        qPath: '/qHyperCubeDef',
        qPages: qPagesArray,
      });
    }

    setChartObject(object);

    if (setChartLayout) {
      setChartLayout(layout);
    }

    if (setChartHCData) {
      setChartHCData(hyperCubeData);
    }
  }, [
    doc,
    objectId,
    qPagesArray,
    setChartObject,
    setChartLayout,
    setChartHCData,
  ]);

  const updateCallback = useCallback(async () => {
    let tempLayout = null;
    if (setChartLayout) {
      tempLayout = await chartObject.getLayout();
    }

    let tempHyperCubeData = null;
    if (setChartHCData) {
      tempHyperCubeData = await chartObject.getHyperCubeData({
        qPath: '/qHyperCubeDef',
        qPages: qPagesArray,
      });
    }
    if (setChartLayout) {
      setChartLayout(tempLayout);
    }

    if (setChartHCData) {
      setChartHCData(tempHyperCubeData);
    }
  }, [chartObject, qPagesArray, setChartLayout, setChartHCData]);

  useEffect(() => {
    if (doc) {
      getChartObject();
    }

    if (chartObject) {
      chartObject.on('changed', updateCallback);
    }
    return () => {
      if (chartObject) {
        chartObject.removeListener('changed', updateCallback);
      }
    };
  }, [
    doc,
    getChartObject,
    chartObject,
    setChartLayout,
    setChartHCData,
    updateCallback,
    qPagesArray,
  ]);

  return {
    chartObject,
    chartLayout,
    chartHCData,
  };
};

export default useChartObject;
