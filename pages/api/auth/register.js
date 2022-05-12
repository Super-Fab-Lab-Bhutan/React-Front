const server = process.env.SERVER;

const reCaptchaSecrete = process.env.RECAPTCHA_SECRET_KEY;

export default async function Register(req, res) {
  const {
    email,
    password,
    role,
    phoneNumber,
    organization,
    username,
    gender,
    captcha,
  } = req.body;
  if (!captcha) {
    return res.json({
      status: 400,
      message: "Unproccesable request, please provide the required fields",
    });
  }

  try {
    // Ping the google recaptcha verify API to verify the captcha code you received
    const captcharesponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${reCaptchaSecrete}&response=${captcha}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        method: "POST",
      }
    );
    const captchaValidation = await captcharesponse.json();
    if (captchaValidation.success) {
      let response = await fetch(server + "/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role,
          phoneNumber,
          organization,
          username,
          gender,
        }),
      });
      response = await response.json();
      return res.json(response);
    }
  } catch (error) {
    return res.json({
      satus: 400,
      message: "Error",
    });
  }
}
