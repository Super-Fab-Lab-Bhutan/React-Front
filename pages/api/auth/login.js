import { serialize } from "cookie";

const server = process.env.SERVER;

const handler = async (req, res) => {
  const { email, password } = req.body;
  try {
    let response = await fetch(server + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    response = await response.json();

    if (response.status === 200) {
      const { jwt, user, role } = response;

      const serialised = serialize("jwt", jwt, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 3,
        path: "/",
      });
      // set cookie

      res.setHeader("Set-Cookie", serialised);
      return res.status(200).json({
        message: "User successfully Logged in",
        status: 200,
        user,
        role,
        server, //response server
      });
    } else {
      res.status(400).json({ status: 400, message: response.error });
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "An error occurred",
      error: error.message,
    });
  }
};

export default handler;
