# ULRS data query for strapi

## Packages
```json
{
  populate: {
    feeConfigurations:{
       populate: {fee:{fields: ['id']}},
       fields: ['id', 'price']
    },
    tests: { fields: ['id'] },
    profiles: {
        populate:{
          tests: {
            fields: ['id']
          }
        },
        fields: ['id']
    },
    typeSample: {
      fields: ['id']
    },

  },
  fields: [
  'clave', 'code', 'title', 'labInstructions', 'patientInstructions'
  ],
 pagination: {
    limit: -1
  },
  filters: {
    status: {
      $eq: 'created',
    },
  },
}
```

## Profiles
```json
{
  populate: {
    feeConfigurations:{
       populate: {fee:{fields: ['id']}},
       fields: ['id','price']
    },
    typeSample: {
      fields: ['id']
    },
    tests: { fields: ['id'] },
  },
  fields: [
  'clave', 'code', 'title', 'labInstructions', 'patientInstructions'
  ],
 pagination: {
    limit: -1
  },
  filters: {
    status: {
      $eq: 'created',
    },
  },
}
```

## Tests
```json
{
  populate: {
    feeConfigurations:{
       populate: {fee:{fields: ['id']}},
       fields: ['id','price']
    },
    typeSample: {
      fields: ['id']
    }
  },
  fields: [
  'clave', 'code', 'title', 'labInstructions', 'patientInstructions'
  ],
 pagination: {
    limit: -1
  },
  filters: {
    status: {
      $eq: 'created',
    },
  },
}
```
