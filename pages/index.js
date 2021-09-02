import Head from 'next/head';
import Hero from '../src/components/Hero';
import SCard from '../src/components/Scard';
import MedCard from '../src/components/MedCard';
import LgCard from '../src/components/LgCard';
import Header from '../src/components/Header';

export default function Home({ exploreData, cardData }) {
  return (
    <div>
      <Head>
        <title>Airbnb App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <Header />
      <Hero />
      <main>
        <h2>Explore Nearby</h2>
        <div className="explore">
          {exploreData.map(({ img, location, distance }) => (
            <SCard
              key={img}
              img={img}
              distance={distance}
              location={location}
            />
          ))}
        </div>
        <section>
          <h2>Live Anywhere</h2>
          <div className="container">
            {cardData.map(({ img, title }) => (
              <MedCard key={title} title={title} img={img} />
            ))}
          </div>
        </section>
        <LgCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>
    </div>
  );
}
export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  );
  const cardData = await fetch('https://links.papareact.com/zp1').then((res) =>
    res.json()
  );
  return {
    props: {
      exploreData,
      cardData,
    },
  };
}
