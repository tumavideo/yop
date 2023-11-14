export default function FormHeading({ title, desc }) {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{desc}</p>
    </div>
  )
}
