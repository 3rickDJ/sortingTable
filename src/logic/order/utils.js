const flattenProfiles = (profiles) => {
  return profiles.map( profile => {
    return flattenProfile(profile)
  })
}

const flattenProfile = (profile) => {
  const { id, attributes } = profile;
  return {id, tests: attributes.tests.data.map( test => ({id: test.id}) )}
}

const simplifyfeeConfigurations = ( feeConfigurations ) => {
  return feeConfigurations.map( ({id, attributes}) => {
    const { fee, price } = attributes;
    return { id, fee: {id: fee.data.id, name: fee.data.attributes.abbreviation}, price }
  })
}

const standardize = (options, type) => {
  const transformedOptions = options.map( ({id, attributes}) => {
    const {
      code, clave, title, feeConfigurations, labInstructions, patientInstructions,
      tests, profiles, typeSample
    } = attributes;
    const newOption = {
      id,
      code,
      clave,
      title,
      feeConfigurations: simplifyfeeConfigurations( feeConfigurations.data),
      typeSample: {id: typeSample.data?.id ?? null},
      labInstructions,
      patientInstructions,
      type: type,
      tests,
      profiles,
      pickedFeeConfig: null,
    }
    
    if (type === 'package') {
      newOption.profiles = flattenProfiles( profiles.data )
    }
    if (type === 'profile') {
      newOption.tests = tests.data.map( test => ({id: test.id, ...test.attributes}) )
    }
    return newOption;
  })

  return transformedOptions;
}

const hashify = (options) => {
  return options.reduce( (acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {})
}

export { hashify }
export { standardize }