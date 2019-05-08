function mapToQueryString(map: Object) {
    return Object.entries(map).map(el => `${el[0]}=${el[1]}`).join("&");
}