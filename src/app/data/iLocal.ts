/* An interface that defines the methods that a DAO must implement. */
interface Ilocal<T> {
    // set les data au local storage
    setDataList(data: T[], dataName: string): Promise<T[]>;
    // add la data dans la list du local storage
    addDataList(datas: T[], data: T, dataName: string): Promise<T>;
    // del la data de la list du local storage
    deleteDataInList(datas: T[], data: T, dataName: string): Promise<T>;
    // update les data au local storage
    updateDataList(data: T[], dataName: string): Promise<T[]>;
    // set les data au local storage
    setData(data: T, dataName: string): Promise<T>;
    // update les data au local storage
    updateData(data: T, dataName: string): Promise<T>;
    // delete les data au local storage
    deleteData(dataName: string): Promise<T[]>;
}
export default Ilocal;