export interface IIpfsService {
  writeObject: (dataObject: any) => Promise<any>
  getObject: (cid: any) => Promise<any>
}
