export function responseParse(response: string) {
    const arr = response.split('<>==<>');
    const session = sessionStorage.getItem('before');

    const remember = JSON.parse(session === null || session === "" ? "[]" : session);

    if (remember.length > 3) remember.shift();
    remember.push(arr[arr.length - 1]);

    sessionStorage.setItem("before", JSON.stringify(remember));
    return arr[0];
}
