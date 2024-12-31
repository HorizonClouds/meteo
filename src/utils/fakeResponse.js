
// forecast?latitude=37.3891&longitude=-5.994072&daily=temperature_2m_max%2Ctemperature_2m_min%2Crain_sum%2Cprecipitation_probability_max

const fakeResponse = {
    fake: true,
    latitude: 37.375,
    longitude: -6,
    generationtime_ms: 0.08404254913330078,
    utc_offset_seconds: 0,
    timezone: 'GMT',
    timezone_abbreviation: 'GMT',
    elevation: 19,
    daily_units: {
        time: 'iso8601',
        temperature_2m_max: '°C',
        temperature_2m_min: '°C',
        rain_sum: 'mm',
        precipitation_probability_max: '%',
    },
    daily: {
        time: [
            '2024-12-31',
            '2025-01-01',
            '2025-01-02',
            '2025-01-03',
            '2025-01-04',
            '2025-01-05',
            '2025-01-06',
        ],
        temperature_2m_max: [16.6, 16.5, 16, 15.6, 15.5, 15.5, 15],
        temperature_2m_min: [4.4, 4.9, 3.3, 2.5, 2.8, 10, 10.3],
        rain_sum: [0, 0, 0, 0, 0, 14.5, 2],
        precipitation_probability_max: [0, 0, 0, 0, 4, 70, 78],
    },
};

export default fakeResponse;


