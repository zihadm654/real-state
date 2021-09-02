import Image from "next/image"

const LgCard = ({ img, title, buttonText, description }) => {
  return (
    <div className="large__card">
      <div className="img__container">
        <Image src={img} layout="fill" />
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button>{buttonText}</button>
      </div>
    </div>
  )
}

export default LgCard
