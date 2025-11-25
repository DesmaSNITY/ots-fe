export async function  loginApi (payload) {
    const res = await fetch(`api/login`, {
        method:"POST",
        headers:{ "Content-type": "application/json"},
        body:JSON.stringify(payload),
    });

    if(!res.ok) throw new Error("Login failed");
    return res.json();
}