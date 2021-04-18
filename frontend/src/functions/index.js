export const convertTimeStap = (stamp) => {
    const date = new Date(stamp * 1000);

    return `
    ${date.getDate()}/
    ${(date.getMonth()+1)}/
    ${date.getFullYear()} 
    ${date.getHours()} : 
    ${date.getMinutes()} : 
    ${date.getSeconds()}`
}

