export function summarizeBlastRadius(services) {
  const tierZero = services.filter((service) => service.tier === 0);
  const teams = [...new Set(services.map((service) => service.team))].sort();
  const regions = [...new Set(services.map((service) => service.region))].sort();

  return {
    selectedServices: services.length,
    tierZeroServices: tierZero.map((service) => service.name),
    teams,
    regions,
  };
}
