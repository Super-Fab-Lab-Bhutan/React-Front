import Head from "next/head";
import Header from "../../components/header";

export async function getServerSideProps({ req }) {
  // check for login
  const jwt = req.cookies.jwt;

  let users = null;
  let isLoggedIn;
  try {
    users = verify(jwt, secreteKEY);
    isLoggedIn = true;
  } catch (error) {
    isLoggedIn = false;
  }

  return {
    props: {
      users,
      isLoggedIn,
    },
  };
}

export default function virtualtour({ isLoggedIn, users }) {
  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <Head>
        <title>Virtual Tour</title>
        <meta
          name="description"
          content="AboutUs Virtual Tour, Jigme Namgyel Wangchuck SuperFablab"
        />
        <link rel="icon" href="/assets/img/logo.png" />

        <meta
          httpEquiv="Content-Type"
          content="text/html; charset= ISO-8859-1"
        />
      </Head>
      <main>
        <div
          style={{
            height: "100%",
            width: "90%",
            margin: "auto",
          }}
        >
          <p className="title">Walk Through Video</p>
          <div
            style={{
              height: "400px",
              padding: "30px",
              margin: "auto",
              minWidth: "60%",
              borderRadius: "30px",
            }}
          >
            <iframe
              style={{
                borderRadius: "30px",
                width: "100%",
                height: "100%",
              }}
              src="https://www.youtube.com/embed/tKVwA2OHpnM"
            ></iframe>
          </div>
        </div>
      </main>
    </Header>
  );
}
