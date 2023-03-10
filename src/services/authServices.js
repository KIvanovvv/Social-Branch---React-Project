const host = "http://relieved-knickers-ox.cyclic.app";

export async function register(email, username, password, imageUrl) {
  try {
    if (!email || !username || !password) {
      throw new Error(`Fields with * are required`);
    }
    const response = await fetch(`${host}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        imageUrl: imageUrl,
        username: username,
      }),
    });
    if (response.status === 403) {
      throw new Error(`Email is already taken`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function login(email, password) {
  try {
    const response = await fetch(`${host}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function changeUsernameById(id, username, token) {
  try {
    const response = await fetch(`${host}/users/change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({
        _id: id,
        username: username,
      }),
    });
    if (response.status !== 200) {
      throw new Error();
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function changePasswordById(id, password, token) {
  try {
    const response = await fetch(`${host}/users/change/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({
        _id: id,
        password: password,
      }),
    });
    if (response.status !== 200) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function changeImageById(id, imageUrl, token) {
  try {
    const response = await fetch(`${host}/users/change/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({
        _id: id,
        imageUrl: imageUrl,
      }),
    });
    if (response.status !== 200) {
      throw new Error();
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function changeDescriptionById(id, description, token) {
  try {
    const response = await fetch(`${host}/users/change/description`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({
        _id: id,
        description: description,
      }),
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function updateHappy(id, imageUrl, token) {
  try {
    const response = await fetch(`${host}/users/moods/happy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({
        _id: id,
        imageUrl: imageUrl,
      }),
    });
    if (response.status !== 200) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function updateSad(id, imageUrl, token) {
  try {
    const response = await fetch(`${host}/users/moods/sad`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({
        _id: id,
        imageUrl: imageUrl,
      }),
    });
    if (response.status !== 200) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function updateAngry(id, imageUrl, token) {
  try {
    const response = await fetch(`${host}/users/moods/angry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({
        _id: id,
        imageUrl: imageUrl,
      }),
    });
    if (response.status !== 200) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getUserById(id) {
  try {
    const response = await fetch(`${host}/users/find/${id}`);
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Something went wrong`);
  }
}

export async function getUserByQuery(query) {
  const response = await fetch(`${host}/users/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  });
  const data = await response.json();
  return data.reverse();
}
