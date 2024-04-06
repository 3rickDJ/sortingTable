import axios from 'axios';
import process from 'process';

const API = process.env.NEXT_PUBLIC_API_CRM

export default axios.create({
  baseURL: `${API}/api`,
})
