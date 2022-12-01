export default {
  name: 'property',
  title: 'Listing',
  type: 'document',
  fields: [
    {
      name: 'listingType',
      title: 'Listing Type',
      type: 'string',
      options: {
        list: [
          { title: 'Rent', value: 'rent' },
          { title: 'Sell', value: 'sell' },
          {
            title: 'Short Term Accommodation',
            value: 'short-term-accommodation',
          },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Stand Alone House', value: 'house' },
          { title: 'Flat', value: 'flat' },
          { title: 'Cottage', value: 'cottage' },
          { title: 'Semi Detached', value: 'semi-detached' },
          { title: 'Bedsitter', value: 'bedsitter' },
          { title: 'Single Room', value: 'singe-room' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Industrial', value: 'industrial' },
          { title: 'Land', value: 'land' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'furnishing',
      title: 'Furnishing',
      type: 'string',
      options: {
        list: [
          { title: 'Fully Furnished', value: 'fully-furnished' },
          { title: 'Semi Furnished', value: 'semi-furnished' },
          { title: 'Unfurnished', value: 'unfurnished' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
    },
    {
      name: 'beds',
      title: 'Beds',
      type: 'number',
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
    },
    {
      name: 'garages',
      title: 'Garages',
      type: 'number',
    },
    {
      name: 'offices',
      title: 'Offices',
      type: 'number',
    },
    {
      name: 'tiled',
      title: 'Tiled',
      type: 'boolean',
    },
    {
      name: 'fittedstove',
      title: 'Fitted Stove',
      type: 'boolean',
    },
    {
      name: 'kitchenunits',
      title: 'Kitchen Units',
      type: 'boolean',
    },
    {
      name: 'pool',
      title: 'Pool',
      type: 'boolean',
    },
    {
      name: 'veranda',
      title: 'Veranda',
      type: 'boolean',
    },
    {
      name: 'privategarden',
      title: 'Private Garden',
      type: 'boolean',
    },
    {
      name: 'balcony',
      title: 'Balcony',
      type: 'boolean',
    },
    {
      name: 'electricgate',
      title: 'Electric Gate',
      type: 'boolean',
    },
    {
      name: 'security',
      title: '24hr Security',
      type: 'boolean',
    },
    {
      name: 'airconditioning',
      title: 'Airconditioning',
      type: 'boolean',
    },
    {
      name: 'borehole',
      title: 'Borehole',
      type: 'boolean',
    },
    {
      name: 'billsincluded',
      title: 'Bills included',
      type: 'boolean',
    },
    {
      name: 'waterincluded',
      title: 'Water Included',
      type: 'boolean',
    },
    {
      name: 'zescoincluded',
      title: 'ZESCO Included',
      type: 'boolean',
    },
    {
      name: 'gardenerincluded',
      title: 'Gardener',
      type: 'boolean',
    },
    {
      title: 'Peaceful',
      name: 'peaceful',
      type: 'boolean',
    },
    {
      name: 'familyfriendly',
      title: 'Family Friendly',
      type: 'boolean',
    },
    {
      name: 'idealforsingles',
      title: 'Ideal for Singles',
      type: 'boolean',
    },
    {
      name: 'spacious',
      title: 'Spacious',
      type: 'boolean',
    },
    {
      name: 'petfriendly',
      title: 'Pet Friendly',
      type: 'boolean',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint',
    },
    {
      name: 'pricePerNight',
      title: 'Price Per Night',
      type: 'number',
    },
    {
      name: 'pricePerMonth',
      title: 'Price Per Month',
      type: 'number',
    },
    {
      name: 'priceForPurchase',
      title: 'Price For Purchase',
      type: 'number',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'thankyoumessage',
      title: 'Thank You Message',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'propertyImage' }],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      name: 'id',
      title: 'ID',
      type: 'number',
    },
    {
      name: 'agent',
      title: 'agent',
      type: 'agent',
    },
    {
      name: 'host',
      title: 'host',
      type: 'host',
    },
    {
      name: 'landlord',
      title: 'landlord',
      type: 'landlord',
    },
    {
      name: 'tenant',
      title: 'tenant',
      type: 'tenant',
    },
    {
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'review' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      pricePerNight: 'pricePerNight',
    },
  },
}
