import axios from 'axios';
const API = "https://backend-laboratorio-crm-yjzvao2ewq-uc.a.run.app/"

export default axios.create({
  baseURL: `${API}/api`,
})
