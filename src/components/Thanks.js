const products = [
  {
    id: 1,
    name: 'Opportunity Name',
    description: 'Opportunity description.',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/confirmation-page-05-product-01.jpg',
    imageAlt: 'Company logo.',
  },
]

const user = {
  name: 'Kristin Watson',
  addressOne: '7363 Cynthia Pass',
  addressTwo: 'Toronto, ON N3Y 4H8',
  phone: '416-223-4123',
  email: 'kristinwat@gmail.com',
}

export default function Thanks() {
  return (
    <main className="bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">
            Thank you for applying!
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight">
            Someone from our opportunity success team will be in touch soon!
          </p>
          <p className="mt-2 text-base text-gray-500">
            Your application number is #14034056 .
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Tracking number</dt>
            <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
          </dl>
        </div>

        <section
          aria-labelledby="order-heading"
          className="mt-10 border-t border-gray-200"
        >
          <h2 id="order-heading" className="sr-only">
            Your order
          </h2>

          <h3 className="sr-only">Items</h3>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex space-x-6 border-b border-gray-200 py-10"
            >
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    <a href={product.href}>{product.name}</a>
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">End date</dt>
                      <dd className="ml-2 text-gray-700">January 4th 2022</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Addresses</h4>
            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Physical address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{user.name}</span>
                    <span className="block">{user.addressOne}</span>
                    <span className="block">{user.addressTwo}</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">
                  Contact information
                </dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{user.phone}</span>
                    <span className="block">{user.email}</span>
                  </address>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  )
}
