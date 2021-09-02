import { useRouter } from "next/dist/client/router"
import { format } from "date-fns"
import Header from '../../src/components/Header'
import Head from "next/head"
import InfoCard from "../../src/components/InfoCard"
const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, guest } = router.query;
  const formatStartDate = format(new Date(startDate), "dd MMMM yy");
  const formatEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formatStartDate} - ${formatEndDate}`;

  return (
    <>
      <Head>
        <title>{`${location} | ${range} | ${guest}`}</title>
      </Head>
      <Header placeholder={`${location} | ${range} | ${guest}`} />
      <section className="search">
        <p>300+ Stays - {range} - for {guest} guests</p>
        <h4>Stays in {location}</h4>
        <div className="filter">
          <p>Cancellation Flexibility</p>
          <p>Types of Place</p>
          <p>Types of Place</p>
          <p>Types of Place</p>
        </div>
        <div className="card__container">
          {searchResults.map(({ img, location, title, description, star, price, total }) => (
            <InfoCard
              key={img}
              img={img}
              location={location}
              title={title}
              description={description}
              price={price}
              total={total}
              star={star}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Search

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(res => res.json())
  return {
    props: {
      searchResults,
    }
  }
}