export const ACTIVE_STATUS = "Ativo";
export const DONE_STATUS = "Concluído";
export const CANCELED_STATUS = "Cancelado";

export const getStationAvailability = (stations, rents, excludedRentId = null) => {
  const activeDepartures = rents.reduce((totals, rent) => {
    if (rent.id === excludedRentId || rent.status !== ACTIVE_STATUS || !rent.from) {
      return totals;
    }

    return {
      ...totals,
      [rent.from]: (totals[rent.from] ?? 0) + 1,
    };
  }, {});

  return stations.map((station) => {
    const activeFromStation = activeDepartures[station.name] ?? 0;
    const available = Math.max(station.capacity - activeFromStation, 0);

    return {
      ...station,
      available,
      spaces: station.capacity - available,
    };
  });
};

export const findStationAvailability = (stations, stationName) => {
  return stations.find((station) => station.name === stationName);
};
