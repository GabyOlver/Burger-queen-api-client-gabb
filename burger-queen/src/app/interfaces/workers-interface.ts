export interface Worker {
    id: number;
    name: string;
    email: string;
    role: string;
    password?: string;

}

export interface CreateWorker {
    id: number;
    name: string;
    email: string;
    role: string;
    password?: string;
}

export interface EditWorkerResponse {
    worker: Worker;
    token: string;
  }