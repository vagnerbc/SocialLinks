import { useEffect } from "react";
import Prismic from "prismic-javascript";
import { useRouter } from "next/router";
import Head from "next/head";

const RedirectTo = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <div className="w-1/2 mx-auto text-center mt-8">
      <Head>
        <title>Página não encontrada.</title>
      </Head>
      <h1 className="font-bold text-4xl">URL não encontrada!</h1>
      <p>Estamos te redirecionando para a central de links.</p>
    </div>
  );
};

export const getServerSideProps = async ({ params, res }) => {
  const client = Prismic.client("https://vagner.cdn.prismic.io/api/v2");
  const link = await client.getByUID("shortlink", params.slug);

  if (link) {
    res.statusCode = 301;
    res.setHeader("Location", link.data.destino.url);
    res.end();
    return;
  }

  return {
    props: {},
  };
};

export default RedirectTo;
