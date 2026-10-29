export interface BusStop {
  id: number
  code: number
  name: string
  lng: number
  lat: number
  province?: string
  city: string
}

export interface BusLine {
  id: number
  code: string
  name: string
  city: string
}

export interface BusStopWithBuses {
  buses: string[]
  stop: BusStop
}

export interface BusInfo {
  door_no: string
  lng: number
  lat: number
  speed: number
  plate: string
}

export interface BusLocation {
  bus_id: string
  lng: number
  lat: number
  route_code: string
  closest_stop_code: number
}

export interface BusLocationResponse {
  data: BusLocation[]
  next_poll: number
}
