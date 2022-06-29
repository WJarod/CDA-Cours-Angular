/* An interface that defines the methods that a DAO must implement. */
interface Ilocal<T> {
    // add les data au local storage
    addDataList(data: T[], dataName: string): Promise<T[]>;
    // update les data au local storage
    updateDataList(data: T[], dataName: string): Promise<T[]>;
    // add les data au local storage
    addData(data: T, dataName: string): Promise<T>;
    // update les data au local storage
    updateData(data: T, dataName: string): Promise<T>;
    // delete les data au local storage
    deleteData(dataName: string): Promise<T[]>;
}
export default Ilocal;