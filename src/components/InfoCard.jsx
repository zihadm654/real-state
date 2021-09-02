import Image from 'next/image'
import { HeartIcon } from "@heroicons/react/outline"
import { StarIcon } from "@heroicons/react/solid"
const InfoCard = ({ img, title, location, star, price, total, description, }) => {
  return (
    <>
      <div className="info__card">
        <div className="img__container">
          <Image src={img} layout="fill"
            objectFit="cover"
            alt="img"
          />
        </div>
        <div className="content">
          <div className="content__first">
            <h5>{location}</h5>
            <HeartIcon />
          </div>
          <div className="content__second">
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
          <div className="content__third">
            <div className="star">
              <StarIcon />
              <p>{star}</p>
            </div>
            <div className="price">
              <h4>{price}</h4>
              <p>{total}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default InfoCard