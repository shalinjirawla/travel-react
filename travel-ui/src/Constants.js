
export const FLIGHT_API_KEY = '658bbff48d117c0725fe227e';

export const API_HOST = 'http://localhost:4002';

export const classOptions = [
    { _id: 'economy', label: 'Economy', value: 'economy' },
    { _id: 'premium-economy', label: 'Premium Economy', value: 'premium-economy' },
    { _id: 'business', label: 'Business', value: 'business' },
    { _id: 'first', label: 'First Class', value: 'first' },
];

export const fetchFlightList = [
    { id: 1, label: 'Ahmedabad, India', value: 'Ahmedabad, India' },
    { id: 2, label: 'Banglore, India', value: 'Banglore, India' },
    { id: 3, label: 'Mumbai, India', value: 'Mumbai, India' },
    { id: 3, label: 'Delhi, India', value: 'Delhi, India' }
];

export const sortedByOptions = [
    { _id: 'popularity', label: 'Popularity', value: 'popularity' },
    { _id: 'duration-S-to-L', label: 'Duration Shortest to Longest', value: 'duration-S-to-L' },
    { _id: 'departure-E-to-L', label: 'Departure Earliest to Late', value: 'departure-E-to-L' },
    { _id: 'departure-L-to-E', label: 'Departure Late to Earliest', value: 'departure-L-to-E' },
    { _id: 'arrival-E-to-L', label: 'Arrival Earliest to Late', value: 'arrival-E-to-L' },
    { _id: 'arrival-L-to-E', label: 'Arrival Late to Earliest', value: 'arrival-L-to-E' },
    { _id: 'availability-H-to-L', label: 'Availability High to Low', value: 'availability-H-to-L' },
];

export const trainStaionList = [
    { _id: 'Ahmedabad, India', name: 'Ahmedabad, India', value: 'Ahmedabad, India', id: 1 },
    { _id: 'Banglore, India', name: 'Banglore, India', value: 'Banglore, India', id: 2 },
    { _id: 'Mumbai, India', name: 'Mumbai, India', value: 'Mumbai, India', id: 3 },
    { _id: 'Delhi, India', name: 'Delhi, India', value: 'Delhi, India', id: 4 }
];

export const ticketStatusList = [
    { _id: 'pending', label: 'Pending' },
    { _id: 'rejected', label: 'Rejected' },
    { _id: 'canceled', label: 'Canceled' },
    { _id: 'confirmed', label: 'Confirmed' },
];