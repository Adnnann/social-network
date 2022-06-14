import baseUrl from "../config";

const create = async (user) => {
    try {
        const response = await fetch(`${baseUrl}/api/users/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

const list = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/users`, {
            method: "GET",
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

const read = async (params, token, signal) => {
    try {
        const response = await fetch(`${baseUrl}/api/users/${params.userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token.t,
            },
        });

        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

const update = async (params, credentials, user) => {
    console.log(params);
    console.log(credentials);

    try {
        const response = await fetch(`${baseUrl}/api/users/${params.userId}/`, {
            method: "PUT",
            headers: {
                // Accept: "application/json",
                // "Content-Type": "application/json",

                Authorization: "Bearer " + credentials.t,
            },
            body: user,
        });
        console.log(response);
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

const remove = async (params, credentials) => {
    try {
        const response = await fetch(`${baseUrl}/api/users/${params.userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + credentials.t,
            },
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

const follow = async (params, credentials, followId) => {
    console.log(params.userId, followId);
    try {
        let response = await fetch(`${baseUrl}/api/follow`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + credentials.t,
            },
            body: JSON.stringify({ userId: params.userId, followId: followId }),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const unfollow = async (params, credentials, unfollowId) => {
    try {
        let response = await fetch(`${baseUrl}/api/unfollow`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + credentials.t,
            },
            body: JSON.stringify({
                userId: params.userId,
                unfollowId: unfollowId,
            }),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const findPeople = async (params, credentials, signal) => {
    try {
        let response = await fetch(
            `${baseUrl}/api/users/findpeople/` + params.userId,
            {
                method: "GET",
                signal: signal,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + credentials.t,
                },
            }
        );
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export { create, list, read, update, remove, follow, unfollow, findPeople };
