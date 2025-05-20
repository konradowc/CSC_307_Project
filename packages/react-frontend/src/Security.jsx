//security.jsx
// this contains the functions used for logging and signing in, implemented from TA4

// currently none of these functions are in use, need to figure out how to use them

export function loginUser(creds) {
  // will need to tweak these methods
  const promise = fetch(`/login`, {
    // see if this is good
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
    .then((response) => {
      if (response.status === 200) {
        response
          .json()
          .then((payload) => setToken(payload.token));
        setMessage(`Login successful; auth token saved`);
      } else {
        setMessage(
          `Login Error ${response.status}: ${response.data}`
        );
      }
    })
    .catch((error) => {
      setMessage(`Login Error: ${error}`);
    });

  return promise;
}

export function signupUser(creds) {
  const promise = fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
    .then((response) => {
      if (response.status === 201) {
        response
          .json()
          .then((payload) => setToken(payload.token));
        setMessage(
          `Signup successful for user: ${creds.username}; auth token saved`
        );
      } else {
        setMessage(
          `Signup Error ${response.status}: ${response.data}`
        );
      }
    })
    .catch((error) => {
      setMessage(`Signup Error: ${error}`);
    });

  return promise;
}
