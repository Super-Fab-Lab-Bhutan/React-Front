import { serialize } from "cookie";

export default async function Logout(req, res) {
  if (req.method === "GET") {
    try {
      const serialised = serialize("jwt", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialised);

      res.json(true); //logged out
    } catch (error) {
      res.json(false); //not logged out
    }
  }
}
