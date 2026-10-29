export const getLatLngBounds = <T extends { lat: number, lng: number }>(path: T[]): google.maps.LatLngBoundsLiteral | undefined => {
  if (path.length < 1) {
    return
  }

  if (path.length < 2) {
    const p = path[0]!

    return {
      north: p.lat,
      east: p.lng,
      south: p.lat,
      west: p.lng,
    }
  }

  let north = 0
  let south = Infinity
  let east = 0
  let west = Infinity

  for (const point of path) {
    north = Math.max(north, point.lat)
    south = Math.min(south, point.lat)

    east = Math.max(east, point.lng)
    west = Math.min(west, point.lng)
  }

  return {
    west,
    south,
    east,
    north,
  }
}
