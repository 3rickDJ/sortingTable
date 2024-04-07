import apiCrm from 'src/api/apiCrm'

const PATH = '/type-samples'

const createSample = (data) => {
  return apiCrm({
    url: PATH,
    method: 'POST',
    data: { data: data }
  })
}

const updateSample = (id, data) => {
  return apiCrm({
    url: `${PATH}/${id}`,
    method: 'PUT',
    data: { data: data }
  })
}

const deleteSample = (id) => {
  return apiCrm({
    url: `${PATH}/${id}`,
    method: 'PUT',
    data: { data: { status: 'deleted' } }
  })
}

const getSample = (params = {}) => {
  const { searchValue, sort, sortColumn, page, pageSize } = params
  const pagination = page ?  `&pagination[page]=${page}&pagination[pageSize]=${pageSize}` : '&pagination[limit]=-1'
  const sorting = sortColumn ? `&sort=${sortColumn}:${sort}` : '&sort=description:asc'
  const search = searchValue ? `&filters[$or][0][description][$containsi]=${searchValue}&filters[$or][1][clave][$containsi]=${searchValue}&filters[$or][2][tube][$containsi]=${searchValue}` : ''
  const statusFilter = '&filters[status][$eq]=created'

  return apiCrm({
    url: `${PATH}?populate=*${search}${pagination}${sorting}${statusFilter}`,
    method: 'GET'
  })
}


export { 
  getSample,
  createSample,
  deleteSample,
  updateSample

}

