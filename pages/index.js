import Prismic from "prismic-javascript";
import Head from "next/head";

const Index = ({ data }) => {
  return (
    <div className="w-1/2 mx-auto text-center">
      <Head>
        <title>{data.pagetitle}</title>
      </Head>
      <h1 className="font-bold text-4xl p-8">{data.title}</h1>
      <img
        src={data.logo.url}
        alt="Logo"
        className="mx-auto rounded-full shadow-2xl w-1/4"
      />

      {data.body.map((item, index) => {
        if (item.slice_type === "secao") {
          return (
            <h2 className="font-bold text-2xl pt-4" key={index}>
              {item.primary.nome}
            </h2>
          );
        } else if (item.slice_type === "link") {
          return (
            <div key={index}>
              <a
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 inline-block"
                href={item.primary.destino.url}
              >
                {item.primary.texto_do_botao}
              </a>
            </div>
          );
        } else if (item.slice_type === "imagem") {
          return (
            <img
              src={item.primary.imagem.url}
              alt="Imagem"
              className="mx-auto"
            />
          );
        }
      })}

      <div className="text-center py-4">Projeto criado por Vagner B.C</div>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export const getServerSideProps = async () => {
  const client = Prismic.client("https://vagner.cdn.prismic.io/api/v2");
  const centralLinks = await client.getSingle("centrallinks");
  console.log(centralLinks);
  return {
    props: {
      data: centralLinks.data,
    },
  };
};

export default Index;
