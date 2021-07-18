import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  jobsUrl = 'http://127.0.0.1:8000/jobs/';
  machineUrl = 'http://127.0.0.1:8000/machines/';
  timecardUrl = 'http://127.0.0.1:8000/timecard/';
  jobEntryUrl = 'http://127.0.0.1:8000/jobentries/';
  machineEntryUrl = 'http://127.0.0.1:8000/machineentries/';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any[]> {
    return this.http
      .get<any[]>(this.jobsUrl)
      .pipe(catchError(this.errorHandler));
  }
  getMachines(): Observable<any[]> {
    return this.http
      .get<any[]>(this.machineUrl)
      .pipe(catchError(this.errorHandler));
  }
  getTimesheets(): Observable<any[]> {
    return this.http
      .get<any[]>(this.timecardUrl)
      .pipe(catchError(this.errorHandler));
  }
  getJobEntries(): Observable<any[]> {
    return this.http
      .get<any[]>(this.jobEntryUrl)
      .pipe(catchError(this.errorHandler));
  }
  getMachineEntries(): Observable<any[]> {
    return this.http
      .get<any[]>(this.machineEntryUrl)
      .pipe(catchError(this.errorHandler));
  }
  deleteJob(id: any): Observable<any> {
    return this.http.delete<any>(this.jobsUrl);
  }
  deleteMachine(id: any): Observable<any> {
    return this.http.delete<any>(this.machineUrl);
  }
  deleteTimecard(id: any): Observable<any> {
    return this.http.delete<any>(this.timecardUrl);
  }
  deleteJobEntry(id: any): Observable<any> {
    return this.http.delete<any>(this.jobEntryUrl);
  }
  deleteMachineEntry(id: any): Observable<any> {
    return this.http.delete<any>(this.machineEntryUrl);
  }

  addJob(newObj: any): Observable<any> {
    return this.http.post<any>(this.jobsUrl, newObj, httpOptions);
  }
  addMachine(newObj: any): Observable<any> {
    return this.http.post<any>(this.machineUrl, newObj, httpOptions);
  }
  addTimecard(newObj: any): Observable<any> {
    return this.http.post<any>(this.timecardUrl, newObj, httpOptions);
  }
  addJobEntry(newObj: any): Observable<any> {
    return this.http.post<any>(this.jobEntryUrl, newObj, httpOptions);
  }
  addMachineEntry(newObj: any): Observable<any> {
    return this.http.post<any>(this.machineEntryUrl, newObj, httpOptions);
  }

  getJobById(id: any): Observable<any> {
    const url = `${this.jobsUrl}${id}/`;
    return this.http.get<any>(url);
  }
  getMachineById(id: any): Observable<any> {
    const url = `${this.machineUrl}${id}/`;
    return this.http.get<any>(url);
  }
  getTimecardById(id: any): Observable<any> {
    const url = `${this.timecardUrl}${id}/`;
    return this.http.get<any>(url);
  }
  getJobEntryById(id: any): Observable<any> {
    const url = `${this.jobEntryUrl}${id}/`;
    return this.http.get<any>(url);
  }
  getMachineEntryById(id: any): Observable<any> {
    const url = `${this.machineEntryUrl}${id}/`;
    return this.http.get<any>(url);
  }
  updateJob(updateObj: any) {
    const url = `${this.jobsUrl}${updateObj.id}/`;
    return this.http.put<any>(url, updateObj, httpOptions);
  }
  updateMachine(updateObj: any) {
    const url = `${this.machineUrl}${updateObj.id}/`;
    return this.http.put<any>(url, updateObj, httpOptions);
  }
  updateTimecard(updateObj: any) {
    const url = `${this.timecardUrl}${updateObj.id}/`;
    return this.http.put<any>(url, updateObj, httpOptions);
  }
  updateJobEntry(updateObj: any) {
    const url = `${this.jobEntryUrl}${updateObj.id}/`;
    return this.http.put<any>(url, updateObj, httpOptions);
  }
  updateMachineEntry(updateObj: any) {
    const url = `${this.machineEntryUrl}${updateObj.id}/`;
    return this.http.put<any>(url, updateObj, httpOptions);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
}
