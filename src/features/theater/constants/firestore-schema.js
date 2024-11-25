/*
Firestore Collection Structure:

theaterChains (collection)
  - title: string
  - description: string
  - locations (collection)
      - id: string
      - name: string
      - imageUrl: string
      - address: string
      - features: array ['Dolby Atmos', '4K Screen', 'IMAX']
      - screens (collection)
          - id: string
          - name: string (e.g., "Audi 1", "Audi 2")
          - capacity: number
          - features: array ['Dolby Atmos', 'IMAX', '4K']
          - seatLayout: {
              rows: number,
              seatsPerRow: number,
              unavailableSeats: array
          }
      - currentMovies (collection)
          - id: string
          - movieId: string
          - movieName: string
          - imageUrl: string
          - showTimes: array [
              {
                time: string,
                screen: string,
                price: number,
                availableSeats: number
              }
            ]
      - concessions (collection)
          - id: string
          - name: string
          - imageUrl: string
          - price: number
          - description: string
          - category: string
          - variants: array
          - isAvailable: boolean
*/
