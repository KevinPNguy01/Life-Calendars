const apiUrl = "https://getstravaactivities-zxhhhobsqq-uc.a.run.app";

export const fetchStrava = async (year: number) => {
    const response = await fetch(apiUrl, { method: "GET"});
    const data = await response.json() as Record<string, number>;
    return data;
}

export const parseStrava = (data: Record<string, number>) => {
    for (const [time, distance] of Object.entries(data)) {
        data[time] = distance / 1609.34;
    }
    return data;
}