import { showFrequency, showPoint, showRadius } from "../constants/apiConstants";

export const getRadius = () => {
  return {
    type: showRadius.LIST_RADIUS,
  };
};

export const postRadius = (data) => {
    return {
      type: showRadius.CREATE_RADIUS,
      data,
    };
  };

export const updateRadius = (data, radiusId) => {
  return {
    type: showRadius.UPDATE_RADIUS,
    data,
    radiusId,
  };
};

export const deleteRadius = (radiusId) => {
    return {
      type: showRadius.DELETE_RADIUS,
      radiusId,
    };
  };

export const getRadiusSuccess = (data) => {
  return {
    type: showRadius.LIST_RADIUS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getRadiusFailed = (error) => {
  return {
    type: showRadius.LIST_RADIUS_FAIL,
    payload: {
      error,
    },
  };
};

//frequency
export const getFrequency = () => {
  return {
    type: showFrequency.LIST_FREQUENCY,
  };
};

export const postFrequency = (data) => {
    return {
      type: showFrequency.CREATE_FREQUENCY,
      data,
    };
  };

export const updateFrequency = (data, frequencyId) => {
  return {
    type: showFrequency.UPDATE_FREQUENCY,
    data,
    frequencyId,
  };
};

export const deleteFrequency = (frequencyId) => {
    return {
      type: showFrequency.DELETE_FREQUENCY,
      frequencyId,
    };
  };

export const getFrequencySuccess = (data) => {
  return {
    type: showFrequency.LIST_FREQUENCY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getFrequencyFailed = (error) => {
  return {
    type: showFrequency.LIST_FREQUENCY_FAIL,
    payload: {
      error,
    },
  };
};
//point
export const getPoint = () => {
  return {
    type: showPoint.LIST_POINT,
  };
};

// export const postPoint = (data) => {
//     return {
//       type: showPoint.CREATE_POINT,
//       data,
//     };
//   };

export const updatePoint = (data, pointId) => {
  return {
    type: showPoint.UPDATE_POINT,
    data,
    pointId,
  };
};

// export const deletePoint = (pointId) => {
//     return {
//       type: showPoint.DELETE_POINT,
//       pointId,
//     };
//   };

export const getPointSuccess = (data) => {
  return {
    type: showPoint.LIST_POINT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getPointFailed = (error) => {
  return {
    type: showPoint.LIST_POINT_FAIL,
    payload: {
      error,
    },
  };
};
