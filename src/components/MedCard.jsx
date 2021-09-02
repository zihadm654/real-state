import Image from "next/image"
const MedCard = ({ img, title }) => {
  return (
    <div className="medcard">
      <div className="img__container">
        <Image src={img} layout="fill" />
      </div>
      <h4>{title}</h4>
    </div>
  )
}

export default MedCard
