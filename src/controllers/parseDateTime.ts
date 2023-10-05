


export const parseDateTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const time = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
    }

    return time
}