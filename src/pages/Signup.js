import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handleSignup = async (e) => {
    e.preventDefault();
    const usernameExist = await doesUsernameExist(username);
    if (!usernameExist) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: email.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setEmail("");
        setPassword("");
        setUsername("");
        setError(error.message);
      }
    } else {
      setError("That username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up-Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with instagram"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignup} method="POST">
            <input
              type="text"
              aria-label="Enter your username"
              placeholder="Username"
              className="text-sm text-gray-base w-full py-5 px-4 h-2 mr-3 border border-gray-primary mb-2 rounded"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />

            <input
              type="text"
              aria-label="Enter your full name"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full py-5 px-4 h-2 mr-3 border border-gray-primary mb-2 rounded"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />

            <input
              type="email"
              aria-label="Enter your email address"
              placeholder="Email Address"
              className="text-sm text-gray-base w-full py-5 px-4 h-2 mr-3 border border-gray-primary mb-2 rounded"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />

            <input
              type="password"
              aria-label="Enter your password"
              placeholder="Password"
              className="text-sm text-gray-base w-full py-5 px-4 h-2 mr-3 border border-gray-primary mb-2 rounded"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
