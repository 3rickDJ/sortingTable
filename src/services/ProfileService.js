import apiCrm from "src/api/apiCrm";

const PATH = '/profiles';

const createProfile = (data) => {
  return apiCrm({
    url: PATH,
    method: 'POST',
    data: { data: {...data, status: 'created'} }
  })
}

const deleteProfile = (id) => {
  return apiCrm({
    url: `${PATH}/${id}`,
    method: 'PUT',
    data: { data: { status: 'deleted' } }
  })
}

const updateProfile = (id, data) => {
  return apiCrm({
    url: `${PATH}/${id}`,
    method: 'PUT',
    data: { data: data }
  })
};

const getProfile = (params = {}) => {
  const { searchValue, sort, sortColumn, page, pageSize, onlyFees } = params
  const pagination = page ? `&pagination[page]=${page}&pagination[pageSize]=${pageSize}` : '&pagination[limit]=-1'
  const sorting = sortColumn ? `&sort=${sortColumn}:${sort}` : ""
  const search = searchValue ? `&filters[$or][0][title][$containsi]=${searchValue}&filters[$or][1][description][$containsi]=${searchValue}&filters[$or][2][code][$containsi]=${searchValue}&filters[$or][3][clave][$containsi]=${searchValue}` : ''
  const status = '&filters[status][$eq]=created'

  if (onlyFees) return apiCrm({
    url: `${PATH}?populate[feeConfigurations][populate][fee][fields][0]=id&fields[0]=title&fields[1]=code&fields[2]=clave${pagination}`,
    method: 'GET',
  })

  return apiCrm({
    url: `${PATH}?populate=*${pagination}${sorting}${search}${status}`,
    method: 'GET',
  })
}

const getProfileById = (id) => {
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

const getProfileBySection = (sectionId) => {
  const filter = `filters[section]=${sectionId}`
  const limit = "&pagination[limit]=-1"
  
  return apiCrm({
    url: `${PATH}?${filter}${limit}`,
    method: 'GET'
  })
}


export {
  getProfile,
  createProfile,
  deleteProfile,
  updateProfile,
  getProfileById,
  getProfileBySection
} 