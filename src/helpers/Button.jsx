import Link from 'next/link'

const Button = ({ text, className, site }) => {
  return (
    <button
      type="button" className={className}>
      <Link href={site}>
        <a>{text}</a>
      </Link>
    </button>
  )
}

export default Button
