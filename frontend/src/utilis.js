export const formatDateForInput = (date) => {
    let splitDate = date.toISOString().split("T");
    let timeSplit = splitDate[1].split(":");
    splitDate[1] = `${timeSplit[0]}:${timeSplit[1]}`;
    return splitDate[0] + "T" + splitDate[1];
}