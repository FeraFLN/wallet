
const headers = {
    'Content-Type': 'application/json',
}
// const server = "https://wallet-back-342021.rj.r.appspot.com/wallet"
const server = "https://wallet-back-342117.ue.r.appspot.com/wallet"
// const server = "http://192.168.1.21:8080/wallet"

export function post(url, requestBody, setResult, setError) {
    const requestOptions = {
        method: 'POST',
        headers: headers,
    };
    request(server + url, requestOptions, setResult, setError);
}
export async function put(url, body, setResult, setError) {
    const requestOptions = {
        method: 'PUT',
        // headers: headers,
    };
    request(server + url, requestOptions, setResult, setError)
    
}
export async function patch(url, body, setResult, setError) {
    const requestOptions = {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    };
    
    request(server + url, requestOptions, setResult, setError)
    
}
export async function del(url, setResult, setError) {
    const requestOptions = {
        method: 'DELETE',
        headers: headers,
    };
    console.log(setResult)
    await fetch(server + url, requestOptions).then().then(setResult());
    // request(server + url, requestOptions, setResult, setError)

    // const resp = await fetch(server + url, requestOptions).then(response => response.json());
}
export async function get(url, body, setResult, setError) {
    const requestOptions = {
        method: 'GET',
        headers: headers,
    };
    request(server + url, requestOptions, setResult, setError);
}
async function request(url, requestOptions, setResult, setError) {

    const result = await fetch(url, requestOptions).then(res => res.json());
    if (!result?.status) {
        setResult(result)
    } else {
        setError(result.message);
    }
}