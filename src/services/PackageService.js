import apiCrm from "src/api/apiCrm";

const PATH = 'packages';

const createPackage = (data) => {
  return apiCrm({
    url: `${PATH}`,
    method: 'POST',
    data: {data: {...data, status: 'created'}}
  })
}

const deletePackages = (id) => {
  return apiCrm({
    url: `${PATH}/${id}`,
    method: 'PUT',
    data: { data: { status: 'deleted' } }
  })
}

const getPackages = (params = {}) => {
  const { page, pageSize, sort, sortColumn, searchValue, onlyFees, fetchForOrder  } = params
  const pagination = page ? `&pagination[page]=${page}&pagination[pageSize]=${pageSize}` : '&pagination[limit]=-1'
  const search = searchValue ? `&filters[$or][0][code][$containsi]=${searchValue}&filters[$or][1][title][$containsi]=${searchValue}&filters[$or][2][clave][$containsi]=${searchValue}&filters[$or][3][description][$containsi]=${searchValue}` : ''
  const statusFilter = page ? `&filters[status][$eq]=created` : ''
  const sortQuery = sortColumn ? `&sort=${sortColumn}:${sort}` : ''

  if (fetchForOrder) return apiCrm({
    url: `${PATH}?populate[feeConfigurations][populate][fee][fields][0]=id&populate[feeConfigurations][fields][0]=id&populate[tests][fields][0]=id&populate[profiles][populate][tests][fields][0]=id&populate[profiles][fields][0]=id&fields[0]=clave&fields[1]=code&fields[2]=title&fields[3]=labInstructions&fields[4]=patientInstructions`,
    method: 'GET',
  })

  if (onlyFees) return apiCrm({
    url: `${PATH}?populate[feeConfigurations][populate][fee][fields][0]=id&fields[0]=title&fields[1]=code&fields[2]=clave${pagination}`,
    method: 'GET',
  })
  
  return apiCrm({
    url: `${PATH}?populate=*${pagination}${sortQuery}${search}${statusFilter}`,
    method: 'GET'
  }) 
}

const updatePackage = (id, data) => {
  return apiCrm({
    url: `${PATH}/${id}`,
    method: 'PUT',
    data: { data: data }
  })
};

const getPackageById = (id) => {
  const tags = "?populate[tags][populate]=*"
  const typeSample = "&populate[typeSample][populate]=*"
  const profiles = "&populate[profiles][populate]=*"
  const tests = "&populate[tests][populate]=*"
  const section = "&populate[section][populate]=*"
  const externalLabs = "&populate[externalLabs][populate]=*"
  const population = `${tags}${profiles}${typeSample}${section}${tests}${externalLabs}`

  return apiCrm({
    url: `${PATH}/${id}${population}`,
    method: 'GET',
  })
}

const getPackageBySection = (sectionId) => {
  const filter = `filters[section]=${sectionId}`
  const limit = "&pagination[limit]=-1"
  
  return apiCrm({
    url: `${PATH}?${filter}${limit}`,
    method: 'GET'
  })
}

export {
  getPackages,
  createPackage,
  deletePackages,
  getPackageById,
  getPackageBySection,
  updatePackage
}