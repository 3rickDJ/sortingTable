import apiCrm from "src/api/apiCrm";

const PATH = '/tests';

const createTest = (data) => {
  return apiCrm({
    url: PATH,
    method: 'POST',
    data: { data: {...data, status: "created"} }
  })
}

const deleteTest = (id) => {
  return apiCrm({
    url: `${PATH}/${id}`,
    method: 'PUT',
    data: { data: { status: "deleted" } }
  })
}

const updateTest = (id, data) => {
  return apiCrm({
    url: `${PATH}/${id}`,
    method: 'PUT',
    data: { data: data }
  })
};

const getTest = (params = {}) => {
  const isActive = "&filters[status][$eq]=created"

  const { searchValue, sort,
    sortColumn, page,
    pageSize, onlyFees,
    fetchForOrder
  } = params

  const pagination = page ? `&pagination[page]=${page}&pagination[pageSize]=${pageSize}` : "&pagination[limit]=-1"
  const sorting = sortColumn ? `&sort=${sortColumn}:${sort}` : ""

  const search = searchValue ? `&filters[$or][0][title][$containsi]=${searchValue}&filters[$or][1][description][$containsi]=${searchValue}&filters[$or][2][clave][$containsi]=${searchValue}&filters[$or][3][section][sectionName][$containsi]=${searchValue}&filters[$or][4][clave][$containsi]=${searchValue}` : ''

  if (fetchForOrder) return apiCrm({
      url: `${PATH}?populate[feeConfigurations][populate][fee][fields][0]=id&populate[feeConfigurations][populate][fee][fields][1]=abbreviation&populate[feeConfigurations][fields][0]=id&populate[feeConfigurations][fields][1]=price&populate[typeSample][fields][0]=id&fields[0]=clave&fields[1]=code&fields[2]=title&fields[3]=labInstructions&fields[4]=patientInstructions&pagination[limit]=-1&filters[status][$eq]=created`,
    method: 'GET',
  })


  if (onlyFees) return apiCrm({
    url: `${PATH}?populate[feeConfigurations][populate][fee][fields][0]=id&fields[0]=title&fields[1]=code&fields[2]=clave${pagination}`,
    method: 'GET',
  })

  return apiCrm({
    url: `${PATH}?populate=*${pagination}${sorting}${search}${isActive}`, // Include the status filter in the URL
    method: 'GET',
  })
}

const getTestById = (id) => {
  const tags = "?populate[tags][populate]=*"
  const humanRanks = "&populate[humanRanks][populate]=*"
  const method = "&populate[method][populate]=*"
  const typeSample = "&populate[typeSample][populate]=*"
  const section = "&populate[section][populate]=*"
  const externalLabs = "&populate[externalLabs][populate]=*"
  const population = `${tags}${humanRanks}${method}${typeSample}${section}${externalLabs}`

  return apiCrm({
    url: `${PATH}/${id}${population}`,
    method: 'GET',
  })
}

const getTestByKey = (key) => {
  const filter = `filters[clave][$eq]=${key}`
  const limit = "&pagination[limit]=1"

  return apiCrm({
    url: `${PATH}?${filter}${limit}`,
    method: 'GET',
  })
}

const getTestBySection = (sectionId) => {
  const filter = `filters[section]=${sectionId}`
  const limit = "&pagination[limit]=-1"

  return apiCrm({
    url: `${PATH}?${filter}${limit}`,
    method: 'GET',
  })
}


export {
  getTest,
  createTest,
  deleteTest,
  updateTest,
  getTestById,
  getTestByKey,
  getTestBySection
}
