# ULRS data query for strapi

## Packages
```json
{
  populate: {
    feeConfigurations:{
       populate: {fee:{fields: ['id']}},
       fields: ['id']
    },
    tests: { fields: ['id'] },
    profiles: {
        populate:{
          tests: {
            fields: ['id']
          }
        },
        fields: ['id']
    }

  },
  fields: [
  'clave', 'code', 'title', 'labInstructions', 'patientInstructions'
  ]
}
```

## Profiles
```json
{
  populate: {
    feeConfigurations:{
       populate: {fee:{fields: ['id']}},
       fields: ['id']
    },
    tests: { fields: ['id'] },
  },
  fields: [
  'clave', 'code', 'title', 'labInstructions', 'patientInstructions'
  ]
}
```

## Tests
```json

```
