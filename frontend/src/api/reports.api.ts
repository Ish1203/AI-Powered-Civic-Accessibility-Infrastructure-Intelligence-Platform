import api from "./client";
import type {Analysis,Report} from "../types";
export async function analyze(file:File,lat:number,lon:number):Promise<Analysis>{
 const fd=new FormData();fd.append("file",file);fd.append("lat",String(lat));fd.append("lon",String(lon));
 return (await api.post("/reports/analyze",fd,{headers:{"Content-Type":"multipart/form-data"}})).data;
}
export const submit=async(data:any):Promise<Report> => (await api.post("/reports",data)).data;
export const listReports=async():Promise<Report[]> => (await api.get("/reports")).data;
export const getReport=async(id:number):Promise<Report> => (await api.get(`/reports/${id}`)).data;
