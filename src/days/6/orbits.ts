import _ from 'lodash';

/**
 * [primary, satellite]
 * */
export type Orbit = [string, string];

interface Body {
  name: string;
  satellites: Record<string, Body>;
  primary?: Body;
}

export const buildOrbitTree = (orbits: Orbit[]) => {
  const com: Body = {
    name: 'COM',
    satellites: {},
  };

  const bodies: Record<string, Body> = {
    COM: com,
  };

  orbits.forEach(([primaryName, satelliteName]) => {
    const primary = bodies[primaryName] || {
      name: primaryName,
      satellites: {},
    };
    const satellite = bodies[satelliteName] || {
      name: satelliteName,
      satellites: {},
    };

    bodies[primaryName] = primary;
    bodies[satelliteName] = satellite;

    satellite.primary = primary;
    primary.satellites[satelliteName] = satellite;
  });

  return { com, bodies };
};

export const countOrbits = (com: Body): number => {
  const toVisit = [{ body: com, depth: 0 }];
  let totalOrbits = 0;

  while (toVisit.length) {
    const { body, depth } = toVisit.shift()!;
    toVisit.push(
      ...Object.values(body.satellites).map(satellite => ({
        body: satellite,
        depth: depth + 1,
      })),
    );
    totalOrbits += depth;
  }

  return totalOrbits;
};

const getChain = (body: Body) => {
  const chain: Body[] = [body];

  while (body.primary) {
    chain.push(body.primary);
    body = body.primary;
  }

  return chain;
};

export const calcDistance = (source: Body, dest: Body) => {
  const sourcePrimaries = getChain(source);
  const destPrimaries = getChain(dest);
  const nearestCommonPrimary = sourcePrimaries.find(primary =>
    destPrimaries.includes(primary),
  )!;

  const distance =
    sourcePrimaries.indexOf(nearestCommonPrimary) +
    destPrimaries.indexOf(nearestCommonPrimary);

  return distance;
};
